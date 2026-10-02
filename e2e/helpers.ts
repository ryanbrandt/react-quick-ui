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

interface StoryState {
  /** Play functions started and not yet ended. */
  playsRunning: number;
  /** The latest render phase. */
  last?: string;
  /** Why the story failed, once it has. */
  errored?: string;
}

type StoryWindow = Window & {
  __STORYBOOK_ADDONS_CHANNEL__?: StoryChannel;
  __rqStory?: StoryState;
};

interface StoryChannel {
  on: (event: string, listener: (payload: never) => void) => void;
}

/**
 * Runs in the page before Storybook: follows the render phases and errors
 * the preview reports on its channel, as soon as the preview creates it.
 */
const recordStoryState = () => {
  const state: StoryState = { playsRunning: 0 };
  const win = window as StoryWindow;
  win.__rqStory = state;

  const fail = ({ message }: { message?: string }) => {
    state.errored = message ?? "The story errored";
  };

  let channel: StoryChannel | undefined;
  Object.defineProperty(win, "__STORYBOOK_ADDONS_CHANNEL__", {
    configurable: true,
    get: () => channel,
    set: (value: StoryChannel) => {
      channel = value;
      value.on(
        "storyRenderPhaseChanged",
        ({ newPhase }: { newPhase: string }) => {
          if (newPhase === "playing") state.playsRunning++;
          // A play function ends played, errored or aborted.
          if (["played", "errored", "aborted"].includes(newPhase)) {
            state.playsRunning = Math.max(0, state.playsRunning - 1);
          }
          if (newPhase === "errored") state.errored ??= "The story errored";
          state.last = newPhase;
        }
      );
      value.on("playFunctionThrewException", fail);
      value.on("storyThrewException", fail);
      value.on("storyErrored", ({ title }: { title?: string }) =>
        fail({ message: title })
      );
    },
  });
};

// addInitScript runs on every later navigation too, so add it once per page.
const pagesRecording = new WeakSet<Page>();

/**
 * Collects the page's console errors and uncaught exceptions from now on.
 * Check the returned array (still filling) at the end of the test.
 */
export const collectPageErrors = (page: Page): Array<string> => {
  const errors: Array<string> = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  return errors;
};

/**
 * Opens a story on its own (no Storybook UI) in the given theme and waits
 * until Storybook has finished with it (rendered, played, and run its
 * afterEach hooks) and the page is visually settled. Fails, with the
 * story's error, if the story or its play function threw.
 *
 * The current render's phase isn't enough: a play function that updates
 * args re-renders the story, and that re-render reaches "finished" while
 * the play function is still running. So wait until no play function is
 * running and the last phase is an end ("finished", "errored" or
 * "aborted").
 */
export async function gotoStory(
  page: Page,
  id: string,
  theme: Theme | "system"
): Promise<void> {
  if (!pagesRecording.has(page)) {
    await page.addInitScript(recordStoryState);
    pagesRecording.add(page);
  }
  // a11y.manual: the addon's own axe pass is skipped; a11y.spec.ts runs axe.
  await page.goto(
    `/iframe.html?id=${id}&viewMode=story&globals=theme:${theme};a11y.manual:!true`
  );
  const state = await page.waitForFunction(() => {
    const story = (window as StoryWindow).__rqStory;
    const ended = ["finished", "errored", "aborted"].includes(
      story?.last ?? ""
    );
    return ended && story!.playsRunning === 0 && story;
  });
  const { errored } = (await state.jsonValue()) as StoryState;
  expect(errored, `story ${id} errored`).toBeUndefined();
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
