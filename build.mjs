import { cp, mkdir, rm } from "node:fs/promises";

const output = new URL("./dist/", import.meta.url);
const client = new URL("./dist/client/", import.meta.url);
const server = new URL("./dist/server/", import.meta.url);

await rm(output, { recursive: true, force: true });
await mkdir(client, { recursive: true });
await mkdir(server, { recursive: true });

await Promise.all([
  cp(new URL("./index.html", import.meta.url), new URL("./index.html", client)),
  cp(new URL("./styles.css", import.meta.url), new URL("./styles.css", client)),
  cp(new URL("./app.js", import.meta.url), new URL("./app.js", client)),
  cp(new URL("./assets/", import.meta.url), new URL("./assets/", client), { recursive: true }),
]);

await rm(new URL("./assets/.DS_Store", client), { force: true });

await cp(new URL("./worker.js", import.meta.url), new URL("./index.js", server));

console.log("Portfolio built to dist/");
