import { definePluginHooks } from "../utils";
import { runFailCommand } from "../utils/run-command";

export default definePluginHooks({
  verifyConditions: async (_, ctx) => {
    const cmd = ctx.env.SEMANTIC_RELEASE_CMD_VERIFY;
    if (!cmd) return;
    return cmd && runFailCommand(cmd, ctx, "EVERIFYCONDITIONS");
  },
  analyzeCommits: async (_, ctx) => {
    const cmd = ctx.env.SEMANTIC_RELEASE_CMD_ANALYZE_COMMITS;
    if (!cmd) return;
    return cmd && runFailCommand(cmd, ctx, "EANALYZECOMMITS");
  },
  verifyRelease: async (_, ctx) => {
    const cmd = ctx.env.SEMANTIC_RELEASE_CMD_VERIFY_RELEASE;
    if (!cmd) return;
    return cmd && runFailCommand(cmd, ctx, "EVERIFYRELEASE");
  },
  generateNotes: async (_, ctx) => {
    const cmd = ctx.env.SEMANTIC_RELEASE_CMD_GENERATE_NOTES;
    if (!cmd) return;
    return cmd && runFailCommand(cmd, ctx, "EGENERATENOTES");
  },
  prepare: async (_, ctx) => {
    const cmd = ctx.env.SEMANTIC_RELEASE_CMD_PREPARE;
    if (!cmd) return;
    return cmd && runFailCommand(cmd, ctx, "EPREPAREFAILED");
  },
  publish: async (_, ctx) => {
    const cmd = ctx.env.SEMANTIC_RELEASE_CMD_PUBLISH;
    if (!cmd) return;
    return cmd && runFailCommand(cmd, ctx, "EPUBLISHFAILED");
  },
  addChannel: async (_, ctx) => {
    const cmd = ctx.env.SEMANTIC_RELEASE_CMD_CHANNEL;
    if (!cmd) return;
    return cmd && runFailCommand(cmd, ctx, "EPUBLISHFAILED");
  },
  success: async (_, ctx) => {
    const cmd = ctx.env.SEMANTIC_RELEASE_CMD_SUCCESS;
    if (!cmd) return;
    return cmd && runFailCommand(cmd, ctx, "ESUCCESSFAILED");
  },
});
