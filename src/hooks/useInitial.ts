import { useState } from "react";

/**
 * Generic hook which provides the initial value which may be useful
 * for comparing initial state to new/current state
 *
 * @param value The initial value of interest
 * @returns Always the initial value provided, regardless if the value
 * is updated
 */
const useInitial = <T>(value: T): T => {
  // The initializer form stores a function value as-is instead of calling it.
  const [initial] = useState(() => value);

  return initial;
};

export default useInitial;
