import SemanticReleaseError from "@semantic-release/error";
import { defineHook } from "../utils";

export const prepare = defineHook((_, { env }) => {
  if (
    env.SEMANTIC_RELEASE_FORCE_RELEASE &&
    !["major", "minor", "patch"].includes(env.SEMANTIC_RELEASE_FORCE_RELEASE)
  )
    throw new SemanticReleaseError(
      `Invalid value for SEMANTIC_RELEASE_FORCE_RELEASE: ${env.SEMANTIC_RELEASE_FORCE_RELEASE}`,
      "EINVALIDRELEASETYPE",
      "Must be one of: major, minor, patch",
    );
});

export const analyzeCommits = defineHook(
  (_, { env }) => env.SEMANTIC_RELEASE_FORCE_RELEASE,
);
