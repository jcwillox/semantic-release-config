import { destr } from "destr";
import { definePlugin, parseBool } from "../utils";
import { isChangelogEnabled } from "./changelog";

const enabled =
  // enable if changelog is enabled and git commit is not disabled
  (isChangelogEnabled &&
    parseBool(process.env.SEMANTIC_RELEASE_GIT_COMMIT) !== false) ||
  parseBool(process.env.SEMANTIC_RELEASE_GIT_COMMIT) ||
  process.env.SEMANTIC_RELEASE_GIT_MESSAGE ||
  process.env.SEMANTIC_RELEASE_GIT_ASSETS;

export const gitConfig =
  enabled &&
  definePlugin([
    "@semantic-release/git",
    {
      assets:
        (process.env.SEMANTIC_RELEASE_GIT_ASSETS &&
          destr(process.env.SEMANTIC_RELEASE_GIT_ASSETS)) ||
        (process.env.SEMANTIC_RELEASE_CHANGELOG_FILE
          ? [
              process.env.SEMANTIC_RELEASE_CHANGELOG_FILE,
              "package.json",
              "package-lock.json",
              "npm-shrinkwrap.json",
            ]
          : undefined),
      message: process.env.SEMANTIC_RELEASE_GIT_MESSAGE,
    },
  ]);
