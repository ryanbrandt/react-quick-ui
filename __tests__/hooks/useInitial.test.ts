import { renderHook } from "@testing-library/react";

import useInitial from "@hooks/useInitial";

describe("useInitial", () => {
  it("maintains the initial value of a mutating value", () => {
    let value = "foo";

    const { result, rerender } = renderHook(() => useInitial(value));

    expect(result.current).toBe("foo");

    value = "bar";

    rerender();

    expect(result.current).toBe("foo");
  });

  it("stores a function value without calling it", () => {
    const value = jest.fn();

    const { result } = renderHook(() => useInitial(value));

    expect(result.current).toBe(value);
    expect(value).not.toHaveBeenCalled();
  });
});
