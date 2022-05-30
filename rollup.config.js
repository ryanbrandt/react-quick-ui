import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import ttypescript from "ttypescript";

const packageFile = require("./package.json");

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
      typescript: ttypescript,
    }),
    terser(),
  ],
};
