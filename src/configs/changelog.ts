import { env } from "../env.ts";
import { definePlugin } from "../utils";

export const changelogConfig = definePlugin(
  "@jcwillox/semantic-release-config/changelog",
  env.changelog ||
    !!env.changelogTitle ||
    !!env.changelogFile ||
    !!env.changelogPrefix,
);
