import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    cli: "src/cli.ts",
    configs: "src/configs/index.ts",
    "utils/index": "./src/utils/index.ts",
    "utils/run-command": "src/utils/run-command.ts",
    "exec-cmd": "src/plugins/exec-cmd.ts",
    "force-publish": "src/plugins/force-publish.ts",
  },
  format: ["cjs", "esm"],
  loader: {
    ".hbs": "text",
  },
  treeshake: true,
  minify: true,
  clean: true,
  shims: true,
  dts: true,
});
