# Releasing a new version of OneUI

When making a new release, please follow the procedure described below.

## Version Numbering

OneUI follows [semver](https://semver.org) specifications for version numbering. The rule of thumb in short:

> Given a version number MAJOR.MINOR.PATCH, increment the:
>
> 1. MAJOR version when you make incompatible API changes,
> 2. MINOR version when you add functionality in a backwards-compatible manner, and
> 3. PATCH version when you make backwards-compatible bug fixes.

Version numbers should not be prefixed (e.g. 1.2.3, **not** v1.2.3).

## Release Procedure

**First** make sure that storybooks runs well on prod build

```bash
(master)$ git pull
(master)$ npm run storybook:build
```

You can open storybook from `./out/index.html` (see also comment at end of terminal output)

**Then**, make sure your master branch is up to date and do a dry-run to verify that the expected version number will be used:

```bash
(master)$ npm run release -- --dry-run
```

**Finally**, simply run the following to make a new release:

```bash
(master)$ npm run release
```

The release script will...

1. ...auto determine a new version number on the basis of commit messages since last tag.
2. ...update the version number in metadata files (package[-lock].json).
3. ...generate an updated [CHANGELOG.md](CHANGELOG.md) on the basis of commit messages since last tag.
4. ...push a new tag and publish a new package to [npm](https://npmjs.com/package/@textkernel/oneui).

## Storybook

A new version of Storybook will be deployed automatically when pushing new tags.
