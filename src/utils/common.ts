import { existsSync, readFileSync } from "fs";
import { basename } from "path";
import type { Config, Context, Options, PluginSpec } from "semantic-release";

export const definePlugin = <T extends PluginSpec>(config: T): T => config;

export const defineHook = <T extends Options, R = unknown>(
  fn: (config: T, context: Context & Config) => R,
) => fn;

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
