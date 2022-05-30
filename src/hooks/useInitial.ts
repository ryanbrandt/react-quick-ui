import { useRef } from "react";

/**
 * Generic hook which provides the initial value which may be useful
 * for comparing initial state to new/current state
 *
 * @param value The initial value of interest
 * @returns Always the initial value provided, regardless if the value
 * is updated
 */
const useInitial = <T>(value: T): T => {
  const ref = useRef<T>(value);

  return ref.current;
};

export default useInitial;
