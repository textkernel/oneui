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

Before proceeding to the next step, **make sure that you are signed in NPM under a correct user account**.

To find your user account, type the following in your terminal:

```bash
npm whoami
```

If you are not logged in, you need to login/add new NPM user:

```bash
npm adduser
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

# Troubleshooting

Sometimes the script might fail midway through the process. This could be due to not being logged in to NPM, for example.

Another possible reason is required two-factor authentication (2FA) for write actions, which will ask for a one-time code every time you want to make a release. To disable this, go to your account settings, modify the 2FA settings, and under **Additional actions**, uncheck the checkbox labeled **Require two-factor authentication for write actions.**. Then, click **Update Preferences**.

If you encounter any problems, including the ones mentioned above, you will need to follow these steps to revert changes that have already been made locally and pushed to remote.

Revert last commit

```bash
git reset --hard <last_good_commit_hash>
git log
git push -f
```

Note: `git log` in the middle is optional, so that you can check that all is as you expect it to be

Remove tags on local and remote

```bash
git tag -d <tag name>
git push --delete origin <tag name>
```

Fix the problem that made the script fail, and start again.
