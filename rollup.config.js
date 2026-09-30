import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import transformPaths from "typescript-transform-paths";

const packageFile = require("./package.json");

// Bridge until Q3: rewrite the tsconfig path aliases (@stories/*, ...) to
// relative paths in the emitted JS and .d.ts files. This replaces ttypescript,
// which does not run on TypeScript >= 5.
const pathTransformer = (options) => ({
  type: "program",
  factory: (program) => transformPaths(program, options),
});

export default {
  input: "src/index.ts",
  output: [
    {
      file: packageFile.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: packageFile.module,
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.build.json",
      transformers: {
        before: [pathTransformer()],
        afterDeclarations: [pathTransformer({ afterDeclarations: true })],
      },
    }),
    terser(),
  ],
};
