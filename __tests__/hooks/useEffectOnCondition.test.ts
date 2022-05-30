import "@testing-library/jest-dom";
import { renderHook } from "@testing-library/react-hooks";

import useEffectOnCondition from "@hooks/useEffectOnCondition";

describe("useEffectOnCondition", () => {
  const mockEffect = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("when the condition is satisfied", () => {
    it("runs the provided effect", () => {
      renderHook(() => useEffectOnCondition(true, mockEffect));

      expect(mockEffect).toHaveBeenCalledTimes(1);
    });
  });

  describe("when the condition is not satisfied", () => {
    it("does run the provided effect", () => {
      renderHook(() => useEffectOnCondition(false, mockEffect, []));

      expect(mockEffect).toHaveBeenCalledTimes(0);
    });
  });
});
