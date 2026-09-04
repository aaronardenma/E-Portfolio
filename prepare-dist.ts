import { cp, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { build } from "esbuild";

const project = process.cwd();
const server = resolve(project, "dist/server");
const socialAssets = resolve(project, "dist/client/assets");

await mkdir(server, { recursive: true });
await mkdir(socialAssets, { recursive: true });

await Promise.all([
  build({
    entryPoints: [resolve(project, "worker.ts")],
    outfile: resolve(server, "index.js"),
    bundle: true,
    format: "esm",
    platform: "browser",
    target: "es2022",
  }),
  cp(resolve(project, "assets/og-portfolio.png"), resolve(socialAssets, "og-portfolio.png")),
]);

console.log("Sites deployment files prepared");
