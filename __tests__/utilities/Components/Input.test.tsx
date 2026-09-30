import type { HTMLInputTypeAttribute } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Input from "@utilities/Components/Input";

describe("Input", () => {
  const MOCK_INPUT_TYPE = "text";

  const getWrapper = (container: HTMLElement) =>
    container.firstChild as HTMLElement;

  const getInput = (container: HTMLElement) =>
    container.querySelector("input") as HTMLInputElement;

  const assertInputAttributes = (
    container: HTMLElement,
    attributes: {
      value: string;
      type: HTMLInputTypeAttribute;
      disabled: boolean;
      placeholder: string | undefined;
      min: string | undefined;
      max: string | undefined;
    }
  ) => {
    const input = getInput(container);

    expect(input.value).toBe(attributes.value);
    expect(input.type).toBe(attributes.type);
    expect(input.disabled).toBe(attributes.disabled);
    expect(input.placeholder).toBe(attributes.placeholder);
    expect(input.min).toBe(attributes.min);
    expect(input.max).toBe(attributes.max);
  };

  it("renders the input with the expected default attributes and classes applied", () => {
    const { container } = render(<Input inputType={MOCK_INPUT_TYPE} />);

    expect(getWrapper(container).className).toBe("input input--md");
    expect(getInput(container).className).toBe("input__input");
    assertInputAttributes(container, {
      value: "",
      disabled: false,
      type: MOCK_INPUT_TYPE,
      placeholder: "",
      min: "",
      max: "",
    });
  });

  describe("when an error is provided", () => {
    describe("when the error is a string", () => {
      it("converts the error to an IInput error, stylizes the input and renders the error as expected", () => {
        const mockError = "error";
        const { container } = render(
          <Input inputType={MOCK_INPUT_TYPE} error={mockError} />
        );

        expect(getInput(container).className).toBe(
          "input__input input__input--error"
        );
        expect(screen.getByText(mockError)).toBeInTheDocument();
      });
    });

    describe("when the error is an IInputError", () => {
      it("stylizes the input and renders the error as expected", () => {
        const mockError = { error: true, text: "foo" };
        const { container } = render(
          <Input inputType={MOCK_INPUT_TYPE} error={mockError} />
        );

        expect(getInput(container).className).toBe(
          "input__input input__input--error"
        );
        expect(screen.getByText(mockError.text)).toBeInTheDocument();
      });
    });
  });

  describe("when a label is provided", () => {
    const mockLabel = "label";

    it("renders the label linked to the input by a generated id", () => {
      const { container } = render(
        <Input inputType={MOCK_INPUT_TYPE} label={mockLabel} />
      );

      const input = getInput(container);
      expect(input.id).not.toBe("");
      expect(screen.getByLabelText(mockLabel)).toBe(input);
    });

    it("gives each input its own generated id", () => {
      render(
        <>
          <Input inputType={MOCK_INPUT_TYPE} label="first" />
          <Input inputType={MOCK_INPUT_TYPE} label="second" />
        </>
      );

      expect(screen.getByLabelText("first").id).not.toBe(
        screen.getByLabelText("second").id
      );
    });

    describe("when an id is provided", () => {
      it("uses the provided id for the input and the label", () => {
        render(
          <Input inputType={MOCK_INPUT_TYPE} label={mockLabel} id="foo" />
        );

        expect(screen.getByLabelText(mockLabel).id).toBe("foo");
      });
    });
  });

  describe("when a size is provided", () => {
    it("applies the provided size", () => {
      const { container } = render(
        <Input inputType={MOCK_INPUT_TYPE} size="lg" />
      );

      expect(getWrapper(container).className).toBe("input input--lg");
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

        await userEvent.type(getInput(container), mockNewValue);

        expect(mockOnChange).toHaveBeenLastCalledWith(mockNewValue);
      });
    });
  });

  describe("when an onChange is not provided", () => {
    describe("when the input value changes", () => {
      it("does nothing", async () => {
        const { container } = render(<Input inputType={MOCK_INPUT_TYPE} />);

        await userEvent.type(getInput(container), "A");

        expect(getInput(container).value).toBe("");
      });
    });
  });

  describe("when a className is provided", () => {
    it("applies the provided class name to the wrapper", () => {
      const { container } = render(
        <Input inputType={MOCK_INPUT_TYPE} className="Foo" />
      );

      expect(getWrapper(container).className).toBe("input input--md Foo");
    });
  });

  describe("when disabled is provided", () => {
    it("applies the provided disabled attribute", () => {
      const { container } = render(
        <Input inputType={MOCK_INPUT_TYPE} disabled />
      );

      assertInputAttributes(container, {
        value: "",
        disabled: true,
        type: MOCK_INPUT_TYPE,
        placeholder: "",
        min: "",
        max: "",
      });
    });
  });

  describe.each(["left", "right"] as const)(
    "when an icon positioned %s is provided",
    (position) => {
      it("renders the icon with the positional icon class and pads the input on that side", () => {
        const { container } = render(
          <Input
            inputType={MOCK_INPUT_TYPE}
            icon={{ position, icon: <span data-testid="icon" /> }}
          />
        );

        const icon = screen.getByTestId("icon");
        expect(icon).toBeInTheDocument();
        expect((icon.parentElement as HTMLElement).className).toBe(
          `input__icon input__icon--${position}`
        );
        expect(getInput(container).className).toBe(
          `input__input input__input--with-icon--${position}`
        );
      });
    }
  );
});
