# zeropassoire.fr

Site de sensibilisation et simulateur de sortie de passoire énergétique (logements classés F ou G au DPE).

## Stack

- Next.js 15 App Router, TypeScript
- Tailwind 3 avec palette personnalisée (`brand` emerald, `alert` amber, `stone` neutres)
- Fonts : Space Grotesk (display) + Inter (body) via `next/font/google`
- Contenu guides : Markdown + gray-matter, lu au runtime via `src/lib/mdx.ts`

## Démarrer

```bash
npm install
npm run dev
```

## Simulateur

La logique de calcul est dans `src/lib/pricing.ts` (barèmes 2026 : prix travaux par m², plafonds MaPrimeRénov', CEE BAR-TH, sortie de passoire). Modifier dans ce seul fichier pour garder le simulateur cohérent avec les guides.

## Capture de leads

`POST /api/leads` accepte le payload du `LeadForm`. En local, log en console. En prod, brancher sur la base de votre choix (Supabase, Postgres, webhook n8n — voir commentaire dans la route).

## Déploiement

Vercel, output « Standalone » non requis (serverless default).
