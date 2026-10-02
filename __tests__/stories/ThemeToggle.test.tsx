import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ThemeToggle from "@stories/ThemeToggle/ThemeToggle";

describe("ThemeToggle", () => {
  const onChange = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders a labelled group of three radios with the value checked", () => {
    render(<ThemeToggle value="dark" onChange={onChange} />);

    const group = screen.getByRole("radiogroup", { name: "Theme" });
    expect(group).toHaveClass("theme-toggle");
    const radios = screen.getAllByRole("radio");
    expect(radios.map((radio) => radio.getAttribute("aria-label"))).toEqual([
      "Light",
      "Dark",
      "System",
    ]);
    expect(screen.getByRole("radio", { name: "Dark" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Light" })).not.toBeChecked();
    // One group: the radios share a name.
    expect(
      new Set(radios.map((radio) => radio.getAttribute("name"))).size
    ).toBe(1);
  });

  it("reports the picked theme without changing its value itself", async () => {
    render(<ThemeToggle value="light" onChange={onChange} />);

    await userEvent.click(screen.getByRole("radio", { name: "System" }));

    expect(onChange).toHaveBeenCalledWith("system");
    // Controlled: still "light" until the owner passes a new value.
    expect(screen.getByRole("radio", { name: "Light" })).toBeChecked();
  });

  it("takes a label and a className", () => {
    render(
      <ThemeToggle
        value="light"
        onChange={onChange}
        label="Colour theme"
        className="custom"
      />
    );

    expect(
      screen.getByRole("radiogroup", { name: "Colour theme" })
    ).toHaveClass("theme-toggle", "custom");
  });
});
