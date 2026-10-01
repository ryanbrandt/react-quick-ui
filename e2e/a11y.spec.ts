import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import { gotoStory, loadStoryIds, THEMES } from "./helpers";

// The same rules as the Storybook a11y addon (.storybook/preview.ts).
const A11Y_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

// Every story renders in both themes without console errors or axe
// violations (colour contrast included).
for (const theme of THEMES) {
  test.describe(theme, () => {
    for (const id of loadStoryIds()) {
      test(id, async ({ page }) => {
        const errors: Array<string> = [];
        page.on("console", (message) => {
          if (message.type() === "error") errors.push(message.text());
        });
        page.on("pageerror", (error) => errors.push(error.message));

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
