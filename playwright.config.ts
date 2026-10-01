import { defineConfig } from "@playwright/test";

// Serves the built Storybook (`yarn test:visual` builds it first, so the
// suite never runs against a stale build).
const PORT = 6007;
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  reporter: [["list"], ["html", { open: "never" }]],
  // Compare pixels exactly: the default tolerance lets subtle colour changes
  // (e.g. a token shifting) pass unnoticed.
  expect: { toHaveScreenshot: { threshold: 0 } },
  use: {
    baseURL: BASE_URL,
    viewport: { width: 1024, height: 768 },
    trace: "retain-on-failure",
  },
  // Snapshot names include the project name, so keep it "chromium".
  projects: [{ name: "chromium", use: { browserName: "chromium" } }],
  webServer: {
    command: `yarn vite preview --outDir storybook-static --port ${PORT} --strictPort`,
    url: BASE_URL,
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
