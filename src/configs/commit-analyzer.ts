import { env } from "../env.ts";
import { definePlugin } from "../utils";

const releaseRules = [
  ...(env.commitMinorTypes?.map((type) => ({ type, release: "minor" })) ?? []),
  ...(env.commitPatchTypes?.map((type) => ({ type, release: "patch" })) ?? []),
];

export const commitAnalyzerConfig = definePlugin([
  "@semantic-release/commit-analyzer",
  {
    preset: "conventionalcommits",
    parserOpts: {
      mergePattern: /^Merge pull request #(\d+) from (.*)$/,
      mergeCorrespondence: ["id", "source"],
    },
    releaseRules: releaseRules.length > 0 ? releaseRules : undefined,
  },
]);
