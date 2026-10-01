import type { FunctionComponent, JSX } from "react";

declare type HeadingVariant = "h1" | "h2" | "h3";

export interface HeadingProps {
  /**
   * Text to display as the header
   */
  text: string;

  /**
   * The optional heading variant
   *
   * @see HeadingVariant
   * @default h1
   */
  variant?: HeadingVariant;

  /**
   * Optional additional CSS class to apply
   *
   * @default ""
   */
  className?: string;
}

const Heading: FunctionComponent<HeadingProps> = (
  props: HeadingProps
): JSX.Element => {
  const { text, variant: HeadingTag = "h1", className = "" } = props;

  return (
    <HeadingTag className={`${className} heading--${HeadingTag} heading`}>
      {text}
    </HeadingTag>
  );
};

export default Heading;
