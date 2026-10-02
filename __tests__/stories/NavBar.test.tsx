import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import NavBar from "@stories/NavBar/NavBar";

// jsdom applies no CSS, so the links are always visible here; whether they
// sit in the bar or in the narrow menu is checked in a real browser
// (e2e/interactions.spec.ts).
describe("NavBar", () => {
  const renderNavBar = (props: Parameters<typeof NavBar>[0] = {}) =>
    render(
      <>
        <NavBar
          brand={<a href="#home">Brand</a>}
          actions={<button type="button">Action</button>}
          {...props}
        >
          <a href="#home" aria-current="page">
            Home
          </a>
          <a href="#about">About</a>
        </NavBar>
        <button type="button">Outside</button>
      </>
    );

  const menuButton = () => screen.getByRole("button", { name: "Menu" });

  it("renders the brand, a labelled nav with the links, and the actions", () => {
    renderNavBar();

    const header = screen.getByRole("banner");
    expect(header).toHaveClass("navbar", "navbar--sticky");
    expect(screen.getByRole("link", { name: "Brand" })).toBeInTheDocument();
    const nav = screen.getByRole("navigation", { name: "Primary" });
    expect(nav).toContainElement(screen.getByRole("link", { name: "Home" }));
    expect(screen.getByRole("button", { name: "Action" })).toBeInTheDocument();
  });

  it("takes labels, a className and a non-sticky option", () => {
    renderNavBar({
      navLabel: "Main",
      menuLabel: "Open navigation",
      sticky: false,
      className: "custom",
    });

    expect(screen.getByRole("banner")).toHaveClass("navbar", "custom");
    expect(screen.getByRole("banner")).not.toHaveClass("navbar--sticky");
    expect(screen.getByRole("navigation", { name: "Main" })).toBeVisible();
    expect(
      screen.getByRole("button", { name: "Open navigation" })
    ).toBeInTheDocument();
  });

  it("renders without a brand", () => {
    render(<NavBar />);

    expect(
      screen.getByRole("banner").querySelector(".navbar__brand")
    ).toBeNull();
  });

  describe("menu", () => {
    it("starts closed and controls the nav", () => {
      renderNavBar();

      const nav = screen.getByRole("navigation");
      expect(menuButton()).toHaveAttribute("aria-expanded", "false");
      expect(menuButton()).toHaveAttribute("aria-controls", nav.id);
      expect(nav).not.toHaveClass("navbar__nav--open");
    });

    it("opens on the button and moves focus to the first link", async () => {
      renderNavBar();

      await userEvent.click(menuButton());

      expect(menuButton()).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByRole("navigation")).toHaveClass("navbar__nav--open");
      expect(screen.getByRole("link", { name: "Home" })).toHaveFocus();
    });

    it("closes on the button", async () => {
      renderNavBar();

      await userEvent.click(menuButton());
      await userEvent.click(menuButton());

      expect(menuButton()).toHaveAttribute("aria-expanded", "false");
    });

    it("closes on Esc and returns focus to the button", async () => {
      renderNavBar();
      await userEvent.click(menuButton());

      await userEvent.keyboard("a");
      expect(menuButton()).toHaveAttribute("aria-expanded", "true");

      await userEvent.keyboard("{Escape}");
      expect(menuButton()).toHaveAttribute("aria-expanded", "false");
      expect(menuButton()).toHaveFocus();
    });

    it("closes when a link is chosen", async () => {
      renderNavBar();
      await userEvent.click(menuButton());

      // A click in the nav that isn't on a link keeps it open.
      fireEvent.click(screen.getByRole("navigation"));
      expect(menuButton()).toHaveAttribute("aria-expanded", "true");

      await userEvent.click(screen.getByRole("link", { name: "About" }));
      expect(menuButton()).toHaveAttribute("aria-expanded", "false");
    });

    it("closes on a pointer down outside the bar, not inside it", async () => {
      renderNavBar();
      await userEvent.click(menuButton());

      fireEvent.pointerDown(screen.getByRole("button", { name: "Action" }));
      expect(menuButton()).toHaveAttribute("aria-expanded", "true");

      fireEvent.pointerDown(screen.getByRole("button", { name: "Outside" }));
      expect(menuButton()).toHaveAttribute("aria-expanded", "false");
    });

    it("opens with nothing to focus when there are no links", async () => {
      render(<NavBar />);

      await userEvent.click(menuButton());

      expect(menuButton()).toHaveAttribute("aria-expanded", "true");
      expect(menuButton()).toHaveFocus();
    });
  });
});
