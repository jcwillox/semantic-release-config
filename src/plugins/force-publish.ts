import SemanticReleaseError from "@semantic-release/error";
import { definePluginHooks } from "../utils";

export default definePluginHooks({
  prepare: (_, { env }) => {
    if (
      env.SEMANTIC_RELEASE_FORCE_RELEASE &&
      !["major", "minor", "patch"].includes(env.SEMANTIC_RELEASE_FORCE_RELEASE)
    )
      throw new SemanticReleaseError(
        `Invalid value for SEMANTIC_RELEASE_FORCE_RELEASE: ${env.SEMANTIC_RELEASE_FORCE_RELEASE}`,
        "EINVALIDRELEASETYPE",
        "Must be one of: major, minor, patch",
      );
  },
  analyzeCommits: (_, { env }) => env.SEMANTIC_RELEASE_FORCE_RELEASE,
});
