import { definePlugin } from "../utils";

const enabled = Object.keys(process.env).some((x) =>
  x.startsWith("SEMANTIC_RELEASE_CMD_"),
);

export const execConfig =
  enabled && definePlugin("@jcwillox/semantic-release-config/exec-cmd");
