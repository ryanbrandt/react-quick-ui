// Shared Storybook-only helpers. Not exported from the library: it is excluded
// from tsconfig.build.json and from coverage in jest.config.js.
import type { ReactNode } from "react";

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec ipsum at " +
  "nunc tempus bibendum. Etiam feugiat arcu eget eros vulputate, ac euismod " +
  "mi dignissim. Ut commodo, magna eget hendrerit condimentum, risus nisi " +
  "mollis ipsum, et malesuada diam eros non metus. Praesent id ligula " +
  "ullamcorper, vulputate felis sed, feugiat nulla. Quisque commodo rhoncus " +
  "massa sed imperdiet. Etiam rhoncus porttitor felis, ut porta nibh auctor " +
  "quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget " +
  "mattis turpis.";

const PARAGRAPHS = 9;

interface FillerPageProps {
  /** Rendered at the top of the text column, above the filler text. */
  children?: ReactNode;

  /** Rendered before the text column (e.g. a top bar or a modal). */
  before?: ReactNode;

  /** Rendered after the text column (e.g. an overlay). */
  after?: ReactNode;

  /**
   * "row" puts `before`/`after` beside the text (flex row); "column" stacks
   * them above and below it, as a top bar needs.
   *
   * @default row
   */
  layout?: "row" | "column";
}

/** A white page of filler text to show layout components against. */
export const FillerPage = ({
  children,
  before,
  after,
  layout = "row",
}: FillerPageProps) => (
  <div
    style={{
      height: "100%",
      width: "90vw",
      backgroundColor: "white",
      ...(layout === "row" && { display: "flex" }),
    }}
  >
    {before}
    <div style={{ padding: "25px" }}>
      {children}
      <h3>Lorem ipsum</h3>
      {Array.from({ length: PARAGRAPHS }, (_, i) => (
        <p key={i}>{LOREM}</p>
      ))}
    </div>
    {after}
  </div>
);

// For position: fixed components: render the story in its own iframe on the
// docs page so it doesn't cover the whole page.
export const fixedOverlayDocs = {
  docs: { story: { inline: false, iframeHeight: 400 } },
};
