import { act, render, screen } from "@testing-library/react";

import Modal, {
  BASE_MODAL_TRANSITION_TIMEOUT,
  MODAL_ANIMATED_TRANSITION_TIMEOUT,
} from "@stories/Modal/Modal";

// Uses the real react-transition-group, so it fails if CSSTransition falls
// back to findDOMNode (removed in React 19).
describe("Modal transition", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const getBackground = () =>
    screen.getByText("Content").parentElement as HTMLElement;

  it.each([
    [false, "modal__transition", BASE_MODAL_TRANSITION_TIMEOUT],
    [true, "modal__transition--animated", MODAL_ANIMATED_TRANSITION_TIMEOUT],
  ])(
    "applies the enter and exit classes (animated: %s)",
    (animated, transitionClass, timeout) => {
      const renderModal = (open: boolean) => (
        <Modal open={open} onClose={jest.fn()} animated={animated}>
          Content
        </Modal>
      );
      const { rerender } = render(renderModal(false));

      expect(screen.queryByText("Content")).not.toBeInTheDocument();

      rerender(renderModal(true));
      expect(getBackground()).toHaveClass(
        `${transitionClass}-enter`,
        `${transitionClass}-enter-active`
      );

      act(() => {
        jest.advanceTimersByTime(timeout);
      });
      expect(getBackground()).toHaveClass(`${transitionClass}-enter-done`);

      rerender(renderModal(false));
      expect(getBackground()).toHaveClass(
        `${transitionClass}-exit`,
        `${transitionClass}-exit-active`
      );

      act(() => {
        jest.advanceTimersByTime(timeout);
      });
      expect(screen.queryByText("Content")).not.toBeInTheDocument();
    }
  );
});
