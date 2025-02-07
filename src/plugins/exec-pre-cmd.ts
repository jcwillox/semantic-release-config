import { definePluginHooks } from "../utils";
import { runFailCommand } from "../utils/run-command";

export default definePluginHooks({
  publish: async (_, ctx) => {
    const cmd = ctx.env.SEMANTIC_RELEASE_CMD_PRE_PUBLISH;
    if (!cmd) return;
    return cmd && runFailCommand(cmd, ctx, "EPUBLISHFAILED");
  },
});
