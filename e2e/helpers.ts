import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { expect, type Page } from "@playwright/test";

export const THEMES = ["light", "dark"] as const;
export type Theme = (typeof THEMES)[number];

interface IndexEntry {
  id: string;
  type: "story" | "docs";
  tags?: Array<string>;
}

const INDEX_FILE = join(__dirname, "../storybook-static/index.json");

/**
 * Every story in the built Storybook (not the docs pages), or only those with
 * a tag (Storybook tags stories that have a play function "play-fn").
 */
export const loadStoryIds = (tag?: string): Array<string> => {
  if (!existsSync(INDEX_FILE)) {
    throw new Error("Build Storybook first: yarn build-storybook");
  }
  const { entries } = JSON.parse(readFileSync(INDEX_FILE, "utf8")) as {
    entries: Record<string, IndexEntry>;
  };

  return Object.values(entries)
    .filter(
      ({ type, tags = [] }) => type === "story" && (!tag || tags.includes(tag))
    )
    .map(({ id }) => id);
};

type PhaseWindow = Window & {
  __STORYBOOK_ADDONS_CHANNEL__?: StoryChannel;
  __rqRenderPhases?: Array<string>;
};

interface StoryChannel {
  on: (
    event: string,
    listener: (payload: { newPhase: string }) => void
  ) => void;
}

/**
 * Runs in the page before Storybook: records every render phase the preview
 * reports on its channel, as soon as the preview creates the channel.
 */
const recordRenderPhases = () => {
  const phases: Array<string> = [];
  const win = window as PhaseWindow;
  win.__rqRenderPhases = phases;

  let channel: StoryChannel | undefined;
  Object.defineProperty(win, "__STORYBOOK_ADDONS_CHANNEL__", {
    configurable: true,
    get: () => channel,
    set: (value: StoryChannel) => {
      channel = value;
      value.on("storyRenderPhaseChanged", ({ newPhase }) =>
        phases.push(newPhase)
      );
    },
  });
};

/**
 * Opens a story on its own (no Storybook UI) in the given theme and waits
 * until Storybook has finished with it (rendered, played, and run its
 * afterEach hooks) and the page is visually settled. Fails if the story or
 * its play function threw.
 *
 * The current render's phase isn't enough: a play function that updates
 * args re-renders the story, and that re-render reaches "finished" while
 * the play function is still running. So wait until every "playing" phase
 * has ended ("played" or "errored") and the last phase is "finished".
 */
export async function gotoStory(
  page: Page,
  id: string,
  theme: Theme
): Promise<void> {
  await page.addInitScript(recordRenderPhases);
  // a11y.manual: the addon's own axe pass is skipped; a11y.spec.ts runs axe.
  await page.goto(
    `/iframe.html?id=${id}&viewMode=story&globals=theme:${theme};a11y.manual:!true`
  );
  const phases = await page.waitForFunction(() => {
    const recorded = (window as PhaseWindow).__rqRenderPhases ?? [];
    const count = (phase: string) =>
      recorded.filter((recordedPhase) => recordedPhase === phase).length;
    const playsEnded = count("playing") === count("played") + count("errored");
    return recorded.at(-1) === "finished" && playsEnded && recorded;
  });
  expect(await phases.jsonValue()).not.toContain("errored");
  await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
  await waitForStableRender(page);
}

/**
 * Waits until nothing on the page is still changing: web fonts are loaded,
 * CSS animations (e.g. the modal's fade/scale) have finished, and the
 * browser has painted the final frame. (No story renders an <img>.)
 */
export async function waitForStableRender(page: Page): Promise<void> {
  await page.evaluate(() => document.fonts.ready);
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
