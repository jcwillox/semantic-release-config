import { definePlugin } from "../utils";

const enabled = Object.keys(process.env).some((x) =>
  x.startsWith("SEMANTIC_RELEASE_CMD_PRE_"),
);

export const execPreConfig = definePlugin(
  "@jcwillox/semantic-release-config/exec-pre-cmd",
  enabled,
);
