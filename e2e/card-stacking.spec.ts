import { expect, test, type Page } from "@playwright/test";

import { gotoStory } from "./helpers";

// A linked card's cover (z-index 1) and lifted footer link (z-index 2) must
// stay inside the card's own stacking context, so a sticky bar (z-index 1)
// that the card scrolls under is painted, and hit, on top of them.
const STORY = "core-card--under-a-sticky-bar";

/**
 * What is hit at a point: "bar" inside the sticky bar, otherwise the hit
 * link's text ("" if no link).
 */
const hitAt = (page: Page, x: number, y: number) =>
  page.evaluate(
    ([px, py]) => {
      const hit = document.elementFromPoint(px, py);
      if (hit?.closest("[data-testid=sticky-bar]")) return "bar";
      return hit?.closest("a")?.textContent ?? "";
    },
    [x, y] as const
  );

test("a linked card scrolls beneath a sticky bar", async ({ page }) => {
  await gotoStory(page, STORY, "light");

  const bar = await page.getByTestId("sticky-bar").boundingBox();
  const footerLink = await page
    .getByRole("link", { name: "View on GitHub →" })
    .boundingBox();
  if (!bar || !footerLink) throw new Error("Story did not render");

  // The footer link is under the bar (the play function scrolled it there).
  const x = footerLink.x + footerLink.width / 2;
  const y = footerLink.y + footerLink.height / 2;
  expect(y).toBeGreaterThan(bar.y);
  expect(y).toBeLessThan(bar.y + bar.height);
  // Over the footer link, and over the card body (the link cover).
  expect(await hitAt(page, x, y)).toBe("bar");
  expect(await hitAt(page, x + 120, y)).toBe("bar");

  // Control: without the card's own stacking context, the cover and the
  // lifted link escape and paint over the bar.
  await page.addStyleTag({ content: ".card { isolation: auto; }" });
  expect(await hitAt(page, x, y)).toBe("View on GitHub →");
  expect(await hitAt(page, x + 120, y)).toBe("Open FEC GraphQL Server");
});
