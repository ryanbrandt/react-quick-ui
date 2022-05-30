import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Badge from "@stories/Badge/Badge";

describe("Badge", () => {
  const MOCK_TEXT = "Badge";

  it("renders the provided text", () => {
    render(<Badge text={MOCK_TEXT} />);

    expect(screen.getByText(MOCK_TEXT)).toBeInTheDocument();
  });

  describe("when no style props are provided", () => {
    it("defaults to the primary/md styling", () => {
      const { container } = render(<Badge text={MOCK_TEXT} />);

      expect(screen.getByText(MOCK_TEXT)).toBeInTheDocument();
      expect(container.querySelector("div")?.className).toBe(
        "badge badge--primary badge--md"
      );
    });
  });

  describe("when style props are provided", () => {
    it("applies the provided styles", () => {
      const MOCK_SIZE = "xlg";
      const MOCK_VARIANT = "warning";
      const { container } = render(
        <Badge text={MOCK_TEXT} variant={MOCK_VARIANT} size={MOCK_SIZE} />
      );

      expect(screen.getByText(MOCK_TEXT)).toBeInTheDocument();
      expect(container.querySelector("div")?.className).toBe(
        `badge badge--${MOCK_VARIANT} badge--${MOCK_SIZE}`
      );
    });
  });
});
