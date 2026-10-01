// Tables for the Tokens docs page. They read the compiled tokens.css, so
// they always list exactly what the package ships, in both themes at once.
import type { CSSProperties, ReactNode } from "react";

import tokensCss from "@styles/tokens.scss?inline";

import {
  type ContrastPair,
  contrastRatio,
  NON_TEXT_MIN_RATIO,
  NON_TEXT_PAIRS,
  resolveColor,
  TEXT_MIN_RATIO,
  TEXT_PAIRS,
} from "@styles/contrast";

type Declarations = Map<string, string>;

// Parsed by the browser, so the tables see what a page would.
const sheet = new CSSStyleSheet();
sheet.replaceSync(tokensCss);

/** The declarations of the top-level rule with exactly these selectors. */
const declarationsOf = (...selectors: Array<string>): Declarations => {
  const rule = [...sheet.cssRules]
    .filter((candidate) => candidate instanceof CSSStyleRule)
    .find(
      ({ selectorText }) =>
        selectorText.replaceAll('"', "") === selectors.join(", ")
    );

  return new Map(
    [...(rule?.style ?? [])].map((name): [string, string] => [
      name,
      rule?.style.getPropertyValue(name).trim() ?? "",
    ])
  );
};

const root = declarationsOf(":root");
const themes = {
  light: declarationsOf(":root", "[data-theme=light]"),
  dark: declarationsOf("[data-theme=dark]"),
};

const tokensIn = (declarations: Declarations, prefix: string) =>
  [...declarations].filter(([name]) => name.startsWith(prefix));

const cell: CSSProperties = {
  padding: "8px 12px",
  borderBottom: "1px solid var(--rq-color-border)",
  textAlign: "left",
  verticalAlign: "middle",
};

const Table = ({
  head,
  rows,
}: {
  head: Array<string>;
  rows: Array<Array<ReactNode>>;
}) => (
  <table style={{ borderCollapse: "collapse", width: "100%" }}>
    <thead>
      <tr>
        {head.map((title) => (
          <th key={title} style={cell}>
            {title}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((row, i) => (
        <tr key={i}>
          {row.map((content, j) => (
            <td key={j} style={cell}>
              {content}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

const Swatch = ({ color }: { color: string }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
    <span
      style={{
        width: 32,
        height: 32,
        borderRadius: 8,
        background: color,
        border: "1px solid var(--rq-color-border)",
      }}
    />
    <code>{color}</code>
  </span>
);

export const ColorTokens = () => (
  <Table
    head={["Token", "Light", "Dark"]}
    rows={tokensIn(themes.light, "--rq-color-").map(([name, light]) => [
      <code key="name">{name}</code>,
      <Swatch key="light" color={light} />,
      <Swatch key="dark" color={themes.dark.get(name) ?? ""} />,
    ])}
  />
);

const ContrastSample = ({
  theme,
  pair: [foreground, background],
  minRatio,
}: {
  theme: keyof typeof themes;
  pair: ContrastPair;
  minRatio: number;
}) => {
  const color = resolveColor(themes[theme], foreground);
  const backgroundColor = resolveColor(themes[theme], background);
  const ratio = contrastRatio(color, backgroundColor);
  const isText = minRatio === TEXT_MIN_RATIO;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "4px 10px",
        borderRadius: 6,
        // Non-text samples label the edge in the theme's text colour.
        color: isText ? color : themes[theme].get("--rq-color-text"),
        background: backgroundColor,
      }}
    >
      {!isText && (
        <span
          style={{
            width: 16,
            height: 16,
            borderRadius: 4,
            border: `2px solid ${color}`,
          }}
        />
      )}
      {ratio.toFixed(2)}:1 {ratio >= minRatio ? "passes" : "fails"}
    </span>
  );
};

const ContrastTable = ({
  pairs,
  minRatio,
}: {
  pairs: ReadonlyArray<ContrastPair>;
  minRatio: number;
}) => (
  <Table
    head={["Foreground", "Background", "Light", "Dark"]}
    rows={pairs.map((pair) => [
      <code key="foreground">{pair[0]}</code>,
      <code key="background">{pair[1]}</code>,
      <ContrastSample
        key="light"
        theme="light"
        pair={pair}
        minRatio={minRatio}
      />,
      <ContrastSample
        key="dark"
        theme="dark"
        pair={pair}
        minRatio={minRatio}
      />,
    ])}
  />
);

export const TextContrast = () => (
  <ContrastTable pairs={TEXT_PAIRS} minRatio={TEXT_MIN_RATIO} />
);

export const NonTextContrast = () => (
  <ContrastTable pairs={NON_TEXT_PAIRS} minRatio={NON_TEXT_MIN_RATIO} />
);

/** One row per token with this prefix: name, value and a sample using it. */
const ScaleTable = ({
  prefix,
  sample,
}: {
  prefix: string;
  /** Renders a sample for the token, given as `var(--rq-…)`. */
  sample: (token: string) => ReactNode;
}) => (
  <Table
    head={["Token", "Value", "Sample"]}
    rows={tokensIn(root, prefix).map(([name, value]) => [
      <code key="name">{name}</code>,
      value,
      <span key="sample">{sample(`var(${name})`)}</span>,
    ])}
  />
);

const font = "var(--rq-font-family)";

export const TypeScale = () => (
  <ScaleTable
    prefix="--rq-font-size-"
    sample={(size) => (
      <span style={{ fontFamily: font, fontSize: size, lineHeight: 1.2 }}>
        Hello, World!
      </span>
    )}
  />
);

export const FontWeights = () => (
  <ScaleTable
    prefix="--rq-font-weight-"
    sample={(weight) => (
      <span style={{ fontFamily: font, fontSize: 20, fontWeight: weight }}>
        Ryan Brandt
      </span>
    )}
  />
);

export const Spacing = () => (
  <ScaleTable
    prefix="--rq-space-"
    sample={(width) => (
      <span
        style={{
          display: "block",
          width,
          height: 12,
          background: "var(--rq-color-accent-fill)",
        }}
      />
    )}
  />
);

export const Radii = () => (
  <ScaleTable
    prefix="--rq-radius-"
    sample={(radius) => (
      <span
        style={{
          display: "block",
          width: 96,
          height: 48,
          borderRadius: radius,
          background: "var(--rq-color-tint)",
          border: "1px solid var(--rq-color-border)",
        }}
      />
    )}
  />
);

export const OtherTokens = () => (
  <Table
    head={["Token", "Value"]}
    rows={[
      ...tokensIn(root, "--rq-font-family"),
      ...tokensIn(root, "--rq-line-height-"),
      ...tokensIn(root, "--rq-letter-spacing-"),
      ...tokensIn(themes.light, "--rq-shadow-").map(([name, value]) => [
        name,
        `${value} (dark: ${themes.dark.get(name)})`,
      ]),
      ...tokensIn(root, "--rq-focus-ring-"),
      ...tokensIn(themes.light, "--rq-focus-ring-"),
      ...tokensIn(root, "--rq-duration-"),
      ...tokensIn(root, "--rq-easing-"),
    ].map(([name, value]) => [<code key="name">{name}</code>, value])}
  />
);
