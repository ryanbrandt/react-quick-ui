import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import {
  JestUtilities,
  MockFunctionComponentWrapper,
} from "react-testing-utilities";

import createCompositeClassName from "@utilities/createCompositeClassName";
import SpinnerLoader from "@stories/SpinnerLoader/SpinnerLoader";
import LoadingOverlay from "@stories/LoadingOverlay/LoadingOverlay";

jest.mock("@stories/SpinnerLoader/SpinnerLoader");
const mockSpinnerLoader = new MockFunctionComponentWrapper(SpinnerLoader);

jest.mock("@utilities/createCompositeClassName");
const mockcreateCompositeClassName = JestUtilities.assertAsMockFunction(
  createCompositeClassName
);

describe("LoadingOverlay", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const assertOverlayStyling = (show: boolean, className = "") => {
    expect(mockcreateCompositeClassName).toHaveBeenLastCalledWith({
      "loading-overlay": true,
      [className]: true,
      "loading-overlay--hidden": !show,
      "loading-overlay--revealed": show,
    });
  };

  it("renders the spinner loader in an overlay", () => {
    render(<LoadingOverlay show />);

    mockSpinnerLoader.assertOnScreen();
  });

  describe("when show is true", () => {
    it("reveals the overlay", () => {
      render(<LoadingOverlay show />);

      assertOverlayStyling(true);
    });
  });

  describe("when show is false", () => {
    it("hides the overlay", () => {
      render(<LoadingOverlay show={false} />);

      assertOverlayStyling(false);
    });
  });

  describe("when a className is provided", () => {
    it("applies the provided className", () => {
      const mockClassName = "className";
      render(<LoadingOverlay show className={mockClassName} />);

      assertOverlayStyling(true, mockClassName);
    });
  });

  describe("when a message is provided", () => {
    it("shows the message on the overlay", () => {
      const mockMessage = "A message";
      render(<LoadingOverlay show message={mockMessage} />);

      expect(screen.getByText(mockMessage)).toBeInTheDocument();
    });
  });
});
