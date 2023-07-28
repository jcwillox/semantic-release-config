import { definePlugin } from "../utils";

export const forceReleaseConfig =
  process.env.SEMANTIC_RELEASE_FORCE_RELEASE &&
  process.env.SEMANTIC_RELEASE_FORCE_RELEASE !== "auto" &&
  definePlugin("@jcwillox/semantic-release-config/force-publish");
