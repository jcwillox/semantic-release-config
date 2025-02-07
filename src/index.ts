import type { Options, PluginSpec } from "semantic-release";
import {
  changelogConfig,
  commitAnalyzerConfig,
  execConfig,
  execPreConfig,
  forceReleaseConfig,
  gitConfig,
  githubConfig,
  npmConfig,
  releaseNotesConfig,
  slackBotConfig,
} from "./configs";
import { isTruthy } from "./utils";

const config: Options = {
  branches: [
    "+([0-9])?(.{+([0-9]),x}).x",
    "main",
    "next",
    "next-major",
    { name: "beta", prerelease: true },
    { name: "alpha", prerelease: true },
    { name: "staging", prerelease: "rc" },
  ],
  plugins: ((...plugins: (PluginSpec | undefined | false)[]) =>
    plugins.filter(isTruthy))(
    execPreConfig,
    commitAnalyzerConfig,
    releaseNotesConfig,
    changelogConfig,
    githubConfig,
    npmConfig,
    execConfig,
    gitConfig,
    forceReleaseConfig,
    slackBotConfig,
  ),
};

export default config;
