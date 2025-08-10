import { env } from "../env.ts";
import { definePlugin, getRepositoryName } from "../utils";

// add zero width character between @ and package name to prevent slack
// from parsing it as a mention.
const packageName = (env.package ?? getRepositoryName()).replace(/^@/, "@​");

export const slackBotConfig = definePlugin(
  [
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
        {
          pattern: "staging",
          notifyOnSuccess: true,
          notifyOnFail: true,
        },
      ],
    },
  ],
  !!env.slackWebhook,
);
