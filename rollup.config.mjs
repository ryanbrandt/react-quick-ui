import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import alias from "@rollup/plugin-alias";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

// Resolve from this file, not the working directory.
const fromRoot = (file) => resolve(import.meta.dirname, file);
const readJson = (file) => JSON.parse(readFileSync(fromRoot(file), "utf8"));
const packageFile = readJson("./package.json");
const { paths } = readJson("./tsconfig.json").compilerOptions;

// Peers stay external, including subpaths such as react/jsx-runtime.
const peers = Object.keys(packageFile.peerDependencies);
const external = (id) =>
  peers.some((peer) => id === peer || id.startsWith(`${peer}/`));

// tsconfig "paths" ("@stories/*" -> "./src/stories/*") as alias entries.
const aliasEntries = Object.entries(paths).map(([find, [target]]) => ({
  find: find.replace("/*", ""),
  replacement: fromRoot(target.replace("/*", "")),
}));

export default {
  input: fromRoot("src/index.ts"),
  output: [
    // esModule: keep the __esModule marker Rollup 2 emitted (Rollup 3+ omits it
    // when there is no default export), so CJS interop is unchanged.
    { file: fromRoot(packageFile.main), format: "cjs", sourcemap: true, esModule: true },
    { file: fromRoot(packageFile.module), format: "esm", sourcemap: true },
  ],
  external,
  // A bare import that isn't a peer would otherwise ship as an unresolved
  // require() with only a warning; report it as an error instead.
  onLog(level, log, handler) {
    if (log.code === "UNRESOLVED_IMPORT") return handler("error", log);
    handler(level, log);
  },
  plugins: [
    alias({ entries: aliasEntries }),
    // JS only; declarations are emitted by `tsc` + `tsc-alias` (scripts/build.sh).
    typescript({
      tsconfig: fromRoot("tsconfig.build.json"),
      declaration: false,
      emitDeclarationOnly: false,
    }),
    terser(),
  ],
};
