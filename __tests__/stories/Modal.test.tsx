import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReactNode } from "react";
import { CSSTransition } from "react-transition-group";

import {
  JestUtilities,
  MockClassComponentWrapper,
  MockFunctionComponentWrapper,
} from "@ryanbrandt/react-testing-utils";

import createCompositeClassName from "@utilities/createCompositeClassName";
import Modal, {
  BASE_MODAL_TRANSITION_TIMEOUT,
  MODAL_ANIMATED_TRANSITION_TIMEOUT,
} from "@stories/Modal/Modal";
import Heading, { HeadingProps } from "@stories/Heading/Heading";

jest.mock("@stories/Heading/Heading");
const mockHeading = new MockFunctionComponentWrapper(Heading);

jest.mock("@utilities/createCompositeClassName");
const mockcreateCompositeClassNameOutput = "conditional_classnames_output";
const mockconditionalClasssNames = JestUtilities.assertAsMockFunction(
  createCompositeClassName
);
mockconditionalClasssNames.mockReturnValue(mockcreateCompositeClassNameOutput);

jest.mock("react-transition-group");
const mockCSSTransition = new MockClassComponentWrapper(CSSTransition);
mockCSSTransition.mockRenderImplementation((props) => (
  <div>{props.children as ReactNode}</div>
));

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

    mockCSSTransition.assertOnScreen();
    mockCSSTransition.assertLastCalledWith({
      unmountOnExit: true,
      in: false,
      timeout: BASE_MODAL_TRANSITION_TIMEOUT,
      classNames: mockcreateCompositeClassNameOutput,
    });

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
        timeout: MODAL_ANIMATED_TRANSITION_TIMEOUT,
      });
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
    });
  });
});
