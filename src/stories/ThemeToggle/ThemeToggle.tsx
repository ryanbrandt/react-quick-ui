import { type FunctionComponent, type JSX, useId } from "react";

import createCompositeClassName from "@utilities/createCompositeClassName";
import MonitorSvg from "@svgs/MonitorSvg/MonitorSvg";
import MoonSvg from "@svgs/MoonSvg/MoonSvg";
import SunSvg from "@svgs/SunSvg/SunSvg";

export type ThemePreference = "light" | "dark" | "system";

const ALL_PREFERENCES: ReadonlyArray<ThemePreference> = [
  "light",
  "dark",
  "system",
];

export interface ThemeToggleProps {
  /**
   * The selected theme. These are the values `data-theme` accepts. If it
   * isn't one of `options`, no option is checked: with
   * `options={["light", "dark"]}`, pass the theme the page resolves to
   * rather than `"system"`.
   */
  value: ThemePreference;

  /**
   * Called with the theme the user picks. The toggle doesn't store the
   * choice or set `data-theme`; the app does (see the README).
   */
  onChange: (value: ThemePreference) => void;

  /**
   * The options to offer, in this order, each at most once. Leave out
   * `"system"` for a light/dark switch.
   *
   * @default ["light", "dark", "system"]
   */
  options?: ReadonlyArray<ThemePreference>;

  /**
   * The accessible name of the group
   *
   * @default "Theme"
   */
  label?: string;

  /**
   * An optional CSS classname to apply to the group
   */
  className?: string;
}

interface OptionContent {
  label: string;
  Icon: typeof SunSvg;
}

const OPTION_CONTENT: Record<ThemePreference, OptionContent> = {
  light: { label: "Light", Icon: SunSvg },
  dark: { label: "Dark", Icon: MoonSvg },
  system: { label: "System", Icon: MonitorSvg },
};

/**
 * Picks the colour theme: light, dark, or follow the OS ("system"). A group
 * of native radio buttons, so screen readers announce the current choice
 * and the arrow keys move between options.
 */
const ThemeToggle: FunctionComponent<ThemeToggleProps> = (
  props: ThemeToggleProps
): JSX.Element => {
  const {
    value,
    onChange,
    options = ALL_PREFERENCES,
    label = "Theme",
    className = "",
  } = props;
  const name = useId();

  const classNames = createCompositeClassName({
    "theme-toggle": true,
    [className]: true,
  });

  return (
    <div role="radiogroup" aria-label={label} className={classNames}>
      {options.map((option) => {
        const { label: optionLabel, Icon } = OPTION_CONTENT[option];
        return (
          <span key={option} className="theme-toggle__option">
            <input
              type="radio"
              className="theme-toggle__input"
              name={name}
              value={option}
              aria-label={optionLabel}
              checked={value === option}
              onChange={() => onChange(option)}
            />
            <span aria-hidden="true" className="theme-toggle__indicator">
              <Icon width={18} height={18} />
            </span>
          </span>
        );
      })}
    </div>
  );
};

export default ThemeToggle;
