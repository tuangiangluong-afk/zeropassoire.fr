import { ImageResponse } from "next/og";

export const runtime = "nodejs";

const BRAND = {
    name: "Zéro Passoire",
    domain: "zeropassoire.fr",
    color: "#059669",
    baseline: "Sortie de passoire thermique & MaPrimeRénov' Parcours Accompagné",
    cta: "Simulation gratuite des aides 2026",
};

function pretty(raw: string): string {
    return raw
        .split("-")
        .map((w) => (w.length > 1 ? w.charAt(0).toUpperCase() + w.slice(1) : w.toUpperCase()))
        .join(" ");
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const q = (searchParams.get("q") || "").slice(0, 64);
    const sub = (searchParams.get("sub") || BRAND.baseline).slice(0, 120);
    const badge = (searchParams.get("badge") || "").slice(0, 36);
    const title = q ? pretty(q) : "";
    const titleFontSize = title.length > 36 ? 48 : title.length > 24 ? 60 : 74;

    return new ImageResponse(
        (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#064e3b",
                    backgroundImage: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #0f172a 100%)",
                    padding: "56px 64px",
                    justifyContent: "space-between",
                    fontFamily: "sans-serif",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                        <div style={{ display: "flex", width: 16, height: 62, backgroundColor: "#10b981", borderRadius: 4 }} />
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <div style={{ display: "flex", color: "#f8fafc", fontSize: 34, fontWeight: 700 }}>{BRAND.name}</div>
                            <div style={{ display: "flex", color: "#a7f3d0", fontSize: 20, marginTop: 4 }}>{BRAND.domain}</div>
                        </div>
                    </div>
                    {badge ? (
                        <div
                            style={{
                                display: "flex",
                                padding: "8px 18px",
                                backgroundColor: "rgba(16, 185, 129, 0.2)",
                                border: "1.5px solid rgba(16, 185, 129, 0.5)",
                                borderRadius: 999,
                                color: "#6ee7b7",
                                fontSize: 18,
                                fontWeight: 700,
                                letterSpacing: 1,
                            }}
                        >
                            {badge}
                        </div>
                    ) : null}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 1040 }}>
                    {title ? (
                        <div
                            style={{
                                display: "flex",
                                color: "#ffffff",
                                fontSize: titleFontSize,
                                fontWeight: 900,
                                lineHeight: 1.1,
                                letterSpacing: -1,
                            }}
                        >
                            {title}
                        </div>
                    ) : (
                        <div
                            style={{
                                display: "flex",
                                color: "#ffffff",
                                fontSize: 64,
                                fontWeight: 900,
                                lineHeight: 1.1,
                                letterSpacing: -1,
                            }}
                        >
                            Sortir de Passoire Énergétique F & G
                        </div>
                    )}
                    <div
                        style={{
                            display: "flex",
                            color: "#d1fae5",
                            fontSize: 26,
                            lineHeight: 1.35,
                            maxWidth: 960,
                        }}
                    >
                        {sub}
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderTop: "1px solid rgba(255, 255, 255, 0.15)",
                        paddingTop: 24,
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div
                            style={{
                                display: "flex",
                                width: 12,
                                height: 12,
                                borderRadius: 6,
                                backgroundColor: "#10b981",
                            }}
                        />
                        <div style={{ display: "flex", color: "#cbd5e1", fontSize: 18, fontWeight: 500 }}>
                            Barèmes MaPrimeRénov&apos; 2026 • Mon Accompagnateur Rénov&apos; • Zéro Démarchage
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: "#10b981",
                            color: "#064e3b",
                            padding: "12px 28px",
                            borderRadius: 12,
                            fontSize: 20,
                            fontWeight: 800,
                        }}
                    >
                        {BRAND.cta}
                    </div>
                </div>
            </div>
        ),
        { width: 1200, height: 630 }
    );
}
