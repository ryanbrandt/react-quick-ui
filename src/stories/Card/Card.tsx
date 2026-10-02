import type { FunctionComponent, ReactNode, JSX } from "react";

import createCompositeClassName from "@utilities/createCompositeClassName";
import Heading from "@stories/Heading/Heading";
import Tag from "@stories/Tag/Tag";

export interface CardProps {
  /**
   * The card's title
   */
  title: string;

  /**
   * An optional link for the whole card. The title becomes the link, and a
   * click anywhere on the card follows it; links and buttons inside the
   * card stay clickable on their own.
   */
  href?: string;

  /**
   * The optional heading element for the title, to fit the page's outline
   *
   * @default h3
   */
  headingLevel?: "h2" | "h3" | "h4" | "h5" | "h6";

  /**
   * Optional media (an image or a monogram), shown above the title on a
   * tinted area. It comes after the text in the markup, so screen readers
   * reach the title first; make decorative media `aria-hidden` (or give an
   * image `alt=""`).
   */
  media?: ReactNode;

  /**
   * The optional body, e.g. a short description
   */
  children?: ReactNode;

  /**
   * Optional tags, shown as a list of `Tag`s below the body
   */
  tags?: ReadonlyArray<string>;

  /**
   * Optional footer content, e.g. a secondary link
   */
  footer?: ReactNode;

  /**
   * Optional additional CSS class to apply
   */
  className?: string;
}

/** A content card: media, title, body, tags and footer. */
const Card: FunctionComponent<CardProps> = (props: CardProps): JSX.Element => {
  const {
    title,
    href,
    headingLevel = "h3",
    media,
    children,
    tags,
    footer,
    className,
  } = props;

  const classNames = createCompositeClassName({
    card: true,
    "card--link": !!href,
    [className ?? ""]: true,
  });

  return (
    <article className={classNames}>
      <Heading variant="title" as={headingLevel} className="card__title">
        {href ? (
          <a className="card__link" href={href}>
            {title}
          </a>
        ) : (
          title
        )}
      </Heading>
      {children && <div className="card__body">{children}</div>}
      {tags && tags.length > 0 && (
        <ul className="card__tags">
          {tags.map((tag) => (
            <li key={tag}>
              <Tag text={tag} />
            </li>
          ))}
        </ul>
      )}
      {footer && <div className="card__footer">{footer}</div>}
      {media && <div className="card__media">{media}</div>}
    </article>
  );
};

export default Card;
