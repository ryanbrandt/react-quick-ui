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
}

/**
 * @deprecated Use `Tag`. `Badge` renders a `Tag` (with the extra class
 * `badge`, for existing stylesheets) and will be removed in a future major
 * release.
 */
const Badge: FunctionComponent<Props> = (props: Props): JSX.Element => {
  const { text, variant, size = "md" } = props;

  return (
    <Tag
      text={text}
      variant={variant}
      size={size === "lg" || size === "xlg" ? "lg" : "md"}
      className="badge"
    />
  );
};

export default Badge;
