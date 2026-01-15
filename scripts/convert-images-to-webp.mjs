import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const args = process.argv.slice(2);
const getArg = (name, fallback) => {
  const idx = args.findIndex((arg) => arg === name);
  return idx === -1 ? fallback : args[idx + 1] || fallback;
};

const sourceDir = getArg("--source", "public/partners");
const outputDir = getArg("--dest", `${sourceDir}/webp`);
const quality = Number(getArg("--quality", "82"));
const recursive = args.includes("--recursive");

const isImageFile = (name) => /\.(png|jpe?g)$/i.test(name);

const listFiles = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (recursive) {
        files.push(...(await listFiles(fullPath)));
      }
      continue;
    }
    if (entry.isFile() && isImageFile(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
};

await fs.mkdir(outputDir, { recursive: true });
const files = await listFiles(sourceDir);

await Promise.all(
  files.map(async (inputPath) => {
    const relativePath = path.relative(sourceDir, inputPath);
    const webpPath = relativePath.replace(/\.(png|jpe?g)$/i, ".webp");
    const outputPath = path.join(outputDir, webpPath);
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await sharp(inputPath).webp({ quality }).toFile(outputPath);
  })
);

console.log(`Generated ${files.length} webp files in ${outputDir}`);
