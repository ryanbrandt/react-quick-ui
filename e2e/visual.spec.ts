import { expect, test } from "@playwright/test";

import { gotoStory, loadStoryIds, THEMES } from "./helpers";

// One screenshot per story and theme, compared pixel for pixel. Update the
// baseline with `yarn test:visual:update` and review the PNG diffs.
for (const theme of THEMES) {
  test.describe(theme, () => {
    for (const id of loadStoryIds()) {
      test(id, async ({ page }) => {
        await gotoStory(page, id, theme);
        // The viewport, not the full page: fixed overlays (modal scrim,
        // loading overlay) only cover the viewport.
        await expect(page).toHaveScreenshot(`${id}-${theme}.png`);
      });
    }
  });
}
