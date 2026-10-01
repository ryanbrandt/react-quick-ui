import { useState } from "react";

/**
 * Generic hook which provides the previous value which may be useful
 * for prop/state comparisons
 *
 * @param value The changing value of interest
 * @returns The value before the most recent change, or undefined until
 * the value first changes
 */
const usePrevious = <T>(value: T): T | undefined => {
  // Keep the values in state, not a ref, so render reads nothing mutable
  // (React Compiler friendly). The function forms store a function value
  // as-is instead of calling it.
  const [current, setCurrent] = useState(() => value);
  const [previous, setPrevious] = useState<T>();

  if (!Object.is(value, current)) {
    // React re-renders with the new state before committing this render.
    setPrevious(() => current);
    setCurrent(() => value);
  }

  return previous;
};

export default usePrevious;
