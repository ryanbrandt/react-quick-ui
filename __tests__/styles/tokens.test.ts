/**
 * @jest-environment node
 */
import { join } from "path";

import postcss, { type AtRule, type Container } from "postcss";
import { compile } from "sass";

import {
  contrastRatio,
  NON_TEXT_MIN_RATIO,
  NON_TEXT_PAIRS,
  resolveColor,
  TEXT_MIN_RATIO,
  TEXT_PAIRS,
} from "@styles/contrast";

const STYLES_DIR = join(__dirname, "../../src/styles");

interface CssRule {
  selectors: Array<string>;
  declarations: Map<string, string>;
  /** The enclosing at-rule (e.g. "@media (…)"), if any. */
  atRule?: string;
}

const isAtRule = (node: Container | undefined): node is AtRule =>
  node?.type === "atrule";

/** The style rules of a compiled stylesheet, with their enclosing at-rule. */
const compileRules = (file: string): Array<CssRule> => {
  const rules: Array<CssRule> = [];
  postcss.parse(compile(join(STYLES_DIR, file)).css).walkRules((rule) => {
    const parent = rule.parent as Container | undefined;
    rules.push({
      selectors: rule.selectors,
      declarations: new Map(
        rule.nodes.flatMap((node) =>
          node.type === "decl" ? [[node.prop, node.value] as const] : []
        )
      ),
      atRule: isAtRule(parent) ? `@${parent.name} ${parent.params}` : undefined,
    });
  });
  return rules;
};

describe("tokens.css", () => {
  const rules = compileRules("tokens.scss");
  /** The rule with exactly these selectors (in this order) in `atRule`. */
  const findRule = (selectors: string, atRule?: string): CssRule => {
    const rule = rules.find(
      (candidate) =>
        candidate.selectors.join(", ") === selectors &&
        candidate.atRule === atRule
    );
    if (!rule) throw new Error(`No ${selectors} rule in ${atRule ?? "root"}`);
    return rule;
  };
  const OS_DARK = "@media (prefers-color-scheme: dark)";

  const themes = {
    light: findRule(":root, [data-theme=light], [data-theme=system]")
      .declarations,
    dark: findRule("[data-theme=dark]").declarations,
  };
  const withoutColorScheme = (declarations: Map<string, string>) =>
    new Map([...declarations].filter(([name]) => name !== "color-scheme"));

  it("sets the font family on :root", () => {
    expect(findRule(":root").declarations.get("--rq-font-family")).toBe(
      '"Work Sans", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'
    );
  });

  it("defines the same theme tokens in light and dark", () => {
    expect([...withoutColorScheme(themes.dark).keys()]).toEqual([
      ...themes.light.keys(),
    ]);
  });

  it("only sets color-scheme under an explicit data-theme", () => {
    const withColorScheme = rules
      .filter((rule) => rule.declarations.has("color-scheme"))
      .map(({ selectors, atRule, declarations }) => [
        atRule,
        selectors.join(", "),
        declarations.get("color-scheme"),
      ]);

    expect(withColorScheme).toEqual([
      [undefined, "[data-theme=light], [data-theme=system]", "light"],
      [undefined, "[data-theme=dark]", "dark"],
      [OS_DARK, "[data-theme=system]", "dark"],
    ]);
  });

  it('switches data-theme="system" to dark when the OS prefers it', () => {
    expect(findRule("[data-theme=system]", OS_DARK).declarations).toEqual(
      themes.dark
    );
  });

  it("orders the theme rules so the explicit and OS-dark ones win", () => {
    // All have the specificity of :root, so the later rule wins on <html>.
    const order = [
      findRule(":root, [data-theme=light], [data-theme=system]"),
      findRule("[data-theme=light], [data-theme=system]"),
      findRule("[data-theme=dark]"),
      findRule("[data-theme=system]", OS_DARK),
    ].map((rule) => rules.indexOf(rule));

    expect(order).toEqual([...order].sort((a, b) => a - b));
  });

  describe.each(["light", "dark"] as const)("%s theme", (theme) => {
    const ratio = (foreground: string, background: string) =>
      contrastRatio(
        resolveColor(themes[theme], foreground),
        resolveColor(themes[theme], background)
      );

    it.each(TEXT_PAIRS)("text: %s on %s reaches 4.5:1", (text, bg) => {
      expect(ratio(text, bg)).toBeGreaterThanOrEqual(TEXT_MIN_RATIO);
    });

    it.each(NON_TEXT_PAIRS)("non-text: %s on %s reaches 3:1", (edge, bg) => {
      expect(ratio(edge, bg)).toBeGreaterThanOrEqual(NON_TEXT_MIN_RATIO);
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

describe("index.css", () => {
  const rules = compileRules("index.scss");
  const declarations = rules.flatMap((rule) =>
    [...rule.declarations].map(([property, value]) => ({
      rule,
      property,
      value,
    }))
  );

  // Components may set their own custom properties (e.g. each Button size
  // sets --rq-button-width) or read an optional one with a fallback (e.g.
  // var(--rq-card-media-height, 168px)); every other var() must be a token.
  it("only uses --rq-* tokens that tokens.css defines", () => {
    const defined = new Set([
      ...compileRules("tokens.scss").flatMap((rule) => [
        ...rule.declarations.keys(),
      ]),
      ...declarations
        .map(({ property }) => property)
        .filter((property) => property.startsWith("--")),
    ]);
    const used = declarations.flatMap(({ value }) =>
      [...value.matchAll(/var\((--[\w-]+)\s*\)/g)].map(([, name = ""]) => name)
    );

    expect(used).not.toHaveLength(0);
    expect(used.filter((name) => !defined.has(name))).toEqual([]);
  });

  it("has no hard-coded colours outside the tokens", () => {
    const tokenSelectors = new Set(
      compileRules("tokens.scss").flatMap((rule) => rule.selectors)
    );
    const colourLiteral = /#[0-9a-f]{3,8}\b|\b(rgba?|hsla?)\(/i;

    expect(
      declarations
        .filter(({ rule }) =>
          rule.selectors.every((selector) => !tokenSelectors.has(selector))
        )
        .filter(({ value }) => colourLiteral.test(value))
        .map(
          ({ rule, property, value }) =>
            `${rule.selectors.join(", ")}: ${property}: ${value}`
        )
    ).toEqual([]);
  });

  it("only animates with --rq-duration-* tokens, which drop to 0ms", () => {
    // The spinner keeps moving under reduced motion (it shows that something
    // is loading) but swaps its scaling for a fade.
    const allowed = [".spinner-loader > div:before: animation-duration: 1.2s"];
    const motion = declarations.filter(
      ({ rule, property }) =>
        !rule.atRule?.startsWith("@keyframes") &&
        /^(transition|animation)(-duration)?$/.test(property)
    );

    expect(motion).not.toHaveLength(0);
    expect(
      motion
        .filter(({ value }) => /(^|[\s,])[\d.]+m?s\b/.test(value))
        .map(
          ({ rule, property, value }) =>
            `${rule.selectors.join(", ")}: ${property}: ${value}`
        )
    ).toEqual(allowed);
  });
});
