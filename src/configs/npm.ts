import { env } from "../env.ts";
import { definePlugin, getPackageJSON } from "../utils";

const isPublicPackage = () => {
  const pkg = getPackageJSON();
  return !!pkg && pkg.private !== true;
};

export const npmConfig = definePlugin(
  ["@semantic-release/npm", { pkgRoot: env.npmPackageRoot }],
  env.npmEnable ?? isPublicPackage(),
);
