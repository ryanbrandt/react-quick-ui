import { render } from "@testing-library/react";

import CheckSvg from "@svgs/CheckSvg/CheckSvg";
import CloseSvg from "@svgs/CloseSvg/CloseSvg";
import MenuSvg from "@svgs/MenuSvg/MenuSvg";
import MonitorSvg from "@svgs/MonitorSvg/MonitorSvg";
import MoonSvg from "@svgs/MoonSvg/MoonSvg";
import PencilSvg from "@svgs/PencilSvg/PencilSvg";
import SearchSvg from "@svgs/SearchSvg/SearchSvg";
import SunSvg from "@svgs/SunSvg/SunSvg";

describe.each([
  ["CheckSvg", CheckSvg],
  ["CloseSvg", CloseSvg],
  ["MenuSvg", MenuSvg],
  ["MonitorSvg", MonitorSvg],
  ["MoonSvg", MoonSvg],
  ["PencilSvg", PencilSvg],
  ["SearchSvg", SearchSvg],
  ["SunSvg", SunSvg],
])("%s", (_, Svg) => {
  it("renders an svg with the provided props applied", () => {
    const { container } = render(<Svg className="custom" />);

    expect(container.querySelector("svg")).toHaveClass("custom");
  });
});
