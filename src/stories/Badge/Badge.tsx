import { FunctionComponent } from "react";

type BadgeVariant = "primary" | "warning" | "danger" | "success" | "neutral";
type BadgeSize = "sm" | "md" | "lg" | "xlg";

interface Props {
  /**
   * Text to display within the badge
   */
  text: string;

  /**
   * The optional badge variant
   *
   * @see BadgeVariant
   * @default primary
   */
  variant?: BadgeVariant;

  /**
   * The optional badge size
   *
   * @see ButtonSize
   * @default md
   */
  size?: BadgeSize;
}

const Badge: FunctionComponent<Props> = (props: Props): JSX.Element => {
  const { text, variant = "primary", size = "md" } = props;

  return (
    <div className={`badge badge--${variant} badge--${size}`}>
      <span className="badge__text">{text}</span>
    </div>
  );
};

export default Badge;
