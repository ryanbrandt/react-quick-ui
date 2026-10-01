/**
 * @jest-environment node
 */
import { existsSync, readFileSync, readdirSync } from "fs";
import { join } from "path";
import { compile } from "sass";

const FONTS_DIR = join(__dirname, "../../src/assets/fonts/work-sans");

interface FontFace {
  file: string;
  family: string;
  style: string;
  weight: string;
  display: string;
}

const property = (body: string, name: string): string =>
  new RegExp(`${name}:\\s*([^;]+);`).exec(body)?.[1]?.trim() ?? "";

const compileFontFaces = (): Array<FontFace> => {
  const { css } = compile(join(__dirname, "../../src/styles/fonts.scss"));

  return [...css.matchAll(/@font-face\s*{([^}]*)}/g)].map(([, body = ""]) => ({
    file:
      /url\("\.\.\/assets\/fonts\/work-sans\/([^"]+)"\)/.exec(body)?.[1] ?? "",
    family: property(body, "font-family"),
    style: property(body, "font-style"),
    weight: property(body, "font-weight"),
    display: property(body, "font-display"),
  }));
};

describe("fonts.css", () => {
  const faces = compileFontFaces();
  const fontFiles = readdirSync(FONTS_DIR).filter((file) =>
    file.endsWith(".woff2")
  );

  it("declares one face per bundled font file", () => {
    expect(faces.map(({ file }) => file).sort()).toEqual(fontFiles.sort());
  });

  it("declares each file as variable Work Sans of its style, swapping in", () => {
    expect(faces).toEqual(
      faces.map(({ file }) => ({
        file,
        family: '"Work Sans"',
        style: file.includes("-italic") ? "italic" : "normal",
        weight: "100 900",
        display: "swap",
      }))
    );
  });

  it("ships the SIL Open Font License next to the fonts", () => {
    const license = join(FONTS_DIR, "OFL.txt");

    expect(existsSync(license)).toBe(true);
    expect(readFileSync(license, "utf8")).toContain(
      "SIL OPEN FONT LICENSE Version 1.1"
    );
  });
});
