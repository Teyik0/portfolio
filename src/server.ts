import { furin } from "@teyik0/furin";
import { Elysia } from "elysia";

const app = new Elysia().use(await furin({ pagesDir: "./src/pages" }));
export const port = Number(process.env.PORT ?? 3000);

if (import.meta.main) {
  app.listen(port);
  console.log(`Portfolio running at http://localhost:${app.server?.port}`);
}

export default app;
