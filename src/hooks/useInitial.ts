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

  // Reading a ref during render breaks React Compiler memoization. Keeping the
  // current behaviour until Q7 (React 19) revisits this hook.
  // eslint-disable-next-line react-hooks/refs
  return ref.current;
};

export default useInitial;
