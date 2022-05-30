import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { MockFunctionComponentWrapper } from "react-testing-utilities";

import Input from "@utilities/Components/Input/Input";
import PasswordInput from "@stories/PasswordInput/PasswordInput";

jest.mock("@utilities/Components/Input/Input");
const mockBaseInput = new MockFunctionComponentWrapper(Input);

describe("PasswordInput", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const MOCK_VALUE = "Password123$";
  const MOCK_DEFAULT_INPUT_TYPE = "password";
  const MOCK_ON_CHANGE = jest.fn();

  it("renters the component with the specified props", () => {
    const MOCK_SIZE = "lg";
    const MOCK_LABEL = "Label String:";

    const MOCK_ERROR = {
      error: true,
      text: "Error string!!",
    };
    const MOCK_DISABLED = true;
    const MOCK_PLACEHOLDER = "Placeholder string....";
    const MOCK_CLASS_NAME = "password-style-class";

    render(
      <PasswordInput
        value={MOCK_VALUE}
        onChange={MOCK_ON_CHANGE}
        size={MOCK_SIZE}
        label={MOCK_LABEL}
        disabled={MOCK_DISABLED}
        error={MOCK_ERROR}
        placeholder={MOCK_PLACEHOLDER}
        className={MOCK_CLASS_NAME}
      />
    );

    mockBaseInput.assertOnScreen();
    mockBaseInput.assertCalledWith({
      value: MOCK_VALUE,
      onChange: expect.any(Function),
      inputType: MOCK_DEFAULT_INPUT_TYPE,
      size: MOCK_SIZE,
      label: MOCK_LABEL,
      disabled: MOCK_DISABLED,
      error: MOCK_ERROR,
      placeholder: MOCK_PLACEHOLDER,
      className: MOCK_CLASS_NAME,
    });
  });
});
