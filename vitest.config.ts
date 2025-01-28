import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "lcov"],
      include: ["src/**/*.ts"],
      exclude: [
        "dist",
        "tests",
        "*.config.*",
        "src/index.ts",
        "src/internals",
        "**/*.d.ts",
      ],
    },
  },
});
