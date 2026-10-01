import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { expect, type Page } from "@playwright/test";

export const THEMES = ["light", "dark"] as const;
export type Theme = (typeof THEMES)[number];

interface IndexEntry {
  id: string;
  type: "story" | "docs";
}

const INDEX_FILE = join(__dirname, "../storybook-static/index.json");

/** Every story in the built Storybook (not the docs pages). */
export const loadStoryIds = (): Array<string> => {
  if (!existsSync(INDEX_FILE)) {
    throw new Error("Build Storybook first: yarn build-storybook");
  }
  const { entries } = JSON.parse(readFileSync(INDEX_FILE, "utf8")) as {
    entries: Record<string, IndexEntry>;
  };

  return Object.values(entries)
    .filter(({ type }) => type === "story")
    .map(({ id }) => id);
};

/**
 * Opens a story on its own (no Storybook UI) in the given theme and waits
 * until Storybook has finished with it (rendered, played, and run its
 * afterEach hooks) and the page is visually settled.
 */
export async function gotoStory(
  page: Page,
  id: string,
  theme: Theme
): Promise<void> {
  await page.goto(
    `/iframe.html?id=${id}&viewMode=story&globals=theme:${theme}`
  );
  const phase = await page.waitForFunction(() => {
    const preview = (
      window as {
        __STORYBOOK_PREVIEW__?: { currentRender?: { phase?: string } };
      }
    ).__STORYBOOK_PREVIEW__;
    const current = preview?.currentRender?.phase ?? "";
    return ["finished", "errored", "aborted"].includes(current) && current;
  });
  expect(await phase.jsonValue()).toBe("finished");
  await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
  await waitForStableRender(page);
}

/**
 * Waits until nothing on the page is still changing: web fonts are loaded,
 * images have decoded, CSS animations (e.g. the modal's fade/scale) have
 * finished, and the browser has painted the final frame.
 */
export async function waitForStableRender(page: Page): Promise<void> {
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() =>
    Array.from(document.images).every((img) => img.complete)
  );
  await page.evaluate(async () => {
    // Infinite animations (e.g. the spinner) never finish, so only wait on
    // ones that end. Re-check a few times: finishing one can start another
    // (react-transition-group swaps -enter for -enter-active).
    const runningFinite = () =>
      document
        .getAnimations()
        .filter(
          (a) =>
            a.playState === "running" &&
            a.effect?.getComputedTiming().endTime !== Infinity
        );
    for (let round = 0; round < 5 && runningFinite().length > 0; round++) {
      // A cancelled animation rejects `finished`; it has stopped either way.
      await Promise.all(
        runningFinite().map((a) => a.finished.catch(() => undefined))
      );
    }

    const nextFrame = () =>
      new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    await nextFrame();
    await nextFrame();
  });
}
