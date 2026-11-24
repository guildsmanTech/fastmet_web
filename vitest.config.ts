import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  test: {
    environment: "node",
    clearMocks: true,
    restoreMocks: true,
    unstubGlobals: true,
    include: ["src/__tests__/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      include: ["src/helper/format.ts", "src/helper/subscription.ts", "src/helper/itemTypes.ts", "src/helper/emailDomain.ts", "src/schemas/fleetRegistration.ts", "src/api/fleetApplications.ts"],
      exclude: ["**/*.test.{ts,tsx}", "**/node_modules/**", "**/dist/**"],
      reporter: ["text", "html"],
    },
  },
});
