import { useState, useEffect } from "react";

export const DEFAULT_VALUE_DEBOUNCE_TIME = 500;

/**
 * Generic hook to provide a debounce to a value
 *
 * @param value The value to debounce
 * @param wait The debounce wait time
 *
 * @returns The value, whenever updated, after the wait
 */
const useDebounce = <T>(value: T, wait = DEFAULT_VALUE_DEBOUNCE_TIME): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const debouncedUpdater = setTimeout(() => setDebouncedValue(value), wait);

    return () => clearTimeout(debouncedUpdater);
  }, [value, wait, setDebouncedValue]);

  return debouncedValue;
};

export default useDebounce;
