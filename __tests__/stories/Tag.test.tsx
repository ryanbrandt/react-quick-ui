import { render, screen } from "@testing-library/react";

import Tag from "@stories/Tag/Tag";

describe("Tag", () => {
  const MOCK_TEXT = "React";

  it("renders the text with the primary/md styling by default", () => {
    render(<Tag text={MOCK_TEXT} />);

    expect(screen.getByText(MOCK_TEXT)).toHaveClass(
      "tag tag--primary tag--md",
      { exact: true }
    );
  });

  it("applies the provided variant, size and class name", () => {
    render(
      <Tag text={MOCK_TEXT} variant="warning" size="lg" className="extra" />
    );

    expect(screen.getByText(MOCK_TEXT)).toHaveClass(
      "tag tag--warning tag--lg extra",
      { exact: true }
    );
  });
});
