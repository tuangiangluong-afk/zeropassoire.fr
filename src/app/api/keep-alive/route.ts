import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/keep-alive
 * POST /api/keep-alive
 *
 * Keeps Supabase awake by performing database write activity (generating WAL log traffic)
 * and read activity. Called on schedule by Vercel Cron and GitHub Actions to prevent
 * Supabase Free projects from pausing after 7 days of inactivity.
 */
export async function GET(req: NextRequest) {
  return handleKeepAlive(req);
}

export async function POST(req: NextRequest) {
  return handleKeepAlive(req);
}

async function handleKeepAlive(req: NextRequest) {
  const startTime = Date.now();
  const now = new Date().toISOString();

  // 1. Optional authorization check (for Vercel Cron or custom secret)
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const client = supabaseAdmin();
  if (!client) {
    return NextResponse.json(
      {
        success: false,
        error: "Supabase client not configured (missing URL or SERVICE_ROLE_KEY)",
        timestamp: now,
      },
      { status: 500 }
    );
  }

  const status: {
    write: "success" | "failed";
    table: string;
    read: "success" | "failed";
    durationMs: number;
    error?: string;
  } = {
    write: "failed",
    table: "none",
    read: "failed",
    durationMs: 0,
  };

  try {
    // 2. Primary write: sys_keep_alive table
    const { error: sysError } = await client
      .from("sys_keep_alive")
      .insert({ pinged_at: now });

    if (!sysError) {
      status.write = "success";
      status.table = "sys_keep_alive";
    } else {
      // 3. Fallback write: events table (guaranteed to exist and generate WAL)
      const { error: eventError } = await client.from("events").insert({
        session_id: "keep-alive-cron",
        event_name: "supabase_keep_alive",
        properties: {
          pinged_at: now,
          source: "keep_alive_api",
          user_agent: req.headers.get("user-agent") || "unknown",
        },
        created_at: now,
      });

      if (!eventError) {
        status.write = "success";
        status.table = "events";
      } else {
        status.error = `Write failed on both sys_keep_alive (${sysError.message}) and events (${eventError.message})`;
      }
    }

    // 4. Read verification: fetch the latest event
    const { data: readData, error: readError } = await client
      .from("events")
      .select("id, created_at")
      .order("created_at", { ascending: false })
      .limit(1);

    if (!readError && readData) {
      status.read = "success";
    }

    status.durationMs = Date.now() - startTime;

    if (status.write === "success") {
      return NextResponse.json(
        {
          success: true,
          message: "Supabase keep-alive pulse executed successfully",
          timestamp: now,
          status,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Database write could not be performed",
          timestamp: now,
          status,
        },
        { status: 502 }
      );
    }
  } catch (err: any) {
    status.durationMs = Date.now() - startTime;
    return NextResponse.json(
      {
        success: false,
        error: err?.message || "Internal server error",
        timestamp: now,
        status,
      },
      { status: 500 }
    );
  }
}
