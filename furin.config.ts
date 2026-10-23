import { defineConfig } from "@teyik0/furin/config";
import tailwind from "bun-plugin-tailwind";
import { PAGES_BASE_PATH } from "./src/site";

export default defineConfig({
  plugins: [{ ...tailwind, buildOnly: true }],
  // GitHub Pages serves the project site from /portfolio (see .github/workflows/pages.yaml).
  static: {
    basePath: PAGES_BASE_PATH,
    outDir: "dist",
  },
});
