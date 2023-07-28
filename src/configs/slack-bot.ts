import { definePlugin, getRepositoryName } from "../utils";

// add zero width character between @ and package name to prevent slack
// from parsing it as a mention.
const packageName =
  process.env.SEMANTIC_RELEASE_PACKAGE ??
  getRepositoryName().replace(/^@/, "@​");

export const slackBotConfig =
  process.env.SLACK_WEBHOOK &&
  definePlugin([
    "semantic-release-slack-bot",
    {
      packageName,
      notifyOnSuccess: false,
      notifyOnFail: true,
      markdownReleaseNotes: true,
      branchesConfig: [
        {
          pattern: "main",
          notifyOnSuccess: true,
          notifyOnFail: true,
        },
      ],
    },
  ]);
