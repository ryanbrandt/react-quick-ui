import { useRef, useEffect } from "react";

/**
 * Generic hook which provides the previous value which may be useful
 * for prop/state comparisons
 *
 * @param value The changing value of interest
 * @returns The previous value of the provided variable
 */
const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  // Reading a ref during render breaks React Compiler memoization. Keeping the
  // current behaviour until Q7 (React 19) revisits this hook.
  // eslint-disable-next-line react-hooks/refs
  return ref.current;
};

export default usePrevious;
