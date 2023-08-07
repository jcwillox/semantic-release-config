import { definePlugin } from "../utils";

export const commitAnalyzerConfig = definePlugin([
  "@semantic-release/commit-analyzer",
  {
    preset: "conventionalcommits",
    parserOpts: {
      mergePattern: /^Merge pull request #(\d+) from (.*)$/,
      mergeCorrespondence: ["id", "source"],
    },
  },
]);
