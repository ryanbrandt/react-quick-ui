import { FunctionComponent, ReactNode } from "react";

import createCompositeClassName from "@utilities/createCompositeClassName";

type ButtonVariant = "primary" | "danger" | "success" | "neutral";
type ButtonSize = "sm" | "md" | "lg" | "xlg";

interface Props {
  /**
   * Text to display within the button
   */
  text: string;

  /**
   * The optional button variant
   *
   * @see ButtonVariant
   * @default primary
   */
  variant?: ButtonVariant;

  /**
   * The optional button size
   *
   * @see ButtonSize
   * @default md
   */
  size?: ButtonSize;

  /**
   * An optional flag, which, when true, will style the button as disabled
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * An optional icon to display to the left of the buttont text
   */
  iconLeft?: ReactNode;

  /**
   * An optional icon to display to the right of the buttont text
   */
  iconRight?: ReactNode;

  /**
   * An optional click handler which will be invoked when the button is clicked
   */
  onClick?: () => void;
}

const Button: FunctionComponent<Props> = (props: Props): JSX.Element => {
  const {
    text,
    variant = "primary",
    size = "md",
    disabled,
    iconLeft,
    iconRight,
    onClick,
  } = props;

  const classNames = createCompositeClassName({
    button: true,
    [`button--${size}`]: true,
    [`button--${variant}`]: true,
  });

  return (
    <button disabled={disabled} onClick={onClick} className={classNames}>
      <div className="button__content">
        {iconLeft && <div className="button__content__icon">{iconLeft}</div>}
        <span className="button__content__text">{text}</span>
        {iconRight && <div className="button__content__icon">{iconRight}</div>}
      </div>
    </button>
  );
};

export default Button;
