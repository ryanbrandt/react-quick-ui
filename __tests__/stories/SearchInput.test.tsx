import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import {
  JestUtilities,
  MockFunctionComponentWrapper,
} from "react-testing-utilities";

import createCompositeClassName from "@utilities/createCompositeClassName";
import Input from "@utilities/Components/Input/Input";
import SearchInput from "@stories/SearchInput/SearchInput";

jest.mock("@utilities/createCompositeClassName");
const MOCK_CLASSNAMES = "class_name";
const mockedcreateCompositeClassName = JestUtilities.assertAsMockFunction(
  createCompositeClassName
);
mockedcreateCompositeClassName.mockReturnValue(MOCK_CLASSNAMES);

jest.mock("@utilities/Components/Input/Input");
const mockBaseInput = new MockFunctionComponentWrapper(Input);

describe("Search", () => {
  const MOCK_TEXT = "Search";
  const MOCK_ON_CHANGE = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the base input with the provided value, on change and expected type", () => {
    render(<SearchInput value={MOCK_TEXT} onChange={MOCK_ON_CHANGE} />);

    mockBaseInput.assertOnScreen();
    mockBaseInput.assertCalledWith({
      value: MOCK_TEXT,
      onChange: MOCK_ON_CHANGE,
      inputType: "search",
      size: "xlg",
    });

    expect(mockedcreateCompositeClassName).toHaveBeenCalledWith({
      "search-input": true,
      "": true,
    });
  });

  describe("when a placeholder is provided", () => {
    it("applies the placeholder property", () => {
      const MOCK_PLACEHOLDER = "placeholder";
      render(
        <SearchInput
          value={MOCK_TEXT}
          onChange={MOCK_ON_CHANGE}
          placeholder={MOCK_PLACEHOLDER}
        />
      );

      mockBaseInput.assertCalledWith({
        placeholder: MOCK_PLACEHOLDER,
      });
    });
  });

  describe("when a className is provided", () => {
    it("applies the provided className", () => {
      const MOCK_CLASSNAME = "className";
      render(
        <SearchInput
          value={MOCK_TEXT}
          onChange={MOCK_ON_CHANGE}
          className={MOCK_CLASSNAME}
        />
      );

      expect(mockedcreateCompositeClassName).toHaveBeenCalledWith({
        "search-input": true,
        [MOCK_CLASSNAME]: true,
      });
    });
  });

  describe("when a size is provided", () => {
    it("applies the provided size", () => {
      const MOCK_SIZE = "lg";
      render(
        <SearchInput
          value={MOCK_TEXT}
          onChange={MOCK_ON_CHANGE}
          size={MOCK_SIZE}
        />
      );

      mockBaseInput.assertCalledWith({
        size: MOCK_SIZE,
      });
    });
  });

  describe("when disabled is provided", () => {
    it("applies the provided placeholder", () => {
      const MOCK_DISABLED = true;
      render(
        <SearchInput
          value={MOCK_TEXT}
          onChange={MOCK_ON_CHANGE}
          disabled={MOCK_DISABLED}
        />
      );

      mockBaseInput.assertCalledWith({
        disabled: MOCK_DISABLED,
      });
    });
  });
});
