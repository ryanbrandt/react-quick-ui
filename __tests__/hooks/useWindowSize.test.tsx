import { renderHook } from "@testing-library/react-hooks";

import useWindowSize from "@hooks/useWindowSize";

describe("useWindowSize", () => {
  it("adds an event listener on call and cleans up on unmount", () => {
    const EXPECTED_EVENT = "resize";
    const events: {
      [key: string]: EventListenerOrEventListenerObject | undefined;
    } = {};

    jest
      .spyOn(window, "addEventListener")
      .mockImplementation((event, handle, _options) => {
        events[event] = handle;
      });

    jest
      .spyOn(window, "removeEventListener")
      .mockImplementation((event, _handle, _options) => {
        events[event] = undefined;
      });

    const hook = renderHook(() => useWindowSize());

    expect(events[EXPECTED_EVENT]).toBeDefined();

    hook.unmount();

    expect(events[EXPECTED_EVENT]).toBeUndefined();
  });

  it("returns the window sizes from the window object", () => {
    const { result } = renderHook(() => useWindowSize());

    expect(result.current).toEqual({
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      outerWidth: window.outerWidth,
      outerHeight: window.outerHeight,
    });
  });
});
