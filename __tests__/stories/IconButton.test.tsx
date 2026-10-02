import { fireEvent, render, screen } from "@testing-library/react";

import IconButton from "@stories/IconButton/IconButton";

describe("IconButton", () => {
  const MOCK_LABEL = "Open menu";
  const MOCK_ICON = <svg data-testid="icon" />;

  it("renders a secondary button named by its aria-label, with a hidden icon", () => {
    render(<IconButton aria-label={MOCK_LABEL} icon={MOCK_ICON} />);

    const button = screen.getByRole("button", { name: MOCK_LABEL });

    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveClass("icon-button icon-button--secondary", {
      exact: true,
    });
    expect(screen.getByTestId("icon").parentElement).toHaveAttribute(
      "aria-hidden",
      "true"
    );
  });

  it("applies the variant, class name and other button attributes", () => {
    const mockOnClick = jest.fn();
    render(
      <IconButton
        aria-label={MOCK_LABEL}
        icon={MOCK_ICON}
        variant="ghost"
        className="extra"
        type="submit"
        aria-expanded={false}
        onClick={mockOnClick}
      />
    );

    const button = screen.getByRole("button", { name: MOCK_LABEL });

    expect(button).toHaveClass("icon-button icon-button--ghost extra", {
      exact: true,
    });
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
