import type {
  FunctionComponent,
  HTMLAttributeAnchorTarget,
  ReactNode,
  JSX,
} from "react";

import createCompositeClassName from "@utilities/createCompositeClassName";

/**
 * `secondary` is the spec's outlined button. `neutral` is the same style
 * under its old name (deprecated: use `secondary`).
 */
type ButtonVariant = "primary" | "secondary" | "danger" | "success" | "neutral";
type ButtonSize = "sm" | "md" | "lg" | "xlg";
type ButtonWidth = "fixed" | "auto";

interface BaseProps {
  /**
   * Text to display within the button
   */
  text: string;

  /**
   * The optional button variant. `neutral` is deprecated: use `secondary`
   * (the same style).
   *
   * @see ButtonVariant
   * @default primary
   */
  variant?: ButtonVariant;

  /**
   * The optional button size (height: sm 20px, md 30px, lg 40px, xlg 48px).
   * Page calls to action use `xlg` with `width="auto"`.
   *
   * @see ButtonSize
   * @default md
   */
  size?: ButtonSize;

  /**
   * `fixed` gives each size a set width and truncates long text; `auto`
   * fits the text with padding (and stretches in a column flex layout).
   *
   * @see ButtonWidth
   * @default fixed
   */
  width?: ButtonWidth;

  /**
   * An optional icon to display to the left of the button text
   */
  iconLeft?: ReactNode;

  /**
   * An optional icon to display to the right of the button text
   */
  iconRight?: ReactNode;

  /**
   * An optional click handler which will be invoked when the button is clicked
   */
  onClick?: () => void;
}

interface ButtonElementProps extends BaseProps {
  href?: never;

  /**
   * An optional flag, which, when true, will style the button as disabled
   *
   * @default false
   */
  disabled?: boolean;
}

/** With `href`: a link that looks like a button (a real `<a>`, no button role). */
interface LinkElementProps extends BaseProps {
  /**
   * Where the link goes. Setting it renders an `<a>` instead of a `<button>`.
   */
  href: string;

  /**
   * The optional browsing context to open the link in (e.g. `_blank`)
   */
  target?: HTMLAttributeAnchorTarget;

  /**
   * The optional link relationship (e.g. `noopener noreferrer`)
   */
  rel?: string;
}

export type ButtonProps = ButtonElementProps | LinkElementProps;

const Button: FunctionComponent<ButtonProps> = (
  props: ButtonProps
): JSX.Element => {
  const {
    text,
    variant = "primary",
    size = "md",
    width = "fixed",
    iconLeft,
    iconRight,
    onClick,
  } = props;

  const classNames = createCompositeClassName({
    button: true,
    [`button--${size}`]: true,
    [`button--${variant}`]: true,
    "button--width-auto": width === "auto",
    "button--link": props.href !== undefined,
  });

  const content = (
    <span className="button__content">
      {iconLeft && <span className="button__content__icon">{iconLeft}</span>}
      <span className="button__content__text">{text}</span>
      {iconRight && <span className="button__content__icon">{iconRight}</span>}
    </span>
  );

  if (props.href !== undefined) {
    const { href, target, rel } = props;

    return (
      <a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={classNames}
      >
        {content}
      </a>
    );
  }

  return (
    <button disabled={props.disabled} onClick={onClick} className={classNames}>
      {content}
    </button>
  );
};

export default Button;
