import { env } from "../env.ts";
import { definePlugin } from "../utils";

export const githubConfig = definePlugin([
  "@semantic-release/github",
  {
    assets: env.githubAssets,
    draftRelease: env.githubDraft,
    discussionCategoryName:
      env.githubDiscussion === true ? "General" : env.githubDiscussion,
  },
]);
