import { definePlugin, parseBool } from "../utils";

const discussion =
  parseBool(process.env.SEMANTIC_RELEASE_GITHUB_DISCUSSION) ??
  process.env.SEMANTIC_RELEASE_GITHUB_DISCUSSION;

export const githubConfig = definePlugin([
  "@semantic-release/github",
  {
    assets: process.env.SEMANTIC_RELEASE_GITHUB_ASSETS,
    draftRelease: parseBool(process.env.SEMANTIC_RELEASE_GITHUB_DRAFT),
    discussionCategoryName: discussion === true ? "General" : discussion,
  },
]);
