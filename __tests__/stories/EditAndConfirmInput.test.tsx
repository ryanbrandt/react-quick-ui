import type { ReactElement } from "react";
import { act as untypedAct, render } from "@testing-library/react";

import { MockFunctionComponentWrapper } from "@ryanbrandt/react-testing-utils";

import createCompositeClassName from "@utilities/createCompositeClassName";
import Input from "@utilities/Components/Input";
import EditAndConfirmInput from "@stories/EditAndConfirmInput/EditAndConfirmInput";
import CheckSvg from "@svgs/CheckSvg/CheckSvg";
import PencilSvg from "@svgs/PencilSvg/PencilSvg";

jest.mock("@svgs/PencilSvg/PencilSvg");
const mockPencilSvg = new MockFunctionComponentWrapper(PencilSvg);

jest.mock("@svgs/CheckSvg/CheckSvg");
const mockCheckSvg = new MockFunctionComponentWrapper(CheckSvg);

jest.mock("@utilities/createCompositeClassName");
const mockConditionalClassNames = jest.mocked(createCompositeClassName);

jest.mock("@utilities/Components/Input");
const mockBaseInput = new MockFunctionComponentWrapper(Input);

// RTL types `act` through React's own `act` export, which @types/react 18.2
// lacks, so typed linting sees an unresolved type. Drop this alias once the
// React types are upgraded (Q7).
const act = untypedAct as (callback: () => void) => void;
mockBaseInput.mockImplementation(({ icon }) => (
  <div>{icon ? icon.icon : undefined}</div>
));

describe("BaseEditAndConfirmInput", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const MOCK_VALUE = "";
  const MOCK_INPUT_TYPE = "email";
  const MOCK_LABEL = "label";
  const MOCK_ON_CHANGE = jest.fn();
  const MOCK_ERROR = { error: false };

  it("renders a BaseInput with the expected props", () => {
    render(
      <EditAndConfirmInput
        value={MOCK_VALUE}
        inputType={MOCK_INPUT_TYPE}
        label={MOCK_LABEL}
        error={MOCK_ERROR}
        onChange={MOCK_ON_CHANGE}
      />
    );

    expect(mockConditionalClassNames).toHaveBeenCalledWith({
      "edit-and-confirm-input__confirm-icon": true,
      "edit-and-confirm-input__confirm-icon__disabled": false,
    });
    expect(mockConditionalClassNames).toHaveBeenCalledWith({
      "edit-and-confirm-input__edit-icon": true,
      "edit-and-confirm-input__edit-icon__disabled": false,
    });

    mockPencilSvg.assertOnScreen();
    mockCheckSvg.assertNotOnScreen();

    mockBaseInput.assertOnScreen();
    mockBaseInput.assertCalledWith({
      onChange: MOCK_ON_CHANGE,
      value: MOCK_VALUE,
      error: MOCK_ERROR,
      label: MOCK_LABEL,
      size: "lg",
      inputType: MOCK_INPUT_TYPE,
      className: "",
      icon: {
        position: "right",
        icon: expect.anything() as ReactElement,
      },
      disabled: true,
    });
  });

  describe("when the pencil icon is clicked", () => {
    it("enables editing and reveals the confirmation icon", () => {
      render(<EditAndConfirmInput inputType="text" />);

      mockBaseInput.assertLastCalledWith({
        disabled: true,
      });

      mockPencilSvg.assertOnScreen();
      mockCheckSvg.assertNotOnScreen();

      const [{ onClick }] = mockPencilSvg.__OVERRIDE__mock.mock.calls[0]!;
      act(() => (onClick as () => void)());

      mockPencilSvg.assertNotOnScreen();
      mockCheckSvg.assertOnScreen();

      mockBaseInput.assertLastCalledWith({
        disabled: false,
      });
    });

    describe("when an onEditClick is provided", () => {
      it("invokes the provided function", () => {
        const mockOnEditClick = jest.fn();
        render(
          <EditAndConfirmInput inputType="text" onEditClick={mockOnEditClick} />
        );

        expect(mockOnEditClick).toHaveBeenCalledTimes(0);

        const [{ onClick }] = mockPencilSvg.__OVERRIDE__mock.mock.calls[0]!;
        act(() => (onClick as () => void)());

        expect(mockOnEditClick).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("when the confirmation icon is clicked", () => {
    it("disables editing and reveals the pencil icon", () => {
      render(<EditAndConfirmInput inputType="text" />);

      mockBaseInput.assertLastCalledWith({
        disabled: true,
      });

      const [{ onClick: onEditClick }] =
        mockPencilSvg.__OVERRIDE__mock.mock.calls[0]!;
      act(() => (onEditClick as () => void)());

      mockPencilSvg.assertNotOnScreen();
      mockCheckSvg.assertOnScreen();

      mockBaseInput.assertLastCalledWith({
        disabled: false,
      });

      const [{ onClick: onConfirmClick }] =
        mockCheckSvg.__OVERRIDE__mock.mock.calls[0]!;
      act(() => (onConfirmClick as () => void)());

      mockBaseInput.assertLastCalledWith({
        disabled: true,
      });

      mockPencilSvg.assertOnScreen();
      mockCheckSvg.assertNotOnScreen();
    });

    describe("when an onConfirmationClick is provided", () => {
      it("invokes the provided function", () => {
        const mockOnConfirmClick = jest.fn();

        render(
          <EditAndConfirmInput
            inputType="text"
            onConfirmClick={mockOnConfirmClick}
          />
        );

        const [{ onClick }] = mockPencilSvg.__OVERRIDE__mock.mock.calls[0]!;
        act(() => (onClick as () => void)());

        const [{ onClick: onConfirmClick }] =
          mockCheckSvg.__OVERRIDE__mock.mock.calls[0]!;
        act(() => (onConfirmClick as () => void)());

        expect(mockOnConfirmClick).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("when confirmDisabled is true", () => {
    it("disables the confirmation icon", () => {
      render(<EditAndConfirmInput inputType="text" confirmDisabled />);

      expect(mockConditionalClassNames).toHaveBeenCalledWith({
        "edit-and-confirm-input__confirm-icon": true,
        "edit-and-confirm-input__confirm-icon__disabled": true,
      });
    });
  });

  describe("when editDisabled is true", () => {
    it("disables the edit icon", () => {
      render(<EditAndConfirmInput inputType="text" editDisabled />);

      expect(mockConditionalClassNames).toHaveBeenCalledWith({
        "edit-and-confirm-input__edit-icon": true,
        "edit-and-confirm-input__edit-icon__disabled": true,
      });
    });
  });
});
