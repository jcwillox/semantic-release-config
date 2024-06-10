import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import template from "lodash/fp/template.js";
import { definePluginHooks } from "../utils";

const readIfExists = async (path: string) => {
  try {
    return (await readFile(path)).toString().trim();
  } catch (e) {
    return "";
  }
};

export default definePluginHooks({
  prepare: async (_, ctx) => {
    if (!ctx.nextRelease.notes) return;

    let changelogTitle =
      ctx.env.SEMANTIC_RELEASE_CHANGELOG_TITLE ?? "# Changelog";
    let changelogFile =
      ctx.env.SEMANTIC_RELEASE_CHANGELOG_FILE || "CHANGELOG.md";
    let changelogPrefix =
      ctx.env.SEMANTIC_RELEASE_CHANGELOG_PREFIX ?? "## ${nextRelease.version}";

    changelogTitle = template(changelogTitle)(ctx);
    changelogPrefix = template(changelogPrefix)(ctx);
    changelogFile = template(changelogFile)(ctx);

    const changelogPath = path.resolve(ctx.cwd ?? "", changelogFile);

    let content = await readIfExists(changelogPath);
    if (content.startsWith(changelogTitle))
      content = content.slice(changelogTitle.length).trim();

    const newContent =
      (changelogPrefix ? `${changelogPrefix}\n\n` : "") +
      // append new release notes
      ctx.nextRelease.notes.trim();

    if (content.startsWith(newContent)) {
      ctx.logger.log("Skipping changelog update due to duplicate content");
      return;
    }

    const result =
      (changelogTitle && `${changelogTitle}\n\n`) +
      `${newContent}\n` +
      // append existing content
      (content && `\n${content}\n`);

    await writeFile(changelogPath, result);
  },
});
