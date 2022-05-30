import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  JestUtilities,
  MockFunctionComponentWrapper,
} from "react-testing-utilities";

import createCompositeClassName from "@utilities/createCompositeClassName";
import Button from "@stories/Button/Button";
import PencilSvg from "@svgs/SearchSvg/SearchSvg";

jest.mock("@utilities/createCompositeClassName");
const MOCK_CLASSNAMES = "class_name";
const mockedcreateCompositeClassName = JestUtilities.assertAsMockFunction(
  createCompositeClassName
);
mockedcreateCompositeClassName.mockReturnValue(MOCK_CLASSNAMES);

jest.mock("@svgs/SearchSvg/SearchSvg");
const mockPencilSvg = new MockFunctionComponentWrapper(PencilSvg);

describe("Button", () => {
  const MOCK_TEXT = "Button";

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the provided text and applies the conditional classnames", () => {
    const { container } = render(<Button text={MOCK_TEXT} />);

    expect(screen.getByText(MOCK_TEXT)).toBeInTheDocument();
    expect(container.querySelector("button")).toHaveClass(MOCK_CLASSNAMES);
  });

  describe("when a style props are provided", () => {
    it("applies the specified styling", () => {
      const MOCK_VARIANT = "primary";
      const MOCK_SIZE = "sm";
      const MOCK_DISABLED = false;

      const { container } = render(
        <Button
          text={MOCK_TEXT}
          variant={MOCK_VARIANT}
          size={MOCK_SIZE}
          disabled={MOCK_DISABLED}
        />
      );

      expect(container.querySelector("button")?.disabled).toBe(MOCK_DISABLED);
      expect(mockedcreateCompositeClassName).toHaveBeenCalledTimes(1);
      expect(mockedcreateCompositeClassName).toHaveBeenCalledWith({
        button: true,
        [`button--${MOCK_SIZE}`]: true,
        [`button--${MOCK_VARIANT}`]: true,
      });
    });
  });

  describe("when no style props are provided", () => {
    it("defaults to primary/rounded/filled/md styling", () => {
      const { container } = render(<Button text={MOCK_TEXT} />);

      expect(container.querySelector("button")?.disabled).toBeFalsy();
      expect(mockedcreateCompositeClassName).toHaveBeenCalledTimes(1);
      expect(mockedcreateCompositeClassName).toHaveBeenCalledWith({
        button: true,
        "button--md": true,
        "button--primary": true,
      });
    });
  });

  describe("when an onClick handler is provided", () => {
    describe("when the button is clicked", () => {
      it("invokes the provided onClick handler", () => {
        const mockOnClickHandler = jest.fn();
        const { container } = render(
          <Button text={MOCK_TEXT} onClick={mockOnClickHandler} />
        );

        expect(mockOnClickHandler).toHaveBeenCalledTimes(0);
        fireEvent.click(container.firstChild as HTMLElement);
        expect(mockOnClickHandler).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("when an iconLeft value is provided", () => {
    it("renders the icon to the left of the button text", () => {
      render(<Button text={MOCK_TEXT} iconLeft={<PencilSvg />} />);

      mockPencilSvg.assertOnScreen();
    });
  });

  describe("when an iconRight value is provided", () => {
    it("renders the icon to the right of the button text", () => {
      render(<Button text={MOCK_TEXT} iconRight={<PencilSvg />} />);

      mockPencilSvg.assertOnScreen();
    });
  });
});
