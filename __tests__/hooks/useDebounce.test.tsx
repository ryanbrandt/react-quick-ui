import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import useDebounce, { DEFAULT_VALUE_DEBOUNCE_TIME } from "@hooks/useDebounce";

describe("useDebounce", () => {
  const mockInitialValue = "bar";
  const mockUpdateValue = "foo";

  let mockSetStateValue: unknown = mockInitialValue;
  const mockSetStateSetter = jest.fn((value: unknown) => {
    mockSetStateValue = value;
  });

  const MockComponent = () => {
    const [value, setValue] = React.useState(mockInitialValue);

    const debouncedValue = useDebounce(value);

    return (
      <button onClick={() => setValue(mockUpdateValue)}>
        {debouncedValue}
      </button>
    );
  };

  beforeAll(() => {
    jest.useFakeTimers({ legacyFakeTimers: true });

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

    // Not awaited: user-event's internal delays would wait on the fake timers.
    void userEvent.click(stateUpdateBtn);
    jest.advanceTimersByTime(DEFAULT_VALUE_DEBOUNCE_TIME);

    await waitFor(() => expect(mockSetStateSetter).toHaveBeenCalledTimes(2));
    expect(mockSetStateSetter).toHaveBeenCalledWith(mockUpdateValue);
  });
});
