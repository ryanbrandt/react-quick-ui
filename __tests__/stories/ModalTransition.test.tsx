import { act, render, screen } from "@testing-library/react";

import Modal from "@stories/Modal/Modal";

// Uses the real react-transition-group, so it fails if CSSTransition falls
// back to findDOMNode (removed in React 19). jsdom runs no CSS animations, so
// each test stands in for the browser's Element.getAnimations().

interface FakeAnimation {
  effect: { getComputedTiming: () => { endTime: number } } | null;
  finished: Promise<unknown>;
}

/** A finite animation that finishes when `finish()` is called. */
const pendingAnimation = () => {
  let finish = () => {};
  const animation: FakeAnimation = {
    effect: { getComputedTiming: () => ({ endTime: 450 }) },
    finished: new Promise<void>((resolve) => {
      finish = resolve;
    }),
  };
  return { animation, finish };
};

/** What the browser reports once a 0ms (reduced-motion) animation has run. */
const finishedAnimation = (): FakeAnimation => ({
  effect: { getComputedTiming: () => ({ endTime: 0 }) },
  finished: Promise.resolve(),
});

/** Makes getAnimations() return these animations for the modal background. */
const mockAnimations = (...animations: Array<FakeAnimation>) => {
  const getAnimations = jest.fn(function (this: Element) {
    return this.classList.contains("modal__background") ? animations : [];
  });
  Object.defineProperty(Element.prototype, "getAnimations", {
    value: getAnimations,
    configurable: true,
  });
  return getAnimations;
};

const renderModal = (open: boolean, animated = false) => (
  <Modal open={open} onClose={jest.fn()} animated={animated}>
    Content
  </Modal>
);

const getBackground = () =>
  screen.getByText("Content").parentElement as HTMLElement;

/** Lets the transition's promise callbacks run. */
const flush = () => act(async () => {});

describe("Modal transition", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    delete (Element.prototype as Partial<Element>).getAnimations;
  });

  it.each([
    [false, "modal__transition"],
    [true, "modal__transition--animated"],
  ])(
    "enters and exits when the CSS animations end (animated: %s)",
    async (animated, transitionClass) => {
      const { rerender } = render(renderModal(false, animated));
      expect(screen.queryByText("Content")).not.toBeInTheDocument();

      const enter = pendingAnimation();
      mockAnimations(enter.animation);
      rerender(renderModal(true, animated));
      expect(getBackground()).toHaveClass(
        `${transitionClass}-enter`,
        `${transitionClass}-enter-active`
      );

      // No timeout decides when it's done: only the animation ending does.
      act(() => {
        jest.advanceTimersByTime(10_000);
      });
      await flush();
      expect(getBackground()).toHaveClass(`${transitionClass}-enter-active`);

      enter.finish();
      await flush();
      expect(getBackground()).toHaveClass(`${transitionClass}-enter-done`);

      const exit = pendingAnimation();
      mockAnimations(exit.animation);
      rerender(renderModal(false, animated));
      expect(getBackground()).toHaveClass(
        `${transitionClass}-exit`,
        `${transitionClass}-exit-active`
      );

      act(() => {
        jest.advanceTimersByTime(10_000);
      });
      await flush();
      expect(screen.getByText("Content")).toBeInTheDocument();

      exit.finish();
      await flush();
      expect(screen.queryByText("Content")).not.toBeInTheDocument();
    }
  );

  it("unmounts the background at once under reduced motion (0ms animations)", async () => {
    const { rerender } = render(renderModal(true, true));
    mockAnimations(finishedAnimation(), finishedAnimation());

    rerender(renderModal(false, true));
    await flush();

    // Gone without advancing the (fake) clock: nothing is left blocking
    // clicks for the 450ms the animation would otherwise take.
    expect(screen.queryByText("Content")).not.toBeInTheDocument();
  });

  it("doesn't wait on infinite or cancelled animations", async () => {
    const { rerender } = render(renderModal(true));
    mockAnimations(
      {
        effect: { getComputedTiming: () => ({ endTime: Infinity }) },
        finished: new Promise(() => {}),
      },
      { effect: null, finished: Promise.reject(new Error("cancelled")) }
    );

    rerender(renderModal(false));
    await flush();

    expect(screen.queryByText("Content")).not.toBeInTheDocument();
  });

  it("ends at once in browsers without getAnimations()", async () => {
    const { rerender } = render(renderModal(true));

    rerender(renderModal(false));
    await flush();

    expect(screen.queryByText("Content")).not.toBeInTheDocument();
  });
});
