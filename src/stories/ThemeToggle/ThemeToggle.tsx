import { type FunctionComponent, type JSX, useId } from "react";

import createCompositeClassName from "@utilities/createCompositeClassName";
import MonitorSvg from "@svgs/MonitorSvg/MonitorSvg";
import MoonSvg from "@svgs/MoonSvg/MoonSvg";
import SunSvg from "@svgs/SunSvg/SunSvg";

export type ThemePreference = "light" | "dark" | "system";

export interface ThemeToggleProps {
  /**
   * The selected theme. These are the values `data-theme` accepts.
   */
  value: ThemePreference;

  /**
   * Called with the theme the user picks. The toggle doesn't store the
   * choice or set `data-theme`; the app does (see the README).
   */
  onChange: (value: ThemePreference) => void;

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

const OPTIONS: ReadonlyArray<{
  value: ThemePreference;
  label: string;
  Icon: typeof SunSvg;
}> = [
  { value: "light", label: "Light", Icon: SunSvg },
  { value: "dark", label: "Dark", Icon: MoonSvg },
  { value: "system", label: "System", Icon: MonitorSvg },
];

/**
 * Picks the colour theme: light, dark, or follow the OS ("system"). A group
 * of native radio buttons, so screen readers announce the current choice
 * and the arrow keys move between options.
 */
const ThemeToggle: FunctionComponent<ThemeToggleProps> = (
  props: ThemeToggleProps
): JSX.Element => {
  const { value, onChange, label = "Theme", className = "" } = props;
  const name = useId();

  const classNames = createCompositeClassName({
    "theme-toggle": true,
    [className]: true,
  });

  return (
    <div role="radiogroup" aria-label={label} className={classNames}>
      {OPTIONS.map((option) => (
        <span key={option.value} className="theme-toggle__option">
          <input
            type="radio"
            className="theme-toggle__input"
            name={name}
            value={option.value}
            aria-label={option.label}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
          />
          <span aria-hidden="true" className="theme-toggle__indicator">
            <option.Icon width={18} height={18} />
          </span>
        </span>
      ))}
    </div>
  );
};

export default ThemeToggle;
