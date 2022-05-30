import { useRef, useEffect } from "react";

/**
 * Generic hook which provides the previous value which may be useful
 * for prop/state comparisons
 *
 * @param value The changing value of interest
 * @returns The previous value of the provided variable
 */
const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export default usePrevious;
