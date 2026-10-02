// Prints every name the package entry (src/index.ts) exports, one per line,
// including everything it re-exports (src/stories/index.ts, the svgs, hooks
// and utilities). The scaffold scripts use it to refuse a name that is
// already taken: a second export of the same name fails to compile (TS2300).
import { join } from "node:path";
import process from "node:process";

import ts from "typescript";

const root = join(import.meta.dirname, "..");
const entry = join(root, "src/index.ts");

const { config } = ts.readConfigFile(join(root, "tsconfig.json"), (path) =>
  ts.sys.readFile(path)
);
const { options } = ts.parseJsonConfigFileContent(config, ts.sys, root);
const program = ts.createProgram([entry], options);
const checker = program.getTypeChecker();
const entryModule = checker.getSymbolAtLocation(program.getSourceFile(entry));

const names = checker.getExportsOfModule(entryModule).map(({ name }) => name);
process.stdout.write(`${names.join("\n")}\n`);
