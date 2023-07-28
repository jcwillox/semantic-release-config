#! /usr/bin/env node
import { execFileSync } from "child_process";
import path from "path";

execFileSync(
  path.resolve(__dirname, "../node_modules/.bin/semantic-release"),
  [...process.argv.slice(2), "-e", path.resolve(__dirname, "index.cjs")],
  { stdio: "inherit", shell: true },
);
