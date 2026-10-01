import { renderHook } from "@testing-library/react";

import usePrevious from "@hooks/usePrevious";

describe("usePrevious", () => {
  it("maintains the previous value of the provided mutating value", () => {
    let value = "foo";

    const { result, rerender } = renderHook(() => usePrevious(value));

    expect(result.current).toBeUndefined();

    value = "bar";

    rerender();

    expect(result.current).toBe("foo");

    value = "baz";

    rerender();

    expect(result.current).toBe("bar");
  });

  it("keeps the previous value across renders that don't change the value", () => {
    let value = "foo";

    const { result, rerender } = renderHook(() => usePrevious(value));

    value = "bar";
    rerender();
    rerender();

    expect(result.current).toBe("foo");
  });

  it("stores function values without calling them", () => {
    const first = jest.fn();
    const second = jest.fn();
    let value = first;

    const { result, rerender } = renderHook(() => usePrevious(value));

    value = second;
    rerender();

    expect(result.current).toBe(first);
    expect(first).not.toHaveBeenCalled();
  });
});
