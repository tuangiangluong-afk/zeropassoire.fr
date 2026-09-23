"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

const DEFAULT_GTM_ID = "GTM-WHMQBV4V";

/**
 * Balise Google Tag Manager optimisée pour les Core Web Vitals (LCP / TBT 100/100).
 * - Initialise immédiatement window.dataLayer pour bufferiser les clics et événements.
 * - Injecte gtm.js dès la première interaction utilisateur (scroll, touch, clic) ou après 2,5s d'inactivité.
 * - Évite le double téléchargement redondant de gtag.js (GA4 G-6HTXYCLZS7 est géré directement par le conteneur GTM).
 */
export default function GTMScript() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || DEFAULT_GTM_ID;

  useEffect(() => {
    if (!gtmId || typeof window === "undefined") return;

    // 1. Initialiser le dataLayer immédiatement (les clics de simulation sont bufferisés sans perte)
    window.dataLayer = window.dataLayer || [];

    let loaded = false;
    const injectGTM = () => {
      if (loaded) return;
      loaded = true;

      (window.dataLayer = window.dataLayer || []).push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
      document.head.appendChild(script);

      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener("scroll", injectGTM);
      window.removeEventListener("mousemove", injectGTM);
      window.removeEventListener("touchstart", injectGTM);
      window.removeEventListener("keydown", injectGTM);
      window.removeEventListener("click", injectGTM);
    };

    // 2. Déclenchement instantané à la première interaction humaine
    window.addEventListener("scroll", injectGTM, { passive: true, once: true });
    window.addEventListener("mousemove", injectGTM, { passive: true, once: true });
    window.addEventListener("touchstart", injectGTM, { passive: true, once: true });
    window.addEventListener("keydown", injectGTM, { passive: true, once: true });
    window.addEventListener("click", injectGTM, { passive: true, once: true });

    // 3. Fallback différé en idle pour les sessions passives
    let timerId: ReturnType<typeof setTimeout>;
    if ("requestIdleCallback" in window) {
      (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(() => {
        timerId = setTimeout(injectGTM, 2500);
      });
    } else {
      timerId = setTimeout(injectGTM, 3000);
    }

    return () => {
      cleanup();
      clearTimeout(timerId);
    };
  }, [gtmId]);

  return null;
}

/**
 * Google Tag Manager (<noscript> iframe) à placer juste après l'ouverture de <body>
 */
export function GTMNoScript() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || DEFAULT_GTM_ID;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
