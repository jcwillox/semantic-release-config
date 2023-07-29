# Semantic Release Config

[![License](https://img.shields.io/github/license/jcwillox/semantic-release-config?style=flat-square)](https://github.com/jcwillox/semantic-release-config/blob/main/LICENSE)
[![Version](https://img.shields.io/npm/v/%40jcwillox%2Fsemantic-release-config?style=flat-square)](https://www.npmjs.com/package/@jcwillox/semantic-release-config)
[![Publish Size](https://flat.badgen.net/packagephobia/publish/@jcwillox/semantic-release-config)](https://packagephobia.com/result?p=@jcwillox/semantic-release-config)
[![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

The shared semantic release config and plugins for my projects.

## Usage

**Install the package**:

```bash
# install the package and run semantic-release with built-in config
pnpm dlx @jcwillox/semantic-release-config
```

> Extra args are passed straight to `semantic-release` so you can use `--dry-run` or `--no-ci` for example.

## Environment Variables

The config is designed to be controlled through environment variables, all envs must be prefixed with `SEMANTIC_RELEASE_`.

| Option               | Description                                                                                                                    | Default                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| `NPM_ENABLE`         | Enable/disable the npm plugin                                                                                                  | `true` when `package.json` exists and `private` is not set to `true` |
| `NPM_PKG_ROOT`       | Directory path to publish                                                                                                      | `.`                                                                  |
|                      |                                                                                                                                |                                                                      |
| `GITHUB_ASSETS`      | Assets glob to upload to the GitHub release                                                                                    |                                                                      |
| `GITHUB_DRAFT`       | Create a draft release on GitHub                                                                                               | `false`                                                              |
|                      |                                                                                                                                |                                                                      |
| `FORCE_RELEASE`      | Forces the specified release type to be made, one of `major`, `minor`, `patch`, `auto`                                         | `auto`                                                               |
|                      |                                                                                                                                |                                                                      |
| `CMD_VERIFY`         | Run a command, supports templating same as [@semantic-release/exec](https://github.com/semantic-release/exec#verifyreleasecmd) |                                                                      |
| `CMD_GENERATE_NOTES` | Run a command, supports templating same as [@semantic-release/exec](https://github.com/semantic-release/exec#generatenotescmd) |                                                                      |
| `CMD_PREPARE`        | Run a command, supports templating same as [@semantic-release/exec](https://github.com/semantic-release/exec#preparecmd)       |                                                                      |
| `CMD_PUBLISH`        | Run a command, supports templating same as [@semantic-release/exec](https://github.com/semantic-release/exec#publishcmd)       |                                                                      |
| `CMD_CHANNEL`        | Run a command, supports templating same as [@semantic-release/exec](https://github.com/semantic-release/exec#addchannelcmd)    |                                                                      |
