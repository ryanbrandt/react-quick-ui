import "@testing-library/jest-dom";
import { HTMLInputTypeAttribute } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { JestUtilities } from "react-testing-utilities";

import createCompositeClassName from "@utilities/createCompositeClassName";
import Input from "@utilities/Components/Input/Input";

jest.mock("@utilities/createCompositeClassName");
const MOCK_CLASSNAMES = "class_name";
const mockedcreateCompositeClassName = JestUtilities.assertAsMockFunction(
  createCompositeClassName
);
mockedcreateCompositeClassName.mockReturnValue(MOCK_CLASSNAMES);

describe("Input", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const MOCK_INPUT_TYPE = "text";

  const assertInputAttributes = (
    container: HTMLElement,
    attributes: {
      value: string;
      type: HTMLInputTypeAttribute;
      className: string;
      disabled: boolean;
      placeholder: string | undefined;
      min: string | undefined;
      max: string | undefined;
    }
  ) => {
    const input = container.querySelector("input") as HTMLInputElement;

    expect(input.value).toBe(attributes.value);
    expect(input.type).toBe(attributes.type);
    expect(input.className).toBe(attributes.className);
    expect(input.disabled).toBe(attributes.disabled);
    expect(input.placeholder).toBe(attributes.placeholder);
    expect(input.min).toBe(attributes.min);
    expect(input.max).toBe(attributes.max);
  };

  const assertInputStyling = (error: boolean, size = "md", className = "") => {
    expect(mockedcreateCompositeClassName).toHaveBeenCalledWith({
      input: true,
      [`input--${size}`]: true,
      [className]: true,
    });

    expect(mockedcreateCompositeClassName).toHaveBeenCalledWith({
      input__input: true,
      "input__input--error": error,
    });
  };

  it("renders the input with the expected default attributes applied", () => {
    const { container } = render(<Input inputType={MOCK_INPUT_TYPE} />);

    assertInputStyling(false);
    assertInputAttributes(container, {
      value: "",
      disabled: false,
      type: MOCK_INPUT_TYPE,
      className: MOCK_CLASSNAMES,
      placeholder: "",
      min: "",
      max: "",
    });
  });

  describe("when an error is provided", () => {
    describe("when the error is a string", () => {
      it("converts the error to an IInput error, stylizes the input and renders the error as expected", () => {
        const mockError = "error";
        render(<Input inputType={MOCK_INPUT_TYPE} error={mockError} />);

        assertInputStyling(true);
        expect(screen.getByText(mockError)).toBeInTheDocument();
      });
    });

    describe("when the error is an IInputError", () => {
      it("stylizes the input and renders the error as expected", () => {
        const mockError = { error: true, text: "foo" };
        render(<Input inputType={MOCK_INPUT_TYPE} error={mockError} />);

        assertInputStyling(true);
        expect(screen.getByText(mockError.text)).toBeInTheDocument();
      });
    });
  });

  describe("when a label is provided", () => {
    it("renders the input label with the provided label", () => {
      const mockLabel = "label";
      render(<Input inputType={MOCK_INPUT_TYPE} label={mockLabel} />);

      expect(screen.getByText(mockLabel)).toBeInTheDocument();
    });
  });

  describe("when a size is provided", () => {
    it("applies the provided size", () => {
      const mockSize = "lg";
      render(<Input inputType={MOCK_INPUT_TYPE} size={mockSize} />);

      assertInputStyling(false, mockSize);
    });
  });

  describe("when an onChange is provided", () => {
    describe("when the input value changes", () => {
      it("invokes the provided onChange handler with the new value", async () => {
        const mockOnChange = jest.fn();

        const { container } = render(
          <Input inputType={MOCK_INPUT_TYPE} onChange={mockOnChange} />
        );

        const mockNewValue = "A";
        const input = container.querySelector("input") as HTMLInputElement;

        await userEvent.type(input, mockNewValue);

        expect(mockOnChange).toHaveBeenLastCalledWith(mockNewValue);
      });
    });
  });

  describe("when an onChange is not provided", () => {
    describe("when the input value changes", () => {
      it("does nothing", async () => {
        const { container } = render(<Input inputType={MOCK_INPUT_TYPE} />);

        const mockNewValue = "A";
        const input = container.querySelector("input") as HTMLInputElement;

        await userEvent.type(input, mockNewValue);
      });
    });
  });

  describe("when a className is provided", () => {
    it("applies the provided class name", () => {
      const mockClassName = "Foo";
      render(<Input inputType={MOCK_INPUT_TYPE} className={mockClassName} />);

      assertInputStyling(false, undefined, mockClassName);
    });

    describe("when disabled is provided", () => {
      it("stylizes the input and applies the provided disabled attribute", () => {
        const { container } = render(
          <Input inputType={MOCK_INPUT_TYPE} disabled />
        );

        assertInputAttributes(container, {
          value: "",
          disabled: true,
          type: MOCK_INPUT_TYPE,
          className: MOCK_CLASSNAMES,
          placeholder: "",
          min: "",
          max: "",
        });
      });
    });
  });
});
