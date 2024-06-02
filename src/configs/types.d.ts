import type { Commit } from "semantic-release";

export type ReleaseNotesPlugin = [
  string,
  {
    writerOpts: {
      commitGroupsSort?: (a: ExtendedCommit, b: ExtendedCommit) => number;
      transform?: (
        commit: ExtendedCommit,
        context: Context,
      ) => Partial<ExtendedCommit> | undefined;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  },
];

type ExtendedCommit = Omit<Commit, "hash" | "subject"> & {
  id?: string;
  merge?: boolean;
  type: string;
  notes?: { title?: string; text?: string }[];
  revert?: boolean;
  scope?: string;
  title: string;
  shortHash?: string;
  references: { issue: string }[];
  hash?: string;
  subject?: string;
  header?: string;
};

type Context = {
  repository?: string;
  host?: string;
  owner?: string;
  repoUrl?: string;
};
