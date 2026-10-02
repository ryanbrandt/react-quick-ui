import type { FunctionComponent, ReactNode, JSX } from "react";

import createCompositeClassName from "@utilities/createCompositeClassName";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

/**
 * `hero`, `section` and `title` are the spec's type scale (72/44px light,
 * 32/26px regular, 20px semibold, in the text colour). `h1`, `h2` and `h3`
 * are the original compact, centred headings in the accent colour.
 */
declare type HeadingVariant = "hero" | "section" | "title" | "h1" | "h2" | "h3";

/** The element each variant renders unless `as` says otherwise. */
const DEFAULT_LEVEL: Record<HeadingVariant, HeadingLevel> = {
  hero: "h1",
  section: "h2",
  title: "h3",
  h1: "h1",
  h2: "h2",
  h3: "h3",
};

interface BaseProps {
  /**
   * The optional heading variant
   *
   * @see HeadingVariant
   * @default h1
   */
  variant?: HeadingVariant;

  /**
   * The optional heading element, to keep the document outline right
   * whatever the style (e.g. a `title` heading as an `<h2>`)
   *
   * @default the variant's element: hero h1, section h2, title h3
   */
  as?: HeadingLevel;

  /**
   * Optional additional CSS class to apply
   *
   * @default ""
   */
  className?: string;
}

/** Modal's `modalHeading` prop uses this shape, so it keeps its name. */
export interface HeadingProps extends BaseProps {
  /**
   * Text to display as the header
   */
  text: string;
  children?: never;
}

export interface HeadingWithChildrenProps extends BaseProps {
  text?: never;

  /**
   * Content to display as the header, instead of `text`. In the spec's
   * variants, `<strong>` is semibold in the accent colour (the hero's name).
   */
  children: ReactNode;
}

const Heading: FunctionComponent<HeadingProps | HeadingWithChildrenProps> = (
  props: HeadingProps | HeadingWithChildrenProps
): JSX.Element => {
  const { text, children, variant = "h1", as, className = "" } = props;
  const HeadingTag = as ?? DEFAULT_LEVEL[variant];

  const classNames = createCompositeClassName({
    [className]: true,
    [`heading--${variant}`]: true,
    heading: true,
  });

  return <HeadingTag className={classNames}>{children ?? text}</HeadingTag>;
};

export default Heading;
