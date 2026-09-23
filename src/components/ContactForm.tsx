"use client";
import { useState } from "react";
import { Loader2, Check } from "lucide-react";

export default function ContactForm() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const r = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          simulation: { kind: "contact", message: msg },
          consent_callback: false,
          consent_newsletter: false,
        }),
      });
      setStatus(r.ok ? "ok" : "err");
    } catch {
      setStatus("err");
    }
  }

  if (status === "ok") {
    return (
      <div className="card text-center">
        <Check className="w-12 h-12 text-brand-600 mx-auto mb-3" />
        <div className="font-display font-bold text-stone-900 text-xl mb-2">Message bien re&ccedil;u</div>
        <p className="text-stone-600">On vous r&eacute;pond sous 48h ouvr&eacute;es &agrave; l'adresse indiqu&eacute;e.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card space-y-4">
      <div>
        <label className="block text-sm font-semibold text-stone-800 mb-1.5">Votre email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border-2 border-stone-300 px-4 py-3 focus:border-brand-600 focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-stone-800 mb-1.5">Votre message</label>
        <textarea
          required
          rows={6}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className="w-full rounded-xl border-2 border-stone-300 px-4 py-3 focus:border-brand-600 focus:outline-none"
        />
      </div>
      {status === "err" && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-800">
          Envoi impossible. R&eacute;essayez dans un instant.
        </div>
      )}
      <button type="submit" disabled={status === "sending"} className="btn-primary">
        {status === "sending" && <Loader2 size={16} className="animate-spin" />}
        Envoyer
      </button>
    </form>
  );
}
