import { cpSync, mkdirSync, readdirSync, unlinkSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const dist = join(root, "dist");
const www = join(root, "custom_components/wled_studio/www");

mkdirSync(www, { recursive: true });
for (const name of readdirSync(www)) {
  if (name.endsWith(".js") || name.endsWith(".map")) {
    unlinkSync(join(www, name));
  }
}
for (const name of readdirSync(dist)) {
  if (name.endsWith(".js") || name.endsWith(".map")) {
    cpSync(join(dist, name), join(www, name), { force: true });
  }
}
console.log("Copied dist/*.js → custom_components/wled_studio/www/");
