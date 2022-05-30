import createCompositeClassName from "@utilities/createCompositeClassName";

describe("createCompositeClassName", () => {
  it("returns a string containing all non-empty classnames with truthy conditions", () => {
    const trueClass = "true_class";
    const truthyClass = "truthy_class";
    const undefinedClass = "undefined_class";
    const falseClass = "false_class";
    const nullClass = "null_class";
    const emptyClass = "";

    const result = createCompositeClassName({
      [trueClass]: true,
      [undefinedClass]: undefined,
      [nullClass]: null,
      [falseClass]: false,
      [truthyClass]: !false,
      [emptyClass]: true,
    });

    expect(result).toBe(`${trueClass} ${truthyClass}`);
  });
});
