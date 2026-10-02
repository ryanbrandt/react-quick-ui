import { render, screen } from "@testing-library/react";

import Badge from "@stories/Badge/Badge";

describe("Badge (deprecated alias of Tag)", () => {
  const MOCK_TEXT = "Badge";

  it("renders a primary/md Tag with the badge class by default", () => {
    render(<Badge text={MOCK_TEXT} />);

    expect(screen.getByText(MOCK_TEXT)).toHaveClass(
      "tag tag--primary tag--md badge",
      { exact: true }
    );
  });

  it("passes the variant and class name through", () => {
    render(<Badge text={MOCK_TEXT} variant="danger" className="extra" />);

    expect(screen.getByText(MOCK_TEXT)).toHaveClass(
      "tag tag--danger tag--md badge extra",
      { exact: true }
    );
  });

  it.each([
    ["sm", "md"],
    ["lg", "lg"],
    ["xlg", "lg"],
  ] as const)("maps size %s to the %s tag", (size, tagSize) => {
    render(<Badge text={MOCK_TEXT} size={size} />);

    expect(screen.getByText(MOCK_TEXT)).toHaveClass(`tag--${tagSize}`);
  });
});
