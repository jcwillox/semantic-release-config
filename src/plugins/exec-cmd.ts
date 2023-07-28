import SemanticReleaseError from "@semantic-release/error";
import { Config, Context } from "semantic-release";
import { defineHook } from "../utils";
import { isExecaError, runCommand } from "../utils/run-command";

const runFailCommand = async (
  cmd: string,
  ctx: Context & Config,
  errorName: string,
) => {
  ctx.logger.log('Running command "%s"', cmd);
  try {
    return await runCommand(cmd, ctx);
  } catch (error) {
    if (isExecaError(error)) {
      throw new SemanticReleaseError(error.shortMessage, errorName);
    } else if (error instanceof Error) {
      throw new SemanticReleaseError(error.message, errorName);
    }
  }
};

export const verifyConditions = defineHook(async (_, ctx) => {
  const cmd = ctx.env.SEMANTIC_RELEASE_CMD_VERIFY;
  if (!cmd) return;
  return cmd && runFailCommand(cmd, ctx, "EVERIFYCONDITIONS");
});

export const generateNotes = defineHook(async (_, ctx) => {
  const cmd = ctx.env.SEMANTIC_RELEASE_CMD_GENERATE_NOTES;
  if (!cmd) return;
  return cmd && runFailCommand(cmd, ctx, "EGENERATENOTES");
});

export const prepare = defineHook(async (_, ctx) => {
  const cmd = ctx.env.SEMANTIC_RELEASE_CMD_PREPARE;
  if (!cmd) return;
  return cmd && runFailCommand(cmd, ctx, "EPREPAREFAILED");
});

export const publish = defineHook(async (_, ctx) => {
  const cmd = ctx.env.SEMANTIC_RELEASE_CMD_PUBLISH;
  if (!cmd) return;
  return cmd && runFailCommand(cmd, ctx, "EPUBLISHFAILED");
});

export const addChannel = defineHook(async (_, ctx) => {
  const cmd = ctx.env.SEMANTIC_RELEASE_CMD_CHANNEL;
  if (!cmd) return;
  return cmd && runFailCommand(cmd, ctx, "EPUBLISHFAILED");
});
