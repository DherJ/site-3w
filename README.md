# WellWithWaves - Next.js

## How to start
```bash
npm install
npm run dev
```

Le projet utilise `basePath: /site-3w`. En local, ouvrez par exemple :
- http://localhost:3000/site-3w/fr
- http://localhost:3000/site-3w/en

## Architecture du projet
- `app/` : App Router Next.js (layout, pages, metadata, API route).
- `app/[locale]/` : pages localisees (FR/EN) + routes dynamiques `products/[slug]` et `services/[slug]`.
- `components/` : composants UI (catalogue produits, sections marketing, formulaires).
- `data/` : sources statiques (produits, services, categories).
- `i18n/` + `messages/` : i18n (Next-Intl) et dictionnaires par section.
- `public/` : assets (images, PDF, OG images).
- `scripts/` : scripts utilitaires (images, screenshots).

## Ecrans et navigation (liens entre ecrans)
- Home `/{locale}` -> acces direct vers `products`, `services`, `about`, `contact`, `quote`.
- Catalogue `/{locale}/products` -> filtres categories, liens vers chaque fiche produit `/{locale}/products/[slug]`.
- Services `/{locale}/services` -> liens vers detail service `/{locale}/services/[slug]`.
- Devis `/{locale}/quote` -> wizard multi-etapes (besoin -> details -> logistique -> entreprise -> recap).
- A propos `/{locale}/about` -> sections internes + CTA vers services.
- Contact `/{locale}/contact` -> formulaire + infos.
- Legal : `/{locale}/legal/mentions-legales`, `/{locale}/legal/privacy-policy`, `/{locale}/legal/terms`.

## SEO (comment ca fonctionne)
- Chaque page a un fichier `seo.ts` (ex: `app/[locale]/products/seo.ts`) qui expose :
  - une fonction `generateMetadata` (Next.js) avec title/description/canonical/OG/Twitter.
  - du JSON-LD (schema.org) pour enrichir les pages.
- Les textes SEO sont traduits via `next-intl` (namespace par page).
- Les URLs canoniques et OG images utilisent `absoluteUrl(...)`.
- SEO global : `app/sitemap.ts` et `app/robots.ts`.

## Scripts (dans /scripts)
- `scripts/normalize-partner-logos.ps1`
  - Normalise les logos partenaires en PNG 800x400 avec fond blanc.
  - Exemple :
    ```bash
    .\scripts\normalize-partner-logos.ps1 -Source "public\partners" -Destination "public\partners\normalized-800x400" -TargetWidth 800 -TargetHeight 400
    ```
- `scripts/convert-images-to-webp.mjs`
  - Convertit PNG/JPG en WebP (option `--recursive`).
  - Exemples :
    ```bash
    node scripts/convert-images-to-webp.mjs --source public/partners --dest public/partners/webp --quality 82
    node scripts/convert-images-to-webp.mjs --source public/services --dest public/services/webp --quality 82
    node scripts/convert-images-to-webp.mjs --source public/products --dest public/products/webp --quality 82 --recursive
    ```
- `scripts/capture-screenshots.mjs`
  - Capture automatiquement les ecrans (desktop + mobile) via Playwright.
  - Sortie par defaut : `docs/flow/screenshots` (configurable via `OUTPUT_DIR`).
  - Exemple :
    ```bash
    BASE_URL="http://localhost:3000/site-3w" OUTPUT_DIR="docs/screenshots" node scripts/capture-screenshots.mjs
    ```

## Screenshots (docs/screenshots)
Les captures sont generees via `scripts/capture-screenshots.mjs` (voir `OUTPUT_DIR`). Exemples d'images integrees :

![Home - Dropdown Produits (desktop)](docs/screenshots/desktop/home_fr_products_dropdown.png)
![Home - Dropdown Services (desktop)](docs/screenshots/desktop/home_fr_services_dropdown.png)
