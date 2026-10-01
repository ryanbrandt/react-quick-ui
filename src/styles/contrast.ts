// WCAG 2 contrast for the theme tokens. The pairs below are the single list
// of what must contrast: __tests__/styles/tokens.test.ts enforces them in
// both themes and the Tokens docs page (.storybook/docs/TokenTables.tsx)
// shows them. Not part of the package (excluded from the build, like
// stories/storyHelpers.tsx).
//
// Names are custom properties without the `--rq-` prefix.

/** A pair to check: [foreground, background]. */
export type ContrastPair = readonly [string, string];

/** Text: WCAG AA for normal-size text (1.4.3), on each background it's used on. */
export const TEXT_MIN_RATIO = 4.5;

export const TEXT_PAIRS: ReadonlyArray<ContrastPair> = [
  ["color-text", "color-bg"],
  ["color-text", "color-surface"],
  ["color-text", "color-tint"],
  ["color-muted", "color-bg"],
  ["color-muted", "color-surface"],
  ["color-muted", "color-tint"],
  ["color-accent-text", "color-bg"],
  ["color-accent-text", "color-surface"],
  ["color-accent-text", "color-tint"],
  ["color-on-accent", "color-accent-fill"],
  ["color-success-text", "color-bg"],
  ["color-success-text", "color-surface"],
  ["color-success-text", "color-success-tint"],
  ["color-on-accent", "color-success-fill"],
  ["color-danger-text", "color-bg"],
  ["color-danger-text", "color-surface"],
  ["color-danger-text", "color-danger-tint"],
  ["color-on-accent", "color-danger-fill"],
  ["color-warning-text", "color-bg"],
  ["color-warning-text", "color-surface"],
  ["color-warning-text", "color-warning-tint"],
];

/**
 * Non-text: the edges that identify a control or its state (WCAG 1.4.11),
 * against what they sit on. The neutral button's hover background is tint.
 */
export const NON_TEXT_MIN_RATIO = 3;

export const NON_TEXT_PAIRS: ReadonlyArray<ContrastPair> = [
  ["color-control-border", "color-bg"],
  ["color-control-border", "color-surface"],
  ["color-control-border", "color-tint"],
  ["color-accent-fill", "color-bg"],
  ["focus-ring-color", "color-bg"],
  ["focus-ring-color", "color-surface"],
];

/**
 * The colour a custom property holds, following `var(--rq-…)` references
 * (e.g. --rq-focus-ring-color is var(--rq-color-accent-text)).
 */
export const resolveColor = (
  declarations: ReadonlyMap<string, string>,
  name: string
): string => {
  const value = declarations.get(`--rq-${name}`);
  if (value === undefined) throw new Error(`--rq-${name} is not defined`);

  const reference = /^var\(--rq-([\w-]+)\)$/.exec(value)?.[1];
  return reference ? resolveColor(declarations, reference) : value;
};

/** The red, green and blue channels of a #rgb or #rrggbb colour. */
const channels = (hex: string): Array<number> => {
  if (!/^#([\da-f]{3}|[\da-f]{6})$/i.test(hex)) {
    throw new Error(`Not a #rgb or #rrggbb colour: ${hex}`);
  }
  // Vite minifies the CSS, so #ffffff can arrive as #fff.
  const digits =
    hex.length === 4
      ? [...hex.slice(1)].map((digit) => digit + digit).join("")
      : hex.slice(1);
  return [0, 2, 4].map((start) => parseInt(digits.slice(start, start + 2), 16));
};

/** WCAG 2 relative luminance of a hex colour. */
export const luminance = (hex: string): number => {
  const [r = 0, g = 0, b = 0] = channels(hex)
    .map((channel) => channel / 255)
    .map((channel) =>
      channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
    );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/** WCAG 2 contrast ratio of two hex colours (1 to 21). */
export const contrastRatio = (a: string, b: string): number => {
  const [lighter = 0, darker = 0] = [luminance(a), luminance(b)].sort(
    (x, y) => y - x
  );
  return (lighter + 0.05) / (darker + 0.05);
};
