import { type FunctionComponent, type JSX, useId } from "react";

import createCompositeClassName from "@utilities/createCompositeClassName";

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

const iconProps = {
  "aria-hidden": true,
  className: "theme-toggle__icon",
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const OPTIONS: ReadonlyArray<{
  value: ThemePreference;
  label: string;
  icon: JSX.Element;
}> = [
  {
    value: "light",
    label: "Light",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    ),
  },
  {
    value: "dark",
    label: "Dark",
    icon: (
      <svg {...iconProps}>
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    ),
  },
  {
    value: "system",
    label: "System",
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path d="M8 20h8M12 16v4" />
      </svg>
    ),
  },
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
          {option.icon}
        </span>
      ))}
    </div>
  );
};

export default ThemeToggle;
