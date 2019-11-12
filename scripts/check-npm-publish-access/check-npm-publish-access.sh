#!/usr/bin/env bash

# Exit immediately if any command exits with a non-zero status
set -e;

# Checking for dependencies
if ! [ -x "$(command -v npm)" ]; then
  echo 'Error: "npm" is not installed.'
  exit 1
fi
if ! [ -x "$(command -v grep)" ]; then
  echo 'Error: "grep" is not installed.'
  exit 1
fi

# Checking if the list of repo npm owners includes current npm user.
#
# `npm owner ls` prints a list of npm users, who have access to the current repo
# in the following format:
# > username1 <someuser@emain.com>
# > username2 <auser@emain.com>
# > username3 <theusername@emain.com>
#
# `npm whoami` prints current npm username
# > username2
npm_package_name=$(node -p "require('./package.json').name")
npm_current_user=$(npm whoami)
if npm owner ls | grep --quiet "^${npm_current_user}\s"; then
    echo "Access to '${npm_package_name}' repository was confirmed for '${npm_current_user}'."
    exit 0
else
    echo "${npm_current_user} doesn't have an access to the repo '${npm_package_name}'."
    exit 1
fi

