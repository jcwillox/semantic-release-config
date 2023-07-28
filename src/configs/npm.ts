import { definePlugin, getPackageJSON, parseBool } from "../utils";

const isPublicPackage = () => {
  const pkg = getPackageJSON();
  return !!(pkg && pkg.private !== true);
};

const enabled =
  (process.env.SEMANTIC_RELEASE_NPM_ENABLE &&
    parseBool(process.env.SEMANTIC_RELEASE_NPM_ENABLE)) ??
  isPublicPackage();

export const npmConfig =
  enabled &&
  definePlugin([
    "@semantic-release/npm",
    {
      pkgRoot: process.env.SEMANTIC_RELEASE_NPM_PKG_ROOT,
    },
  ]);
