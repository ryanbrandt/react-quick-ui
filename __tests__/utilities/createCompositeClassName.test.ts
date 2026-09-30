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

  it("omits the first classname when its condition is falsy", () => {
    expect(
      createCompositeClassName({
        modal__transition: false,
        "modal__transition--animated": true,
      })
    ).toBe("modal__transition--animated");
  });

  it("adds no stray spaces for empty classnames in any position", () => {
    expect(
      createCompositeClassName({
        "": true,
        topbar: true,
        "topbar--sticky": false,
      })
    ).toBe("topbar");
  });

  it("returns an empty string when no condition is truthy", () => {
    expect(createCompositeClassName({ foo: false, bar: undefined })).toBe("");
  });
});
