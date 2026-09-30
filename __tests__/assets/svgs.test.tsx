import { render } from "@testing-library/react";

import CheckSvg from "@svgs/CheckSvg/CheckSvg";
import PencilSvg from "@svgs/PencilSvg/PencilSvg";
import SearchSvg from "@svgs/SearchSvg/SearchSvg";

describe.each([
  ["CheckSvg", CheckSvg],
  ["PencilSvg", PencilSvg],
  ["SearchSvg", SearchSvg],
])("%s", (_, Svg) => {
  it("renders an svg with the provided props applied", () => {
    const { container } = render(<Svg className="custom" />);

    expect(container.querySelector("svg")).toHaveClass("custom");
  });
});
