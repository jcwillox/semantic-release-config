import { definePlugin, parseBool } from "../utils";

export const isChangelogEnabled =
  parseBool(process.env.SEMANTIC_RELEASE_CHANGELOG) ||
  process.env.SEMANTIC_RELEASE_CHANGELOG_TITLE ||
  process.env.SEMANTIC_RELEASE_CHANGELOG_FILE ||
  process.env.SEMANTIC_RELEASE_CHANGELOG_PREFIX;

export const changelogConfig =
  isChangelogEnabled &&
  definePlugin("@jcwillox/semantic-release-config/changelog");
