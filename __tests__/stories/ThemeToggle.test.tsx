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

  describe("options", () => {
    it("renders only the given options, in order", () => {
      render(
        <ThemeToggle
          value="dark"
          onChange={onChange}
          options={["dark", "light"]}
        />
      );

      expect(
        screen
          .getAllByRole("radio")
          .map((radio) => radio.getAttribute("aria-label"))
      ).toEqual(["Dark", "Light"]);
      expect(screen.getByRole("radio", { name: "Dark" })).toBeChecked();
    });

    it("checks nothing when the value isn't one of them", () => {
      render(
        <ThemeToggle
          value="system"
          onChange={onChange}
          options={["light", "dark"]}
        />
      );

      for (const radio of screen.getAllByRole("radio")) {
        expect(radio).not.toBeChecked();
      }
    });

    it("reports the picked option", async () => {
      render(
        <ThemeToggle
          value="light"
          onChange={onChange}
          options={["light", "dark"]}
        />
      );

      await userEvent.click(screen.getByRole("radio", { name: "Dark" }));

      expect(onChange).toHaveBeenCalledWith("dark");
    });
  });
});
