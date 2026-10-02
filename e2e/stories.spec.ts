import { expect, test } from "@playwright/test";

import { gotoStory, loadStoryIds } from "./helpers";

// `yarn test:stories`: runs every story that has a play function in the
// built Storybook. gotoStory waits for the play function to end and fails if
// it threw; any other console or page error fails the test too.
for (const id of loadStoryIds("play-fn")) {
  test(id, async ({ page }) => {
    const errors: Array<string> = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("pageerror", (error) => errors.push(error.message));

    await gotoStory(page, id, "light");

    expect(errors).toEqual([]);
  });
}
