/**
 * @jest-environment node
 */
import { readdirSync } from "fs";
import { join } from "path";
import { compile } from "sass";

const FONTS_DIR = join(__dirname, "../../src/assets/fonts/worksans");

interface FontFace {
  file: string;
  style: string;
  weight: string;
}

const compileFontFaces = (): Array<FontFace> => {
  const { css } = compile(join(__dirname, "../../src/styles/_fonts.scss"));

  return [...css.matchAll(/@font-face\s*{([^}]*)}/g)].map(([, body = ""]) => ({
    file: /url\("[^"]*\/([^/"]+)\.woff2"\)/.exec(body)?.[1] ?? "",
    style: /font-style:\s*([^;]+);/.exec(body)?.[1] ?? "",
    weight: (/font-weight:\s*([^;]+);/.exec(body)?.[1] ?? "").replace(
      "normal",
      "400"
    ),
  }));
};

// work-sans-v16-latin-<weight?><"italic"?> ("regular" is 400 normal)
const expectedFaceFor = (file: string): FontFace => {
  const variant = file.replace("work-sans-v16-latin-", "");
  const [, weight = "400", italic] = /^(\d+)?(italic)?/.exec(variant) ?? [];

  return { file, style: italic ? "italic" : "normal", weight };
};

describe("@font-face declarations", () => {
  const faces = compileFontFaces();

  it("declares one face per bundled font file", () => {
    const fontFiles = [
      ...new Set(
        readdirSync(FONTS_DIR).map((file) => file.replace(/\.woff2?$/, ""))
      ),
    ];

    expect(faces.map(({ file }) => file).sort()).toEqual(fontFiles.sort());
  });

  it("declares the style and weight that each font file contains", () => {
    expect(faces).toEqual(faces.map(({ file }) => expectedFaceFor(file)));
  });
});
