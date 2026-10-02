import type { FunctionComponent, JSX } from "react";

import createCompositeClassName from "@utilities/createCompositeClassName";

export type TagVariant =
  "primary" | "success" | "danger" | "warning" | "neutral";
export type TagSize = "md" | "lg";

export interface TagProps {
  /**
   * Text to display within the tag
   */
  text: string;

  /**
   * The optional tag variant: `primary` is the accent tint, `neutral` is
   * outlined, the others are status colours
   *
   * @see TagVariant
   * @default primary
   */
  variant?: TagVariant;

  /**
   * The optional tag size: `md` for tags on a card (13px), `lg` for an
   * eyebrow above a heading (14px)
   *
   * @see TagSize
   * @default md
   */
  size?: TagSize;

  /**
   * Optional additional CSS class to apply
   */
  className?: string;
}

/** A pill-shaped label: a tinted background with matching text. */
const Tag: FunctionComponent<TagProps> = (props: TagProps): JSX.Element => {
  const { text, variant = "primary", size = "md", className } = props;

  const classNames = createCompositeClassName({
    tag: true,
    [`tag--${variant}`]: true,
    [`tag--${size}`]: true,
    [className ?? ""]: true,
  });

  return <span className={classNames}>{text}</span>;
};

export default Tag;
