import { definePlugin, parseBool } from "../utils";

export const githubConfig = definePlugin([
  "@semantic-release/github",
  {
    assets: process.env.SEMANTIC_RELEASE_GITHUB_ASSETS,
    draftRelease: parseBool(process.env.SEMANTIC_RELEASE_GITHUB_DRAFT),
  },
]);
