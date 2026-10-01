// Tables for the Tokens docs page. They read the compiled tokens.css, so
// they always list exactly what the package ships, in both themes at once.
import type { CSSProperties, ReactNode } from "react";

import tokensCss from "@styles/tokens.scss?inline";

type Declarations = Map<string, string>;

/** The declarations of the first rule whose selector list matches. */
const declarationsOf = (selector: RegExp): Declarations => {
  const block = new RegExp(`(?:^|})\\s*${selector.source}\\s*{([^}]*)}`).exec(
    tokensCss
  )?.[1];

  return new Map(
    (block ?? "")
      .split(";")
      .filter((declaration) => declaration.includes(":"))
      .map((declaration): [string, string] => {
        const colon = declaration.indexOf(":");
        return [
          declaration.slice(0, colon).trim(),
          declaration.slice(colon + 1).trim(),
        ];
      })
  );
};

const root = declarationsOf(/:root/);
const themes = {
  light: declarationsOf(/:root,\s*\[data-theme=["']?light["']?\]/),
  dark: declarationsOf(/\[data-theme=["']?dark["']?\]/),
};

const tokensIn = (declarations: Declarations, prefix: string) =>
  [...declarations].filter(([name]) => name.startsWith(prefix));

/** The red, green and blue channels of a #rgb(a) or #rrggbb(aa) colour. */
const channels = (hex: string): Array<number> => {
  // Vite minifies the CSS, so #ffffff arrives as #fff.
  const digits =
    hex.length <= 5
      ? [...hex.slice(1)].map((digit) => digit + digit).join("")
      : hex.slice(1);
  return [0, 2, 4].map((start) => parseInt(digits.slice(start, start + 2), 16));
};

/** WCAG 2 relative luminance of a hex colour (alpha ignored). */
const luminance = (hex: string): number => {
  const [r = 0, g = 0, b = 0] = channels(hex)
    .map((channel) => channel / 255)
    .map((channel) =>
      channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
    );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const contrastRatio = (a: string, b: string): number => {
  const [lighter = 0, darker = 0] = [luminance(a), luminance(b)].sort(
    (x, y) => y - x
  );
  return (lighter + 0.05) / (darker + 0.05);
};

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
        border: "1px solid #8888",
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

// [text, background]: every text token on the backgrounds it's used on.
const TEXT_PAIRS = [
  ["text", "bg"],
  ["text", "surface"],
  ["text", "tint"],
  ["muted", "bg"],
  ["muted", "surface"],
  ["muted", "tint"],
  ["accent-text", "bg"],
  ["accent-text", "surface"],
  ["accent-text", "tint"],
  ["on-accent", "accent-fill"],
  ["success-text", "surface"],
  ["success-text", "success-tint"],
  ["on-accent", "success-fill"],
  ["danger-text", "surface"],
  ["danger-text", "danger-tint"],
  ["on-accent", "danger-fill"],
  ["warning-text", "surface"],
  ["warning-text", "warning-tint"],
] as const;

const ContrastSample = ({
  theme,
  text,
  bg,
}: {
  theme: keyof typeof themes;
  text: string;
  bg: string;
}) => {
  const foreground = themes[theme].get(`--rq-color-${text}`) ?? "";
  const background = themes[theme].get(`--rq-color-${bg}`) ?? "";
  const ratio = contrastRatio(foreground, background);

  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 10px",
        borderRadius: 6,
        color: foreground,
        background,
      }}
    >
      {ratio.toFixed(2)}:1 {ratio >= 4.5 ? "AA" : "fails AA"}
    </span>
  );
};

export const ContrastTable = () => (
  <Table
    head={["Text", "Background", "Light", "Dark"]}
    rows={TEXT_PAIRS.map(([text, bg]) => [
      <code key="text">{text}</code>,
      <code key="bg">{bg}</code>,
      <ContrastSample key="light" theme="light" text={text} bg={bg} />,
      <ContrastSample key="dark" theme="dark" text={text} bg={bg} />,
    ])}
  />
);

export const TypeScale = () => (
  <Table
    head={["Token", "Size", "Sample"]}
    rows={tokensIn(root, "--rq-font-size-").map(([name, size]) => [
      <code key="name">{name}</code>,
      size,
      <span
        key="sample"
        style={{
          fontFamily: "var(--rq-font-family)",
          fontSize: `var(${name})`,
          lineHeight: 1.2,
        }}
      >
        Hello, World!
      </span>,
    ])}
  />
);

export const FontWeights = () => (
  <Table
    head={["Token", "Weight", "Sample"]}
    rows={tokensIn(root, "--rq-font-weight-").map(([name, weight]) => [
      <code key="name">{name}</code>,
      weight,
      <span
        key="sample"
        style={{
          fontFamily: "var(--rq-font-family)",
          fontSize: 20,
          fontWeight: `var(${name})`,
        }}
      >
        Ryan Brandt
      </span>,
    ])}
  />
);

export const Spacing = () => (
  <Table
    head={["Token", "Value", ""]}
    rows={tokensIn(root, "--rq-space-").map(([name, value]) => [
      <code key="name">{name}</code>,
      value,
      <span
        key="bar"
        style={{
          display: "block",
          width: `var(${name})`,
          height: 12,
          background: "var(--rq-color-accent-fill)",
        }}
      />,
    ])}
  />
);

export const Radii = () => (
  <Table
    head={["Token", "Value", ""]}
    rows={tokensIn(root, "--rq-radius-").map(([name, value]) => [
      <code key="name">{name}</code>,
      value,
      <span
        key="box"
        style={{
          display: "block",
          width: 96,
          height: 48,
          borderRadius: `var(${name})`,
          background: "var(--rq-color-tint)",
          border: "1px solid var(--rq-color-border)",
        }}
      />,
    ])}
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
      ...tokensIn(root, "--rq-duration-"),
      ...tokensIn(root, "--rq-easing-"),
    ].map(([name, value]) => [<code key="name">{name}</code>, value])}
  />
);
