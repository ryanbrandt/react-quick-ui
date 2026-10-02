import type {
  ButtonHTMLAttributes,
  FunctionComponent,
  ReactNode,
  JSX,
} from "react";

import createCompositeClassName from "@utilities/createCompositeClassName";

export type IconButtonVariant = "secondary" | "ghost";

export interface IconButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "aria-label" | "children"
> {
  /**
   * The button's accessible name. Required: the icon alone has no text.
   */
  "aria-label": string;

  /**
   * The icon to display (about 20px). It is hidden from assistive
   * technology; `aria-label` names the button.
   */
  icon: ReactNode;

  /**
   * The optional variant: `secondary` is outlined on the surface colour,
   * `ghost` has no background or border until hovered
   *
   * @see IconButtonVariant
   * @default secondary
   */
  variant?: IconButtonVariant;
}

/**
 * A square, icon-only button with a 44px touch target. Any other `<button>`
 * attribute (`onClick`, `aria-expanded`, …) is passed through; `type`
 * defaults to `button`.
 */
const IconButton: FunctionComponent<IconButtonProps> = (
  props: IconButtonProps
): JSX.Element => {
  const {
    icon,
    variant = "secondary",
    className,
    type = "button",
    ...buttonProps
  } = props;

  const classNames = createCompositeClassName({
    "icon-button": true,
    [`icon-button--${variant}`]: true,
    [className ?? ""]: true,
  });

  return (
    <button {...buttonProps} type={type} className={classNames}>
      <span className="icon-button__icon" aria-hidden="true">
        {icon}
      </span>
    </button>
  );
};

export default IconButton;
