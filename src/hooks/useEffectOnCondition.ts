import { DependencyList, EffectCallback, useEffect } from "react";

/**
 * Generic hook to run an effect given a specific condition
 *
 * @param condition The condition under which to run the effect
 * @param effect The effect to run if the condition is met
 * @param deps The optional additional dependency array
 */
const useEffectOnCondition = (
  condition: boolean,
  effect: EffectCallback,
  deps: DependencyList = []
): void => {
  useEffect(() => {
    if (condition) {
      effect();
    }
  }, [condition, effect, ...deps]);
};

export default useEffectOnCondition;
