/**
 * @jest-environment node
 */
import { join } from "path";
import { compile } from "sass";

const STYLES_DIR = join(__dirname, "../../src/styles");

interface CssRule {
  selectors: Array<string>;
  declarations: Map<string, string>;
  /** The enclosing at-rule's prelude (e.g. "@media (…)"), if any. */
  atRule?: string;
}

/**
 * Splits compiled CSS into style rules, keeping track of the enclosing
 * at-rule (one level deep is enough for what Sass emits here).
 */
const parseRules = (css: string): Array<CssRule> => {
  const rules: Array<CssRule> = [];
  const preludes: Array<string> = [];
  let buffer = "";

  for (const char of css.replace(/\/\*[\s\S]*?\*\//g, "")) {
    if (char === "{") {
      preludes.push(buffer.trim());
      buffer = "";
    } else if (char === "}") {
      const prelude = preludes.pop() ?? "";
      if (buffer.trim()) {
        const declarations = buffer
          .split(";")
          .filter((declaration) => declaration.includes(":"))
          .map((declaration): [string, string] => {
            const colon = declaration.indexOf(":");
            return [
              declaration.slice(0, colon).trim(),
              declaration.slice(colon + 1).trim(),
            ];
          });
        rules.push({
          selectors: prelude.split(",").map((selector) => selector.trim()),
          declarations: new Map(declarations),
          atRule: preludes.at(-1),
        });
      }
      buffer = "";
    } else {
      buffer += char;
    }
  }

  return rules;
};

const compileRules = (file: string): Array<CssRule> =>
  parseRules(compile(join(STYLES_DIR, file)).css);

/** WCAG 2 relative luminance of a #rrggbb colour. */
const luminance = (hex: string): number => {
  const value = parseInt(hex.slice(1), 16);
  const [r = 0, g = 0, b = 0] = [value >> 16, (value >> 8) & 255, value & 255]
    .map((channel) => channel / 255)
    .map((channel) =>
      channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
    );

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const contrastRatio = (a: string, b: string): number => {
  const [lighter, darker] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return ((lighter ?? 0) + 0.05) / ((darker ?? 0) + 0.05);
};

// [text token, background token]. Every text token must reach WCAG AA for
// normal-size text (4.5:1) on each background it is used on.
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
  ["success-text", "bg"],
  ["success-text", "surface"],
  ["success-text", "success-tint"],
  ["on-accent", "success-fill"],
  ["danger-text", "bg"],
  ["danger-text", "surface"],
  ["danger-text", "danger-tint"],
  ["on-accent", "danger-fill"],
  ["warning-text", "bg"],
  ["warning-text", "surface"],
  ["warning-text", "warning-tint"],
] as const;

describe("tokens.css", () => {
  const rules = compileRules("tokens.scss");
  const findRule = (selector: string, atRule?: string): CssRule => {
    const rule = rules.find(
      (candidate) =>
        candidate.selectors.includes(selector) && candidate.atRule === atRule
    );
    if (!rule) throw new Error(`No ${selector} rule in ${atRule ?? "root"}`);
    return rule;
  };

  const themes = {
    light: findRule("[data-theme=light]").declarations,
    dark: findRule("[data-theme=dark]").declarations,
  };

  const color = (theme: keyof typeof themes, token: string): string => {
    const value = themes[theme].get(`--rq-color-${token}`);
    if (!value) throw new Error(`--rq-color-${token} is not defined`);
    return value;
  };

  it("applies light on :root and dark when the OS prefers it", () => {
    expect(findRule(":root").declarations.get("--rq-font-family")).toMatch(
      /^"Work Sans", /
    );
    expect(
      findRule("[data-theme=light]").selectors.includes(":root")
    ).toBeTruthy();
    expect(
      findRule(
        ":root:not([data-theme=light])",
        "@media (prefers-color-scheme: dark)"
      ).declarations
    ).toEqual(themes.dark);
  });

  it("defines the same theme tokens in light and dark", () => {
    expect([...themes.dark.keys()]).toEqual([...themes.light.keys()]);
    expect(themes.light.get("color-scheme")).toBe("light");
    expect(themes.dark.get("color-scheme")).toBe("dark");
  });

  it("prefixes every custom property with --rq-", () => {
    const properties = rules.flatMap((rule) => [...rule.declarations.keys()]);

    expect(
      properties.filter((property) => property.startsWith("--"))
    ).not.toHaveLength(0);
    expect(
      properties.filter(
        (property) => property.startsWith("--") && !property.startsWith("--rq-")
      )
    ).toEqual([]);
  });

  describe.each(["light", "dark"] as const)("%s theme", (theme) => {
    it.each(TEXT_PAIRS)("%s on %s meets WCAG AA (4.5:1)", (text, bg) => {
      expect(
        contrastRatio(color(theme, text), color(theme, bg))
      ).toBeGreaterThanOrEqual(4.5);
    });
  });

  it("sets every duration to 0ms when the user prefers reduced motion", () => {
    const durations = [...findRule(":root").declarations.keys()].filter(
      (property) => property.startsWith("--rq-duration-")
    );
    const reduced = findRule(
      ":root",
      "@media (prefers-reduced-motion: reduce)"
    ).declarations;

    expect(durations).not.toHaveLength(0);
    expect(Object.fromEntries(reduced)).toEqual(
      Object.fromEntries(durations.map((property) => [property, "0ms"]))
    );
  });
});
