import { cp, mkdir } from "node:fs/promises";

const server = new URL("./dist/server/", import.meta.url);
const socialAssets = new URL("./dist/client/assets/", import.meta.url);

await mkdir(server, { recursive: true });
await mkdir(socialAssets, { recursive: true });
await Promise.all([
  cp(new URL("./worker.js", import.meta.url), new URL("./index.js", server)),
  cp(new URL("./assets/og-portfolio.png", import.meta.url), new URL("./og-portfolio.png", socialAssets)),
]);

console.log("Sites deployment files prepared");
