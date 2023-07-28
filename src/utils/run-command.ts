import { destr } from "destr";
import { ExecaError, execaCommand } from "execa";
import template from "lodash/fp/template.js";
import type { Config, Context } from "semantic-release";

/**
 * Runs a command and returns the output
 * @throws {ExecaError} if the command fails
 */
export async function runCommand(
  cmd: string,
  { stdout, stderr, ...ctx }: Context & Config,
) {
  cmd = template(cmd)({ ...ctx });
  const result = execaCommand(cmd, { env: ctx.env, cwd: ctx.cwd });

  result.stdout?.pipe(stdout ?? process.stdout, { end: false });
  result.stderr?.pipe(stderr ?? process.stderr, { end: false });

  return destr((await result).stdout.trim());
}

export function isExecaError(error: unknown): error is ExecaError {
  return error instanceof Error && "exitCode" in error;
}
