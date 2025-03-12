import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["scripts", "templates", "!src", "!src/**/*.spec.*"],
  outDir: "./dist",
});
