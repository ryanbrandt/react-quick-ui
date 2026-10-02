import type { FunctionComponent, JSX } from "react";

import Tag, { type TagVariant } from "@stories/Tag/Tag";

type BadgeSize = "sm" | "md" | "lg" | "xlg" | "fit-content";

interface Props {
  /**
   * Text to display within the badge
   */
  text: string;

  /**
   * The optional badge variant
   *
   * @see TagVariant
   * @default primary
   */
  variant?: TagVariant;

  /**
   * The optional badge size. Badges fit their text now: `lg` and `xlg`
   * render the large tag, the others the medium one.
   *
   * @see BadgeSize
   * @default md
   */
  size?: BadgeSize;

  /**
   * Optional additional CSS class to apply (passed to the `Tag`)
   */
  className?: string;
}

/**
 * @deprecated Use `Tag`. `Badge` maps its props onto a `Tag` and will be
 * removed in a future major release.
 */
const Badge: FunctionComponent<Props> = (props: Props): JSX.Element => {
  const { text, variant, size = "md", className } = props;

  return (
    <Tag
      text={text}
      variant={variant}
      size={size === "lg" || size === "xlg" ? "lg" : "md"}
      className={className}
    />
  );
};

export default Badge;
