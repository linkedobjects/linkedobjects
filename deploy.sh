#!/usr/bin/env bash

# Check if the working directory is a Git repository
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
  echo "This is not a Git repository. Aborting."
  exit 1
fi

# Get the commit message from all arguments after the script name
commit_message="${@:1}"

# Add all files to Git
if ! git add -A; then
  echo "Failed to add files to Git. Aborting."
  exit 1
fi

# Commit the changes with the provided message
if ! git commit -m "$commit_message"; then
  echo "Failed to commit changes. Aborting."
  exit 1
fi

# Check if package.json exists
if [ -f "package.json" ]; then
  # Bump the minor patch version of the NPM package
  if ! npm version patch; then
    echo "Failed to bump NPM version. Aborting."
    exit 1
  fi

  # Publish the package
  if ! npm publish; then
    echo "Failed to publish NPM package. Aborting."
    exit 1
  fi
else
  echo "No package.json found. Skipping NPM commands."
fi

# Check if the origin exists
if git ls-remote --exit-code origin > /dev/null 2>&1; then
  # Push the changes to the origin Git repository
  if ! git push origin HEAD; then
    echo "Failed to push changes to origin. Aborting."
    exit 1
  fi
else
  echo "No origin found. Skipping push to origin."
fi

