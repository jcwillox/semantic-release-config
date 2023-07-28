import { definePlugin } from "../utils";

export const commitAnalyzerConfig = definePlugin([
  "@semantic-release/commit-analyzer",
  {
    parserOpts: {
      mergePattern: /^Merge pull request #(\d+) from (.*)$/,
      mergeCorrespondence: ["id", "source"],
    },
  },
]);
