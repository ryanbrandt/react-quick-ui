import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import { A11Y_TAGS } from "../.storybook/a11yTags";

import { collectPageErrors, gotoStory, loadStoryIds, THEMES } from "./helpers";

// Every story renders in both themes without console errors or axe
// violations (colour contrast included).
for (const theme of THEMES) {
  test.describe(theme, () => {
    for (const id of loadStoryIds()) {
      test(id, async ({ page }) => {
        const errors = collectPageErrors(page);

        await gotoStory(page, id, theme);
        const { violations } = await new AxeBuilder({ page })
          .include("#storybook-root")
          .withTags(A11Y_TAGS)
          .analyze();

        expect(errors).toEqual([]);
        expect(
          violations.map(
            ({ id: rule, nodes }) =>
              `${rule}: ${nodes.map(({ target }) => target.join(" ")).join(", ")}`
          )
        ).toEqual([]);
      });
    }
  });
}
