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

test.describe("NavBar narrow menu", () => {
  test.beforeEach(async ({ page }) => {
    await gotoStory(page, "core-menus-navbar--narrow", "light");
  });

  const menuButton = (page: Page) => page.getByRole("button", { name: "Menu" });

  test("is hidden behind the menu button until opened", async ({ page }) => {
    await expect(page.getByRole("link", { name: "Home" })).toBeHidden();
    await expect(menuButton(page)).toHaveAttribute("aria-expanded", "false");

    // Keyboard only: Tab to the button and press Enter.
    await menuButton(page).focus();
    await page.keyboard.press("Enter");

    await expect(menuButton(page)).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByRole("link", { name: "Home" })).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Résumé" })).toBeFocused();
  });

  test("closes on Esc and returns focus to the button", async ({ page }) => {
    await menuButton(page).click();
    expect(await focusIsIn(page, "nav")).toBe(true);

    await page.keyboard.press("Escape");

    await expect(menuButton(page)).toHaveAttribute("aria-expanded", "false");
    await expect(menuButton(page)).toBeFocused();
    await expect(page.getByRole("link", { name: "Home" })).toBeHidden();
  });

  test("closes on a click outside the bar", async ({ page }) => {
    await menuButton(page).click();
    await page.mouse.click(700, 600);

    await expect(menuButton(page)).toHaveAttribute("aria-expanded", "false");
  });

  test("shows the links in the bar when it is wide", async ({ page }) => {
    await gotoStory(page, "core-menus-navbar--default", "light");

    await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
    await expect(menuButton(page)).toBeHidden();
  });
});

// The PR #17 review: "system" follows the OS. Under an emulated dark OS, the
// story root takes the dark tokens and colour scheme.
test("theme system follows an OS dark preference", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto(
    "/iframe.html?id=core-inputs-themetoggle--default&viewMode=story&globals=theme:system;a11y.manual:!true"
  );
  await expect(page.locator("html")).toHaveAttribute("data-theme", "system");
  await expect(page.getByRole("radiogroup")).toBeVisible();

  const root = await page.evaluate(() => {
    const style = getComputedStyle(document.documentElement);
    return {
      colorScheme: style.colorScheme,
      background: style.backgroundColor,
      bgToken: style.getPropertyValue("--rq-color-bg").trim(),
    };
  });
  expect(root).toEqual({
    colorScheme: "dark",
    background: "rgb(18, 20, 27)",
    bgToken: "#12141b",
  });
});
