import SemanticReleaseError from "@semantic-release/error";
import { destr } from "destr";
import { type ExecaError, execa, parseCommandString } from "execa";
import template from "lodash/fp/template.js";
import type { VerifyConditionsContext } from "semantic-release";

/**
 * Runs a command and returns the output
 * @throws {ExecaError} if the command fails
 */
export async function runCommand(
  cmd: string,
  { stdout, stderr, ...ctx }: VerifyConditionsContext,
) {
  cmd = template(cmd)({ ...ctx });

  const [file, ...args] = parseCommandString(cmd);
  const result = execa(file, args, {
    env: ctx.env,
    cwd: ctx.cwd,
    shell: true,
  });

  result.stdout?.pipe(stdout ?? process.stdout, { end: false });
  result.stderr?.pipe(stderr ?? process.stderr, { end: false });

  return destr((await result).stdout.trim());
}

export async function runFailCommand(
  cmd: string,
  ctx: VerifyConditionsContext,
  errorName: string,
) {
  ctx.logger.log('Running command "%s"', cmd);
  try {
    return await runCommand(cmd, ctx);
  } catch (err) {
    if (isExecaError(err)) {
      throw new SemanticReleaseError(err.shortMessage, errorName);
    }
    if (err instanceof Error) {
      throw new SemanticReleaseError(err.message, errorName);
    }
  }
}

export function isExecaError(error: unknown): error is ExecaError {
  return error instanceof Error && "exitCode" in error;
}
