import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import useDebounce, { DEFAULT_VALUE_DEBOUNCE_TIME } from "@hooks/useDebounce";

describe("useDebounce", () => {
  const mockInitialValue = "bar";
  const mockUpdateValue = "foo";

  let mockSetStateValue = mockInitialValue;
  const mockSetStateSetter = jest.fn(
    // eslint-disable-next-line no-return-assign
    (value: any) => (mockSetStateValue = value)
  );

  const MockComponent = () => {
    const [value, setValue] = React.useState(mockInitialValue);

    const debouncedValue = useDebounce(value);

    return (
      <div onClick={() => setValue(mockUpdateValue)}>{debouncedValue}</div>
    );
  };

  beforeAll(() => {
    jest.useFakeTimers("legacy");

    jest
      .spyOn(React, "useState")
      .mockImplementation(() => [mockSetStateValue, mockSetStateSetter]);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("debounces updates applied to the value", async () => {
    render(<MockComponent />);
    jest.advanceTimersByTime(DEFAULT_VALUE_DEBOUNCE_TIME);

    const stateUpdateBtn = screen.getByText(mockInitialValue);

    expect(setTimeout).toHaveBeenLastCalledWith(
      expect.any(Function),
      DEFAULT_VALUE_DEBOUNCE_TIME
    );
    expect(mockSetStateSetter).toHaveBeenCalledTimes(1);
    expect(mockSetStateSetter).toHaveBeenCalledWith(mockInitialValue);

    userEvent.click(stateUpdateBtn);
    jest.advanceTimersByTime(DEFAULT_VALUE_DEBOUNCE_TIME);

    await waitFor(() => expect(mockSetStateSetter).toHaveBeenCalledTimes(2));
    expect(mockSetStateSetter).toHaveBeenCalledWith(mockUpdateValue);
  });
});
