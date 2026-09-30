interface IConditionalClassName {
  [className: string]: boolean | undefined | null;
}

/**
 * Helper to create a string of classnames based on provided conditions
 *
 * @param classNames The classnames to conditionally append to the string
 * @see IConditionalClassName
 *
 * @returns A space-separated string of the non-empty classnames whose conditions are truthy
 */
const createCompositeClassName = (classNames: IConditionalClassName): string =>
  Object.entries(classNames)
    .filter(([className, condition]) => condition && className !== "")
    .map(([className]) => className)
    .join(" ");

export default createCompositeClassName;
