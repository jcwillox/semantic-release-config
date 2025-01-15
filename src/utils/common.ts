import { existsSync, readFileSync } from "node:fs";
import { basename } from "node:path";
import type {
  AddChannelContext,
  AnalyzeCommitsContext,
  FailContext,
  GenerateNotesContext,
  Options,
  PluginSpec,
  PrepareContext,
  PublishContext,
  SuccessContext,
  VerifyConditionsContext,
  VerifyReleaseContext,
} from "semantic-release";

type Hooks = {
  verifyConditions?: (
    config: Options,
    context: VerifyConditionsContext,
  ) => unknown;
  analyzeCommits?: (config: Options, context: AnalyzeCommitsContext) => unknown;
  verifyRelease?: (config: Options, context: VerifyReleaseContext) => unknown;
  generateNotes?: (config: Options, context: GenerateNotesContext) => unknown;
  prepare?: (config: Options, context: PrepareContext) => unknown;
  publish?: (config: Options, context: PublishContext) => unknown;
  addChannel?: (config: Options, context: AddChannelContext) => unknown;
  success?: (config: Options, context: SuccessContext) => unknown;
  fail?: (config: Options, context: FailContext) => unknown;
};

export const definePlugin = <T extends PluginSpec>(config: T): T => config;
export const definePluginHooks = (hooks: Hooks) => hooks;

export function getPackageJSON(): Record<string, unknown> | undefined {
  if (existsSync("./package.json")) {
    return JSON.parse(readFileSync("./package.json").toString());
  }
}

export function getRepositoryName(): string {
  const pkg = getPackageJSON();
  if (typeof pkg?.name === "string") {
    return pkg.name;
  }
  if (process.env.GITHUB_REPOSITORY) {
    return process.env.GITHUB_REPOSITORY.split("/")[1];
  }
  return basename(process.cwd());
}

/**
 * Type guard to filter out falsy values
 *
 * @category Guards
 * @example array.filter(isTruthy)
 */
export function isTruthy<T>(v: T): v is Exclude<NonNullable<T>, false> {
  return Boolean(v);
}

export function parseBool(value: string | undefined): boolean | undefined {
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
}

export function capitalize(s: string): string {
  return s[0].toUpperCase() + s.slice(1);
}
