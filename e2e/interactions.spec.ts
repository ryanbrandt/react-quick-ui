import { expect, type Page, test } from "@playwright/test";

import { gotoStory } from "./helpers";

// Behaviour jsdom can't show: the native <dialog> (inert page, focus, Esc,
// scroll lock) and the NavBar's mobile menu, in a real browser.

/** Whether the focused element is inside the element matching `selector`. */
const focusIsIn = (page: Page, selector: string) =>
  page.evaluate(
    (inside) => !!document.activeElement?.closest(inside),
    selector
  );

test.describe("Dialog", () => {
  test.beforeEach(async ({ page }) => {
    await gotoStory(page, "core-layout-dialog--open-and-close", "light");
    // The story's play function opened and closed it once; start over.
    await page.getByRole("button", { name: "Open dialog" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
  });

  test("moves focus in and keeps it there", async ({ page }) => {
    expect(await focusIsIn(page, "dialog")).toBe(true);

    // Tab and Shift+Tab never reach the page behind the dialog.
    for (const key of ["Tab", "Tab", "Tab", "Shift+Tab", "Shift+Tab"]) {
      await page.keyboard.press(key);
      expect(
        await page.evaluate(() => {
          const active = document.activeElement;
          return (
            !active || active === document.body || !!active.closest("dialog")
          );
        })
      ).toBe(true);
    }
  });

  test("closes on Esc and returns focus to the trigger", async ({ page }) => {
    await page.keyboard.press("Escape");

    await expect(page.getByRole("dialog")).toBeHidden();
    await expect(
      page.getByRole("button", { name: "Open dialog" })
    ).toBeFocused();
  });

  test("closes on a backdrop click", async ({ page }) => {
    await page.mouse.click(5, 5);

    await expect(page.getByRole("dialog")).toBeHidden();
  });

  test("ignores clicks inside the panel", async ({ page }) => {
    await page.getByText("Unsaved changes").click();

    await expect(page.getByRole("dialog")).toBeVisible();
  });

  test("locks page scrolling while open", async ({ page }) => {
    const scrollTop = () =>
      page.evaluate(() => document.scrollingElement?.scrollTop ?? 0);
    const overflow = () =>
      page.evaluate(() => getComputedStyle(document.documentElement).overflow);

    expect(await overflow()).toBe("hidden");
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(100);
    expect(await scrollTop()).toBe(0);

    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toBeHidden();
    expect(await overflow()).toBe("visible");
    await page.mouse.wheel(0, 600);
    await expect.poll(scrollTop).toBeGreaterThan(0);
  });
});
