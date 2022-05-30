import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import {
  JestUtilities,
  MockFunctionComponentWrapper,
} from "react-testing-utilities";

import createCompositeClassName from "@utilities/createCompositeClassName";
import Input from "@utilities/Components/Input/Input";
import TextInput from "@stories/TextInput/TextInput";

jest.mock("@utilities/createCompositeClassName");
const MOCK_CLASSNAMES = "class_name";
const mockedcreateCompositeClassName = JestUtilities.assertAsMockFunction(
  createCompositeClassName
);
mockedcreateCompositeClassName.mockReturnValue(MOCK_CLASSNAMES);

jest.mock("@utilities/Components/Input/Input");
const mockBaseInput = new MockFunctionComponentWrapper(Input);
const MOCK_BASE_INPUT = "mockBaseInput";
mockBaseInput.mockReturnValue(<div data-testid={MOCK_BASE_INPUT} />);

describe("TextInput", () => {
  const MOCK_TEXT = "Text Input";
  const MOCK_ON_CHANGE = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the provided text and applies the conditional classnames", () => {
    render(<TextInput value={MOCK_TEXT} onChange={MOCK_ON_CHANGE} />);

    expect(mockedcreateCompositeClassName).toHaveBeenCalledTimes(1);
    expect(mockedcreateCompositeClassName).toHaveBeenCalledWith({
      textInput: true,
      "": true,
    });

    mockBaseInput.assertOnScreen();
    mockBaseInput.assertCalledWith({
      value: MOCK_TEXT,
      onChange: MOCK_ON_CHANGE,
      inputType: "text",
      size: "lg",
      label: undefined,
      disabled: undefined,
      error: undefined,
      className: MOCK_CLASSNAMES,
    });
  });

  describe("when a label is provided", () => {
    it("applies the label element", () => {
      const MOCK_LABEL = "Label";

      render(
        <TextInput
          value={MOCK_TEXT}
          onChange={MOCK_ON_CHANGE}
          label={MOCK_LABEL}
        />
      );

      mockBaseInput.assertOnScreen();
      mockBaseInput.assertCalledWith({
        value: MOCK_TEXT,
        onChange: MOCK_ON_CHANGE,
        inputType: "text",
        size: "lg",
        label: MOCK_LABEL,
        disabled: undefined,
        error: undefined,
        className: MOCK_CLASSNAMES,
      });
    });

    describe("when a placeholder is provided", () => {
      it("applies the placeholder property", () => {
        const MOCK_PLACEHOLDER = "placeholder";

        render(
          <TextInput
            value={MOCK_TEXT}
            onChange={MOCK_ON_CHANGE}
            placeholder={MOCK_PLACEHOLDER}
          />
        );

        mockBaseInput.assertOnScreen();
        mockBaseInput.assertCalledWith({
          value: MOCK_TEXT,
          onChange: MOCK_ON_CHANGE,
          inputType: "text",
          size: "lg",
          label: undefined,
          placeholder: MOCK_PLACEHOLDER,
          disabled: undefined,
          error: undefined,
          className: MOCK_CLASSNAMES,
        });
      });
    });

    describe("when there is an error", () => {
      it("it applies the provided error", () => {
        const MOCK_ERROR = "error";

        render(
          <TextInput
            value={MOCK_TEXT}
            onChange={MOCK_ON_CHANGE}
            error={MOCK_ERROR}
          />
        );

        mockBaseInput.assertOnScreen();
        mockBaseInput.assertCalledWith({
          value: MOCK_TEXT,
          onChange: MOCK_ON_CHANGE,
          inputType: "text",
          size: "lg",
          label: undefined,
          placeholder: undefined,
          disabled: undefined,
          error: MOCK_ERROR,
          className: MOCK_CLASSNAMES,
        });
      });
    });

    describe("when disabled is true", () => {
      it("applies the disabled styling", () => {
        render(
          <TextInput value={MOCK_TEXT} onChange={MOCK_ON_CHANGE} disabled />
        );

        mockBaseInput.assertOnScreen();
        mockBaseInput.assertCalledWith({
          value: MOCK_TEXT,
          onChange: MOCK_ON_CHANGE,
          inputType: "text",
          size: "lg",
          label: undefined,
          placeholder: undefined,
          disabled: true,
          error: undefined,
          className: MOCK_CLASSNAMES,
        });
      });
    });
  });
});
