# WellWithWaves - Next.js skeleton

## Installation
```bash
npm install
npm run dev
```

## Routes
- /fr (home FR)
- /en (home EN)
- /fr/quote (devis)
- /fr/partners (partenaires)

## À brancher ensuite
- API route /api/quote + DB (PostgreSQL + Prisma)
- Envoi email (SMTP OVH ou Resend)
- Vrais visuels produits + catalogue PDF


## Utilisation des scripts 

- /scripts/normalize-partner-logos.ps1 

```bash
.\scripts\normalize-partner-logos.ps1 -Source "public\partners" -Destination "public\partners\normalized-800x400" -TargetWidth 800 -TargetHeight 400
```