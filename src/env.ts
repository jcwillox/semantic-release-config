import { destr } from "destr";

const parseBool = (value: string | undefined) => {
  const parsed = destr(value);
  if (typeof parsed === "boolean") return parsed;
  if (typeof parsed === "number") return !!parsed;
  return undefined;
};

const parseIfBool = (value: string | undefined) => {
  const parsed = destr(value);
  if (typeof parsed === "boolean") return parsed;
  return value; // return the original string if not a boolean
};

const parseArray = (value: string | undefined) => {
  const parsed = destr(value);
  if (Array.isArray(parsed)) return parsed.map(String);
  if (typeof parsed === "string") return [parsed];
  return undefined;
};

const getEnv = (name: string) => process.env[`SEMANTIC_RELEASE_${name}`];
const parseEnv = <T = string>(name: string, transform: (value?: string) => T) =>
  transform(getEnv(name));

export const env = {
  forceRelease: getEnv("FORCE_RELEASE"),
  changelog: parseEnv("CHANGELOG", parseBool),
  changelogTitle: getEnv("CHANGELOG_TITLE"),
  changelogFile: getEnv("CHANGELOG_FILE"),
  changelogPrefix: getEnv("CHANGELOG_PREFIX"),
  gitCommit: parseEnv("GIT_COMMIT", parseBool),
  gitMessage: getEnv("GIT_MESSAGE"),
  gitMessageType: getEnv("GIT_MESSAGE_TYPE"),
  gitAssets: parseEnv("GIT_ASSETS", destr),
  githubAssets: parseEnv("GITHUB_ASSETS", destr),
  githubDiscussion: parseEnv("GITHUB_DISCUSSION", parseIfBool),
  githubDraft: parseEnv("GITHUB_DRAFT", parseBool),
  githubRepository: process.env.GITHUB_REPOSITORY,
  commitMinorTypes: parseEnv("COMMIT_MINOR_TYPES", parseArray),
  commitPatchTypes: parseEnv("COMMIT_PATCH_TYPES", parseArray),
  npmEnable: parseEnv("NPM_ENABLE", parseBool),
  npmPackageRoot: getEnv("NPM_PACKAGE_ROOT"),
  package: getEnv("PACKAGE"),
  slackWebhook: getEnv("SLACK_WEBHOOK") || process.env.SLACK_WEBHOOK,
};
