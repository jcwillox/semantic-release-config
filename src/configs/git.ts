import { env } from "../env.ts";
import { definePlugin } from "../utils";
import { changelogConfig } from "./changelog";

const enabled =
  // enable if changelog is enabled and git commit is not disabled
  (changelogConfig !== undefined && env.gitCommit !== false) ||
  env.gitCommit ||
  !!env.gitMessage ||
  !!env.gitAssets;

export const gitConfig = definePlugin(
  [
    "@semantic-release/git",
    {
      assets:
        env.gitAssets ||
        (env.changelogFile
          ? [
              env.changelogFile,
              "package.json",
              "package-lock.json",
              "npm-shrinkwrap.json",
            ]
          : undefined),
      message:
        env.gitMessage ??
        (env.gitMessageType
          ? `${env.gitMessageType}: \${nextRelease.version} [skip ci]\n\n\${nextRelease.notes}`
          : undefined),
    },
  ],
  enabled,
);
