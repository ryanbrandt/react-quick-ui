import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { CSSTransition } from "react-transition-group";
import type { CSSTransitionProps } from "react-transition-group/CSSTransition";

import {
  MockClassComponentWrapper,
  MockFunctionComponentWrapper,
} from "@ryanbrandt/react-testing-utils";

import createCompositeClassName from "@utilities/createCompositeClassName";
import Modal from "@stories/Modal/Modal";
import Heading, { type HeadingProps } from "@stories/Heading/Heading";

jest.mock("@stories/Heading/Heading");
const mockHeading = new MockFunctionComponentWrapper(Heading);

jest.mock("@utilities/createCompositeClassName");
const mockcreateCompositeClassNameOutput = "conditional_classnames_output";
const mockconditionalClasssNames = jest.mocked(createCompositeClassName);
mockconditionalClasssNames.mockReturnValue(mockcreateCompositeClassNameOutput);

jest.mock("react-transition-group");
const mockCSSTransition = new MockClassComponentWrapper(CSSTransition);
let transitionProps: CSSTransitionProps<HTMLDivElement> | undefined;
mockCSSTransition.mockRenderImplementation((props) => {
  transitionProps = props as CSSTransitionProps<HTMLDivElement>;
  return <div>{props.children as ReactNode}</div>;
});

describe("Modal", () => {
  const MOCK_CHILD_TEST_ID = "child";
  const MockChildren = () => <div data-testid={MOCK_CHILD_TEST_ID}>Child</div>;
  const mockOnClose = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the provided children within a CSSTransition", () => {
    render(
      <Modal onClose={mockOnClose} open={false}>
        <MockChildren />
      </Modal>
    );

    const background = mockCSSTransition.mockRoot.firstChild
      ?.firstChild as HTMLDivElement;

    mockCSSTransition.assertOnScreen();
    mockCSSTransition.assertLastCalledWith({
      // A nodeRef to the animated node, so CSSTransition never needs
      // findDOMNode (removed in React 19).
      nodeRef: { current: background },
      unmountOnExit: true,
      in: false,
      // No timeout: the transition ends when the CSS animations do.
      addEndListener: expect.any(Function) as (done: () => void) => void,
      classNames: mockcreateCompositeClassNameOutput,
    });
    expect(background).toHaveClass("modal__background");

    expect(mockconditionalClasssNames).toHaveBeenCalledWith({
      modal__transition: true,
      "modal__transition--animated": false,
    });
    expect(mockconditionalClasssNames).toHaveBeenCalledWith({
      modal: true,
      "": true,
    });

    expect(screen.getByTestId(MOCK_CHILD_TEST_ID)).toBeInTheDocument();
  });

  describe("when the modal is open", () => {
    it("stylizes the modal as open via the CSSTransition wrapper", () => {
      render(
        <Modal onClose={mockOnClose} open>
          <MockChildren />
        </Modal>
      );

      mockCSSTransition.assertOnScreen();
      mockCSSTransition.assertLastCalledWith({
        in: true,
        unmountOnExit: true,
        classNames: mockcreateCompositeClassNameOutput,
      });
    });

    describe("when the user closes the modal", () => {
      it("invokes the provided onClose function", async () => {
        render(
          <Modal onClose={mockOnClose} open>
            <MockChildren />
          </Modal>
        );

        await userEvent.click(
          mockCSSTransition.mockRoot.firstChild?.firstChild as HTMLDivElement
        );

        expect(mockOnClose).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("when a className is provided", () => {
    it("applies the provided className to the modal", () => {
      const mockClassName = "className";
      render(
        <Modal onClose={mockOnClose} className={mockClassName} open>
          <MockChildren />
        </Modal>
      );

      expect(mockconditionalClasssNames).toHaveBeenCalledWith({
        modal: true,
        [mockClassName]: true,
      });
    });
  });

  describe("when the modal is animated", () => {
    it("applies the animation transition styling", () => {
      render(
        <Modal onClose={mockOnClose} animated open>
          <MockChildren />
        </Modal>
      );

      expect(mockconditionalClasssNames).toHaveBeenCalledWith({
        modal__transition: false,
        "modal__transition--animated": true,
      });

      mockCSSTransition.assertLastCalledWith({
        classNames: mockcreateCompositeClassNameOutput,
        addEndListener: expect.any(Function) as (done: () => void) => void,
      });
    });
  });

  describe("when the transition ends", () => {
    const endTransition = async () => {
      const done = jest.fn();
      const addEndListener = transitionProps?.addEndListener as (
        done: () => void
      ) => void;
      await act(() => {
        addEndListener(done);
        return Promise.resolve();
      });
      return done;
    };

    it("ends it at once when nothing is animating", async () => {
      render(
        <Modal onClose={mockOnClose} open>
          <MockChildren />
        </Modal>
      );

      expect(await endTransition()).toHaveBeenCalledTimes(1);
    });

    it("ends it at once when the modal is no longer rendered", async () => {
      const { unmount } = render(
        <Modal onClose={mockOnClose} open>
          <MockChildren />
        </Modal>
      );
      unmount();

      expect(await endTransition()).toHaveBeenCalledTimes(1);
    });
  });

  describe("when a heading is provided", () => {
    it("renders a heading with the provided heading props", () => {
      const headingProps: HeadingProps = {
        text: "Heading!",
        variant: "h2",
        className: "modal__heading__className",
      };
      render(
        <Modal onClose={mockOnClose} modalHeading={headingProps} open>
          <MockChildren />
        </Modal>
      );

      mockHeading.assertOnScreen();
      mockHeading.assertLastCalledWith({
        ...headingProps,
      });
    });
  });

  describe("when the modal content is clicked", () => {
    it("prevents event propogation from background clicks", async () => {
      render(
        <Modal onClose={mockOnClose} open>
          <MockChildren />
        </Modal>
      );

      await userEvent.click(
        mockCSSTransition.mockRoot.firstChild?.firstChild
          ?.firstChild as HTMLDivElement
      );

      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });
});
