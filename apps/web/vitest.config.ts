import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  test: {
    globals: true,
    root: "./",
    include: ["src/**/__tests__/**/*.test.{ts,tsx}"],
    environment: "node",
  },
});
