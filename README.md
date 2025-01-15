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

| Option                | Description                                                                                                                     | Default                                                              |
|-----------------------|---------------------------------------------------------------------------------------------------------------------------------| -------------------------------------------------------------------- |
| `NPM_ENABLE`          | Enable/disable the npm plugin                                                                                                   | `true` when `package.json` exists and `private` is not set to `true` |
| `NPM_PKG_ROOT`        | Directory path to publish                                                                                                       | `.`                                                                  |
|                       |                                                                                                                                 |                                                                      |
| `GITHUB_ASSETS`       | Assets glob to upload to the GitHub release                                                                                     |                                                                      |
| `GITHUB_DRAFT`        | Create a draft release on GitHub                                                                                                | `false`                                                              |
| `GITHUB_DISCUSSION`   | Category name in which to create a discussion for the release, if value is set to `true` category will be `General`             | `false`                                                              |
|                       |                                                                                                                                 |                                                                      |
| `FORCE_RELEASE`       | Forces the specified release type to be made, one of `major`, `minor`, `patch`, `auto`                                          | `auto`                                                               |
|                       |                                                                                                                                 |                                                                      |
| `CMD_VERIFY`          | Run a command, supports templating same as [@semantic-release/exec](https://github.com/semantic-release/exec#verifyreleasecmd)  |                                                                      |
| `CMD_ANALYZE_COMMITS` | Run a command, supports templating same as [@semantic-release/exec](https://github.com/semantic-release/exec#analyzecommitscmd) |                                                                      |
| `CMD_VERIFY_RELEASE`  | Run a command, supports templating same as [@semantic-release/exec](https://github.com/semantic-release/exec#verifyreleasecmd)  |                                                                      |
| `CMD_GENERATE_NOTES`  | Run a command, supports templating same as [@semantic-release/exec](https://github.com/semantic-release/exec#generatenotescmd)  |                                                                      |
| `CMD_PREPARE`         | Run a command, supports templating same as [@semantic-release/exec](https://github.com/semantic-release/exec#preparecmd)        |                                                                      |
| `CMD_PUBLISH`         | Run a command, supports templating same as [@semantic-release/exec](https://github.com/semantic-release/exec#publishcmd)        |                                                                      |
| `CMD_CHANNEL`         | Run a command, supports templating same as [@semantic-release/exec](https://github.com/semantic-release/exec#addchannelcmd)     |                                                                      |
| `CMD_SUCCESS`         | Run a command, supports templating same as [@semantic-release/exec](https://github.com/semantic-release/exec#successcmd)        |                                                                      |
|                       |                                                                                                                                 |                                                                      |
| `CHANGELOG`           | Enable the changelog writer plugin                                                                                              | `true` when `file` or `title` is defined                             |
| `CHANGELOG_TITLE`     | Title to prepend the changelog file with (templatable)                                                                          | `# Changelog`                                                        |
| `CHANGELOG_FILE`      | The file to write the changelog to (templatable)                                                                                | `CHANGELOG.md`                                                       |
| `CHANGELOG_PREFIX`    | Prefix to append before the release notes (templatable)                                                                         | `## ${nextRelease.version}`                                          |
|                       |                                                                                                                                 |                                                                      |
| `GIT_COMMIT`          | Enable the [@semantic-release/git](https://github.com/semantic-release/git) plugin                                              | `true` when changelog enabled, or `message` or `assets` is defined   |
| `GIT_MESSAGE`         | Override default commit message                                                                                                 | `release: ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}`  |
| `GIT_ASSETS`          | Specify which assets to include in the commit                                                                                   | automatically uses changelog file if present and not overriden       |
