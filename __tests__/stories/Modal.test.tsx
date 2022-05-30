import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { JestUtilities } from "react-testing-utilities";

import createCompositeClassName from "@utilities/createCompositeClassName";
import Modal from "@stories/Modal/Modal";

jest.mock("@utilities/createCompositeClassName");
const mockcreateCompositeClassName = JestUtilities.assertAsMockFunction(
  createCompositeClassName
);

describe("Modal", () => {
  const MOCK_CHILD_TEST_ID = "child";
  const MockChildren = () => <div data-testid={MOCK_CHILD_TEST_ID}>Child</div>;
  const mockOnClose = jest.fn();

  const assertModalStyling = (
    open: boolean,
    animated = false,
    className = ""
  ) => {
    expect(mockcreateCompositeClassName).toHaveBeenCalledWith({
      [className]: true,
      modal: true,
      "modal--open": open && !animated,
      "modal--closed": !open && !animated,
      "modal--animated-open": open && animated,
      "modal--animated-closed": !open && animated,
    });
    expect(mockcreateCompositeClassName).toHaveBeenCalledWith({
      modal__container: true,
      "modal__container--open": open,
      "modal__container--closed": !open,
    });
    expect(mockcreateCompositeClassName).toHaveBeenCalledWith({
      modal__background: true,
      "modal__background--open": open,
      "modal__background--closed": !open,
    });
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the provided children", () => {
    render(
      <Modal onClose={mockOnClose} open>
        <MockChildren />
      </Modal>
    );

    expect(screen.getByTestId(MOCK_CHILD_TEST_ID)).toBeInTheDocument();
  });

  describe("when the modal background is clicked", () => {
    it("invokes the provided onClose function", async () => {
      const { container } = render(
        <Modal onClose={mockOnClose} open>
          <MockChildren />
        </Modal>
      );

      const [, backgroundDiv] = container.querySelectorAll("div");

      await userEvent.click(backgroundDiv);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("when the modal foreground is clicked", () => {
    it("does not invoke the provided onClose function", async () => {
      const { container } = render(
        <Modal onClose={mockOnClose} open>
          <MockChildren />
        </Modal>
      );

      const [, , foregroundDiv] = container.querySelectorAll("div");

      await userEvent.click(foregroundDiv);

      expect(mockOnClose).toHaveBeenCalledTimes(0);
    });
  });

  describe("when the modal is open", () => {
    it("stylizes the modal as open", () => {
      render(
        <Modal onClose={mockOnClose} open>
          <MockChildren />
        </Modal>
      );

      assertModalStyling(true);
    });
  });

  describe("when the modal is closed", () => {
    it("stylizes the modal as closed", () => {
      render(
        <Modal onClose={mockOnClose} open={false}>
          <MockChildren />
        </Modal>
      );

      assertModalStyling(false);
    });
  });

  describe("when animated is true", () => {
    it("stylizes the modal as animated", () => {
      render(
        <Modal onClose={mockOnClose} open={false} animated>
          <MockChildren />
        </Modal>
      );

      assertModalStyling(false, true);
    });
  });

  describe("when a className is provided", () => {
    it("applies the provided className", () => {
      const mockClassName = "className";
      render(
        <Modal onClose={mockOnClose} className={mockClassName} open>
          <MockChildren />
        </Modal>
      );

      assertModalStyling(true, false, mockClassName);
    });
  });
});
