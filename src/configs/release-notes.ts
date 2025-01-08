import footerPartial from "../templates/footer.hbs";
import headerPartial from "../templates/header.hbs";
import mainTemplate from "../templates/template.hbs";
import { capitalize, definePlugin } from "../utils";
import type { ReleaseNotesPlugin } from "./types";

const COMMIT_TYPES: Record<string, string> = {
  feat: "✨ Features",
  fix: "🐛 Bug Fixes",
  perf: "⚡ Performance",
  revert: "🗑️ Reverts",
  docs: "📚 Documentation",
  style: "🎨 Style",
  chore: "🏗️ Chore",
  refactor: "♻️ Refactoring",
  test: "🚦 Test",
  build: "📦 Build",
  ci: "⚙️ Continuous Integration",
};

const merges = new Set<string>();

export const releaseNotesConfig = definePlugin<ReleaseNotesPlugin>([
  "@semantic-release/release-notes-generator",
  {
    preset: "conventionalcommits",
    parserOpts: {
      mergePattern: /^Merge pull request #(\d+) from (.*)$/,
      mergeCorrespondence: ["id", "source"],
      noteKeywords: ["BREAKING CHANGE", "DEPRECATED"],
    },
    writerOpts: {
      mainTemplate,
      // hide header as github already has one
      headerPartial,
      // add view full changelog link to footer
      footerPartial,
      commitGroupsSort: (a, b) => {
        const groups = Object.values(COMMIT_TYPES);
        return groups.indexOf(a.title) >= groups.indexOf(b.title) ? 1 : -1;
      },
      // extend angular preset with custom commit types
      transform: (commit, context) => {
        commit = { ...commit };
        const issues: string[] = [];

        // treat merge commits as squash
        // unless they don't have a type
        if (COMMIT_TYPES[commit.type]) {
          if (commit.merge) {
            if (commit.subject && commit.header) {
              merges.add(commit.header);
              commit.subject += ` (#${commit.id})`;
            }
          } else if (commit.header && merges.has(commit.header)) {
            merges.delete(commit.header);
            // skip if we already included the merge commit with the same name
            return;
          }
        }

        commit.notes = commit.notes?.map((note) => {
          note = { ...note };

          if (note.text) {
            note.text = capitalize(note.text);
          }
          if (note.title?.startsWith("BREAKING CHANGE")) {
            note.title = "🚨 Breaking Changes";
          } else if (note.title?.startsWith("DEPRECATED")) {
            note.title = "⚠️ Deprecated";
          }

          return note;
        });

        // rework commit message
        if (commit.revert) {
          commit.type = "revert";
        } else if (commit.type === "chore" && commit.scope === "deps") {
          commit.type = "build";
        }
        if (commit.scope === "*") {
          commit.scope = "";
        }

        // friendly commit type
        const type = COMMIT_TYPES[commit.type];
        // exclude all other COMMIT_TYPES from the changelog
        if (!type) return;
        commit.type = type;

        if (typeof commit.hash === "string") {
          commit.shortHash = commit.hash.substring(0, 7);
        }

        if (typeof commit.subject === "string") {
          let url = context.repository
            ? `${context.host}/${context.owner}/${context.repository}`
            : context.repoUrl;
          if (url) {
            url = `${url}/issues/`;
            // Issue URLs.
            commit.subject = commit.subject.replace(
              /#([0-9]+)/g,
              (_, issue) => {
                issues.push(issue);
                return `[#${issue}](${url}${issue})`;
              },
            );
          }
          if (context.host) {
            // User URLs.
            commit.subject = commit.subject.replace(
              /\B@([a-z0-9](?:-?[a-z0-9/]){0,38})/g,
              (_, username) =>
                username.includes("/")
                  ? `@${username}`
                  : `[@${username}](${context.host}/${username})`,
            );
          }
        }

        // capitalize commit message
        if (commit.subject) {
          commit.subject = capitalize(commit.subject);
        }

        // remove references that already appear in the subject
        commit.references = commit.references.filter(
          (reference) => issues.indexOf(reference.issue) === -1,
        );

        return {
          notes: commit.notes,
          type: commit.type,
          scope: commit.scope,
          shortHash: commit.shortHash,
          subject: commit.subject,
          references: commit.references,
        };
      },
    },
  },
]);
