import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { JestUtilities } from "react-testing-utilities";

import createCompositeClassName from "@utilities/createCompositeClassName";
import TextArea from "@stories/TextArea/TextArea";

jest.mock("@utilities/createCompositeClassName");
const MOCK_CLASSNAMES = "class_name";
const mockedcreateCompositeClassName = JestUtilities.assertAsMockFunction(
  createCompositeClassName
);
mockedcreateCompositeClassName.mockReturnValue(MOCK_CLASSNAMES);

describe("TextArea", () => {
  const MOCK_TEXT = "Text Area";
  const MOCK_ON_CHANGE = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the provided text and applies the conditional classnames", () => {
    const { container } = render(
      <TextArea value={MOCK_TEXT} onChange={MOCK_ON_CHANGE} />
    );

    const textArea = container.querySelector("textarea") as HTMLTextAreaElement;
    expect(textArea.value).toBe(MOCK_TEXT);
    expect(textArea).toHaveClass(MOCK_CLASSNAMES);
  });

  describe("when a label is provided", () => {
    it("applies the label element", () => {
      const MOCK_LABEL = "label";

      const { container } = render(<TextArea label={MOCK_LABEL} />);

      expect(container.querySelector("label")).toHaveClass(
        "textArea__content__label"
      );
      expect(screen.getByText(MOCK_LABEL)).toBeInTheDocument();
    });
  });

  describe("when a placeholder is provided", () => {
    it("applies the placeholder property", () => {
      const MOCK_PLACEHOLDER = "placeholder";

      const { container } = render(<TextArea placeholder={MOCK_PLACEHOLDER} />);
      expect(
        (container.querySelector("textarea") as HTMLTextAreaElement).placeholder
      ).toBe(MOCK_PLACEHOLDER);
    });
  });

  describe("when there is an error", () => {
    it("it renders the error and applies styles", () => {
      const MOCK_ERROR = "error";

      const { container } = render(<TextArea error={MOCK_ERROR} />);

      expect(
        container.querySelector(".textArea__content__error")
      ).toBeInTheDocument();
      expect(screen.getByText(MOCK_ERROR)).toBeInTheDocument();
    });
  });

  describe("when disabled is true", () => {
    it("applies the disabled styling", () => {
      const { container } = render(<TextArea disabled />);

      const textarea = container.querySelector(
        "textarea"
      ) as HTMLTextAreaElement;

      expect(textarea.disabled).toBeTruthy();
    });
  });

  describe("when an onChange handler is provided", () => {
    describe("when the textarea is changed", () => {
      it("invokes the provided onChange handler", async () => {
        const { container } = render(<TextArea onChange={MOCK_ON_CHANGE} />);

        const textarea = container.querySelector(
          "textarea"
        ) as HTMLTextAreaElement;

        expect(MOCK_ON_CHANGE).toHaveBeenCalledTimes(0);

        const mockNewText = "F";
        await userEvent.type(textarea, mockNewText);

        expect(MOCK_ON_CHANGE).toHaveBeenCalledTimes(1);
        expect(MOCK_ON_CHANGE).toHaveBeenCalledWith(mockNewText);
      });
    });
  });

  describe("when an onChange handler is not provided", () => {
    describe("when the textarea is changed", () => {
      it("does nothing", async () => {
        const { container } = render(<TextArea />);

        const textarea = container.querySelector(
          "textarea"
        ) as HTMLTextAreaElement;

        const mockNewText = "F";
        await userEvent.type(textarea, mockNewText);
      });
    });
  });
});
