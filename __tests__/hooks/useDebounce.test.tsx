import { useState } from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import useDebounce, { DEFAULT_VALUE_DEBOUNCE_TIME } from "@hooks/useDebounce";

describe("useDebounce", () => {
  const mockInitialValue = "bar";
  const mockUpdateValue = "foo";

  const MockComponent = () => {
    const [value, setValue] = useState(mockInitialValue);

    const debouncedValue = useDebounce(value);

    return (
      <button onClick={() => setValue(mockUpdateValue)}>
        {debouncedValue}
      </button>
    );
  };

  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global, "setTimeout");
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it("debounces updates applied to the value", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<MockComponent />);

    expect(screen.getByRole("button")).toHaveTextContent(mockInitialValue);
    expect(setTimeout).toHaveBeenLastCalledWith(
      expect.any(Function),
      DEFAULT_VALUE_DEBOUNCE_TIME
    );

    await user.click(screen.getByRole("button"));

    act(() => {
      jest.advanceTimersByTime(DEFAULT_VALUE_DEBOUNCE_TIME - 1);
    });
    expect(screen.getByRole("button")).toHaveTextContent(mockInitialValue);

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(screen.getByRole("button")).toHaveTextContent(mockUpdateValue);
  });
});
