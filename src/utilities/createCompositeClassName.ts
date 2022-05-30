interface IConditionalClassName {
  [className: string]: boolean | undefined | null;
}

/**
 * Helper to create a string of classnames based on provided conditions
 *
 * @param classNames The classnames to conditionally append to the string
 * @see IConditionalClassName
 *
 * @returns A classnames string containing all of the classnames with satisfied conditions
 */
const createCompositeClassName = (classNames: IConditionalClassName): string =>
  Object.keys(classNames).reduce((classNamesString, className) => {
    if (className && classNames[className]) {
      return `${classNamesString} ${className}`;
    }

    return classNamesString;
  });

export default createCompositeClassName;
