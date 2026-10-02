import { StrictMode } from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Dialog, { type DialogProps } from "@stories/Dialog/Dialog";

// jsdom has HTMLDialogElement but no showModal()/close(). These stand-ins
// only toggle `open` and fire `close` later, like the browser does; the real
// behaviour (inert page, focus, Esc, scroll lock) is covered by the
// Playwright suite (e2e/interactions.spec.ts).
const { prototype } = HTMLDialogElement;
const showModal = jest.fn(function (this: HTMLDialogElement) {
  this.setAttribute("open", "");
});
const close = jest.fn(function (this: HTMLDialogElement) {
  if (!this.open) return;
  this.removeAttribute("open");
  queueMicrotask(() => this.dispatchEvent(new Event("close")));
});

beforeAll(() => {
  Object.assign(prototype, { showModal, close });
});

afterAll(() => {
  // Leave jsdom's dialog as we found it for other test files.
  Reflect.deleteProperty(prototype, "showModal");
  Reflect.deleteProperty(prototype, "close");
});

describe("Dialog", () => {
  const onClose = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderDialog = (props: Partial<DialogProps> = {}) =>
    render(
      <Dialog open onClose={onClose} title="Title" {...props}>
        <p>Content</p>
      </Dialog>
    );

  it("opens as a modal dialog labelled by its title", () => {
    renderDialog({ "aria-describedby": "description" });

    const dialog = screen.getByRole("dialog", { name: "Title" });
    expect(showModal).toHaveBeenCalledTimes(1);
    expect(dialog).toHaveAttribute("open");
    expect(dialog).toHaveClass("dialog");
    expect(dialog).toHaveAttribute("aria-describedby", "description");
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Title"
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("stays closed while open is false", () => {
    renderDialog({ open: false });

    expect(showModal).not.toHaveBeenCalled();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("uses aria-labelledby over the title", () => {
    renderDialog({ "aria-labelledby": "other" });

    expect(screen.getByRole("dialog", { hidden: true })).toHaveAttribute(
      "aria-labelledby",
      "other"
    );
  });

  it("takes an aria-label instead of a title", () => {
    renderDialog({ title: undefined, "aria-label": "Settings" });

    const dialog = screen.getByRole("dialog", { name: "Settings" });
    expect(dialog).not.toHaveAttribute("aria-labelledby");
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("stays open through StrictMode's effect replay", async () => {
    render(
      <StrictMode>
        <Dialog open onClose={onClose} title="Title" />
      </StrictMode>
    );
    // Let the replay's queued close event arrive.
    await act(async () => {});

    expect(screen.getByRole("dialog")).toHaveAttribute("open");
    expect(onClose).not.toHaveBeenCalled();
  });

  it("applies a className", () => {
    renderDialog({ className: "custom" });

    expect(screen.getByRole("dialog")).toHaveClass("dialog", "custom");
  });

  describe("closing", () => {
    // The browser returns focus to the trigger on close(); the Playwright
    // suite checks that.
    it("closes when open becomes false", () => {
      const { rerender } = renderDialog();
      rerender(
        <Dialog open={false} onClose={onClose}>
          <p>Content</p>
        </Dialog>
      );

      expect(close).toHaveBeenCalled();
      expect(screen.getByRole("dialog", { hidden: true })).not.toHaveAttribute(
        "open"
      );
      // Closing because the owner asked isn't reported back.
      expect(onClose).not.toHaveBeenCalled();
    });

    it("closes when unmounted while open", () => {
      const { unmount } = renderDialog();
      unmount();

      expect(close).toHaveBeenCalled();
    });

    it("asks to close on the close button", async () => {
      renderDialog({ closeLabel: "Dismiss" });

      await userEvent.click(screen.getByRole("button", { name: "Dismiss" }));

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("asks to close on Esc, but stays open until told", () => {
      renderDialog();
      const dialog = screen.getByRole("dialog");

      const cancel = new Event("cancel", { cancelable: true });
      fireEvent(dialog, cancel);

      expect(cancel.defaultPrevented).toBe(true);
      expect(onClose).toHaveBeenCalledTimes(1);
      expect(dialog).toHaveAttribute("open");
    });

    it("reports a close the browser made itself", async () => {
      renderDialog();

      // e.g. a <form method="dialog"> inside it was submitted
      const dialog = screen.getByRole<HTMLDialogElement>("dialog");
      dialog.close();
      // Let its queued close event arrive.
      await act(async () => {});

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("asks to close on a backdrop click", async () => {
      renderDialog();

      await userEvent.click(screen.getByRole("dialog"));

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("ignores clicks inside the panel", async () => {
      renderDialog();

      await userEvent.click(screen.getByText("Content"));

      expect(onClose).not.toHaveBeenCalled();
    });

    it("ignores a click on the backdrop that started in the panel", () => {
      renderDialog();

      // e.g. selecting text and releasing the mouse past the panel's edge
      fireEvent.pointerDown(screen.getByText("Content"));
      fireEvent.click(screen.getByRole("dialog"));

      expect(onClose).not.toHaveBeenCalled();
    });

    it("ignores backdrop clicks when closeOnBackdropClick is false", async () => {
      renderDialog({ closeOnBackdropClick: false });

      await userEvent.click(screen.getByRole("dialog"));

      expect(onClose).not.toHaveBeenCalled();
    });
  });
});
