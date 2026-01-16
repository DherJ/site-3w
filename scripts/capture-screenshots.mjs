import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const baseUrl = process.env.BASE_URL || "http://localhost:3000/site-3w";
const outputDir = process.env.OUTPUT_DIR || "docs/flow/screenshots";

const desktopViewport = { width: 1440, height: 900 };
const mobileViewport = { width: 390, height: 844 };

const readFileSafe = async (file) => {
  try {
    return await fs.readFile(file, "utf8");
  } catch {
    return "";
  }
};

const unique = (arr) => Array.from(new Set(arr));

const readSlugs = async () => {
  const productsText = await readFileSafe("data/products.ts");
  const servicesText = await readFileSafe("data/services.ts");
  const categoriesText = await readFileSafe("data/productCategories.ts");

  const productSlugs = unique(
    [...productsText.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1])
  );
  const serviceSlugs = unique(
    [...servicesText.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1])
  );
  const categoryKeys = unique(
    [...categoriesText.matchAll(/([a-z-]+)\s*:\s*\{/g)].map((m) => m[1])
  ).filter((k) => k && k !== "export" && k !== "PRODUCT_CATEGORIES");

  return { productSlugs, serviceSlugs, categoryKeys };
};

const joinUrl = (base, route) => {
  const trimmedBase = base.replace(/\/$/, "");
  const trimmedRoute = route.startsWith("/") ? route : `/${route}`;
  return `${trimmedBase}${trimmedRoute}`;
};

const ensureDir = async (dir) => {
  await fs.mkdir(dir, { recursive: true });
};

const waitForHydration = async (page) => {
  await page.waitForTimeout(1000);
};

const capture = async (page, url, filePath, failures) => {
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await waitForHydration(page);
    await page.screenshot({ path: filePath, fullPage: true });
  } catch (err) {
    failures.push({ url, error: err?.message || String(err) });
  }
};

const captureDesktopStates = async (page, locale, outDir) => {
  const homeUrl = joinUrl(baseUrl, `/${locale}`);
  await page.goto(homeUrl, { waitUntil: "networkidle" });
  await waitForHydration(page);

  const nav = page.getByRole("navigation");
  const productsLink = nav.getByRole("link", { name: /Produits|Products/i }).first();
  await productsLink.hover();
  await page.waitForTimeout(400);
  await page.screenshot({
    path: path.join(outDir, `home_${locale}_products_dropdown.png`),
    fullPage: true,
  });

  const servicesLink = nav.getByRole("link", { name: /Services/i }).first();
  await servicesLink.hover();
  await page.waitForTimeout(400);
  await page.screenshot({
    path: path.join(outDir, `home_${locale}_services_dropdown.png`),
    fullPage: true,
  });
};

const captureMobileStates = async (page, locale, outDir) => {
  const homeUrl = joinUrl(baseUrl, `/${locale}`);
  await page.goto(homeUrl, { waitUntil: "networkidle" });
  await waitForHydration(page);

  const burger = page.getByRole("button", { name: /Open menu/i });
  await burger.click();
  await page.waitForTimeout(400);
  await page.screenshot({
    path: path.join(outDir, `home_${locale}_menu_open.png`),
    fullPage: true,
  });

  const productsBtn = page.getByRole("button", { name: /Produits|Products/i }).first();
  await productsBtn.click();
  await page.waitForTimeout(300);
  await page.screenshot({
    path: path.join(outDir, `home_${locale}_menu_products_open.png`),
    fullPage: true,
  });

  const servicesBtn = page.getByRole("button", { name: /Services/i }).first();
  await servicesBtn.click();
  await page.waitForTimeout(300);
  await page.screenshot({
    path: path.join(outDir, `home_${locale}_menu_services_open.png`),
    fullPage: true,
  });
};

const main = async () => {
  const failures = [];
  const { productSlugs, serviceSlugs, categoryKeys } = await readSlugs();
  const locales = ["fr", "en"];

  await ensureDir(outputDir);
  await ensureDir(path.join(outputDir, "desktop"));
  await ensureDir(path.join(outputDir, "mobile"));

  const browser = await chromium.launch();

  try {
    for (const locale of locales) {
      const desktopContext = await browser.newContext({
        viewport: desktopViewport,
        deviceScaleFactor: 2,
      });
      const desktopPage = await desktopContext.newPage();

      const baseRoutes = [
        `/${locale}`,
        `/${locale}/products`,
        `/${locale}/services`,
        `/${locale}/about`,
        `/${locale}/contact`,
        `/${locale}/quote`,
        `/${locale}/legal/mentions-legales`,
        `/${locale}/legal/privacy-policy`,
        `/${locale}/legal/terms`,
      ];

      const productRoutes = productSlugs.map((slug) => `/${locale}/products/${slug}`);
      const serviceRoutes = serviceSlugs.map((slug) => `/${locale}/services/${slug}`);
      const categoryRoutes = categoryKeys.map((cat) => `/${locale}/products?cat=${encodeURIComponent(cat)}`);

      const allDesktopRoutes = [...baseRoutes, ...productRoutes, ...serviceRoutes, ...categoryRoutes];

      for (const route of allDesktopRoutes) {
        const name = route.replace(/\/?/g, "").replace(/\W+/g, "_") || "home";
        const url = joinUrl(baseUrl, route);
        const filePath = path.join(outputDir, "desktop", `${name}.png`);
        await capture(desktopPage, url, filePath, failures);
      }

      await captureDesktopStates(desktopPage, locale, path.join(outputDir, "desktop"));
      await desktopContext.close();

      const mobileContext = await browser.newContext({
        viewport: mobileViewport,
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true,
      });
      const mobilePage = await mobileContext.newPage();

      for (const route of baseRoutes) {
        const name = route.replace(/\/?/g, "").replace(/\W+/g, "_") || "home";
        const url = joinUrl(baseUrl, route);
        const filePath = path.join(outputDir, "mobile", `${name}.png`);
        await capture(mobilePage, url, filePath, failures);
      }

      if (locale === "fr") {
        await captureMobileStates(mobilePage, locale, path.join(outputDir, "mobile"));
      }

      await mobileContext.close();
    }
  } finally {
    await browser.close();
  }

  if (failures.length) {
    console.error("Screenshots failed for:");
    failures.forEach((f) => console.error(`- ${f.url}: ${f.error}`));
    process.exitCode = 1;
  }
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
