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

- /scripts/convert-images-to-webp.mjs

```bash
node scripts/convert-images-to-webp.mjs --source public/partners --dest public/partners/webp --quality 82
node scripts/convert-images-to-webp.mjs --source public/services --dest public/services/webp --quality 82
node scripts/convert-images-to-webp.mjs --source public/products --dest public/products/webp --quality 82 --recursive
```
