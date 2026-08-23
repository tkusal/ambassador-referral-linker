import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, "..");
const srcDir = path.join(rootDir, "src");
const manifestsDir = path.join(rootDir, "manifests");
const distDir = path.join(rootDir, "dist");

const browsers = ["chrome", "edge", "firefox", "opera", "safari"];

console.log("Starting build process...");

// Clean dist directory
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
  console.log("Cleaned dist directory.");
}
fs.mkdirSync(distDir);

for (const browser of browsers) {
  const browserDistDir = path.join(distDir, browser);

  // 1. Copy src to dist/<browser>
  fs.cpSync(srcDir, browserDistDir, { recursive: true });

  // 2. Copy manifest
  const manifestPath = path.join(manifestsDir, `${browser}.json`);
  if (fs.existsSync(manifestPath)) {
    fs.copyFileSync(manifestPath, path.join(browserDistDir, "manifest.json"));
    console.log(`Successfully built extension for ${browser} in dist/${browser}`);
  } else {
    console.error(`Warning: Manifest not found for ${browser} at ${manifestPath}`);
  }
}

console.log("Build complete!");
