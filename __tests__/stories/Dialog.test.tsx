import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Dialog from "@stories/Dialog/Dialog";

// jsdom has HTMLDialogElement but no showModal()/close(). These stand-ins
// only toggle `open` and fire `close` like the browser does; the real
// behaviour (inert page, focus, Esc, scroll lock) is covered by the
// Playwright suite (e2e/interactions.spec.ts).
const { prototype } = HTMLDialogElement;
const showModal = jest.fn(function (this: HTMLDialogElement) {
  this.setAttribute("open", "");
});
const close = jest.fn(function (this: HTMLDialogElement) {
  if (!this.open) return;
  this.removeAttribute("open");
  this.dispatchEvent(new Event("close"));
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

  const renderDialog = (props: Partial<Parameters<typeof Dialog>[0]> = {}) =>
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

  it("has no label or heading without a title", () => {
    renderDialog({ title: undefined });

    const dialog = screen.getByRole("dialog");
    expect(dialog).not.toHaveAttribute("aria-labelledby");
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("applies a className", () => {
    renderDialog({ className: "custom" });

    expect(screen.getByRole("dialog")).toHaveClass("dialog", "custom");
  });

  describe("closing", () => {
    it("closes and returns focus to the trigger when open becomes false", () => {
      render(<button type="button">Trigger</button>);
      const trigger = screen.getByRole("button", { name: "Trigger" });
      trigger.focus();

      const { rerender } = renderDialog();
      screen.getByRole("button", { name: "Close" }).focus();
      rerender(
        <Dialog open={false} onClose={onClose}>
          <p>Content</p>
        </Dialog>
      );

      expect(close).toHaveBeenCalled();
      expect(screen.getByRole("dialog", { hidden: true })).not.toHaveAttribute(
        "open"
      );
      expect(trigger).toHaveFocus();
      // Closing because the owner asked isn't reported back.
      expect(onClose).not.toHaveBeenCalled();
    });

    it("closes when unmounted while open", () => {
      const { unmount } = renderDialog();
      unmount();

      expect(close).toHaveBeenCalled();
    });

    it("tolerates no focused element to return to", () => {
      jest.spyOn(document, "activeElement", "get").mockReturnValue(null);
      const { unmount } = renderDialog();

      expect(() => unmount()).not.toThrow();
      jest.restoreAllMocks();
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

    it("reports a close the browser made itself", () => {
      renderDialog();

      // e.g. a <form method="dialog"> inside it was submitted
      screen.getByRole<HTMLDialogElement>("dialog").close();

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

    it("ignores backdrop clicks when closeOnBackdropClick is false", async () => {
      renderDialog({ closeOnBackdropClick: false });

      await userEvent.click(screen.getByRole("dialog"));

      expect(onClose).not.toHaveBeenCalled();
    });
  });
});
