import { env } from "../env.ts";
import { definePlugin } from "../utils";

export const forceReleaseConfig = definePlugin(
  "@jcwillox/semantic-release-config/force-publish",
  !!env.forceRelease && env.forceRelease !== "auto",
);
