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
1. Make sure the local `master` branch is checked out and up to date. It should contain all the latest commits that should be included with the release.
2. Determine the new version number on the basis of [semver specifications](https://semver.org).
3. Update the version number in metadata files (package[-lock].json), replacing `x.x.x` with actual version number:
```bash
(master) $ npm --no-git-tag-version version x.x.x
```
4. Create a new annotated Git tag, replacing `x.x.x` with actual version number:
```bash
(master) $ git tag -a x.x.x
```
5. In the tag message, list all significant changes that come with the new release. To list all commits since last tag, run:
```bash
(master) $ git log <lasttag>..HEAD
```
6. Push new tag to remote, replacing `x.x.x` with actual version number:
```bash
(master) $ git push origin master x.x.x
```
7. Publish new package version to [NPM](https://npmjs.com/package/@textkernel/oneui):
```bash
(master) $ npm publish --access=public
```

## Storybook
A new version of Storybook will be deployed automatically when pushing new tags.
