import { renderHook } from "@testing-library/react-hooks";

import usePrevious from "@hooks/usePrevious";

describe("usePrevious", () => {
  it("maintains the previous value of the provided mutating value", () => {
    let value = "foo";

    const { result, rerender } = renderHook(() => usePrevious(value));

    expect(result.current).toBeUndefined();

    value = "bar";

    rerender();

    expect(result.current).toBe("foo");
  });
});
