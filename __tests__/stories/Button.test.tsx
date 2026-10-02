import { render, screen, fireEvent } from "@testing-library/react";

import createCompositeClassName from "@utilities/createCompositeClassName";
import Button from "@stories/Button/Button";

jest.mock("@utilities/createCompositeClassName");
const MOCK_CLASSNAMES = "class_name";
const mockedcreateCompositeClassName = jest.mocked(createCompositeClassName);
mockedcreateCompositeClassName.mockReturnValue(MOCK_CLASSNAMES);

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
        "button--width-auto": false,
        "button--link": false,
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
        "button--width-auto": false,
        "button--link": false,
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
      render(
        <Button text={MOCK_TEXT} iconLeft={<span data-testid="icon" />} />
      );

      const iconWrapper = screen.getByTestId("icon").parentElement;

      expect(iconWrapper).toHaveClass("button__content__icon");
      expect(iconWrapper?.nextElementSibling).toBe(screen.getByText(MOCK_TEXT));
    });
  });

  describe("when an iconRight value is provided", () => {
    it("renders the icon to the right of the button text", () => {
      render(
        <Button text={MOCK_TEXT} iconRight={<span data-testid="icon" />} />
      );

      const iconWrapper = screen.getByTestId("icon").parentElement;

      expect(iconWrapper).toHaveClass("button__content__icon");
      expect(iconWrapper?.previousElementSibling).toBe(
        screen.getByText(MOCK_TEXT)
      );
    });
  });

  describe('when width is "auto"', () => {
    it("adds the width-auto modifier", () => {
      render(<Button text={MOCK_TEXT} width="auto" />);

      expect(mockedcreateCompositeClassName).toHaveBeenCalledWith(
        expect.objectContaining({ "button--width-auto": true })
      );
    });
  });

  describe("when an href is provided", () => {
    const MOCK_HREF = "/resume";

    it("renders a link instead of a button", () => {
      render(
        <Button
          href={MOCK_HREF}
          target="_blank"
          rel="noopener noreferrer"
          text={MOCK_TEXT}
        />
      );

      const link = screen.getByRole("link", { name: MOCK_TEXT });

      expect(link).toHaveAttribute("href", MOCK_HREF);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
      expect(mockedcreateCompositeClassName).toHaveBeenCalledWith(
        expect.objectContaining({ "button--link": true })
      );
    });

    it("invokes the provided onClick handler", () => {
      const mockOnClickHandler = jest.fn();
      render(<Button href="#" text={MOCK_TEXT} onClick={mockOnClickHandler} />);

      fireEvent.click(screen.getByRole("link"));
      expect(mockOnClickHandler).toHaveBeenCalledTimes(1);
    });
  });
});
