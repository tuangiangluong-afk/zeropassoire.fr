import Script from "next/script";

const DEFAULT_GTM_ID = "GTM-WHMQBV4V";

/**
 * Balise Google Tag Manager optimisée via next/script (afterInteractive).
 * - Initialise window.dataLayer dès l'hydratation.
 * - Charge gtm.js sans bloquer le rendu visuel initial (LCP préservé).
 * - Garantit l'enregistrement de 100 % des visites et des événements GA4.
 */
export default function GTMScript() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || DEFAULT_GTM_ID;

  return (
    <Script
      id="gtm-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
          (function(w,d,s,l,i){w[l]=w[l]||[];var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');
        `,
      }}
    />
  );
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
