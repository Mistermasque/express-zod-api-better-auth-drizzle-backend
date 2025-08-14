#!/usr/bin/env bash

# Stop on errors
set -e

# This is a workaround to generate auth files without using path aliases
# for better-auth cli
# https://github.com/better-auth/better-auth/issues/3762

ROOT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && cd .. && pwd )

# Get dest dir from first argument
DEST_DIR="${1:-$ROOT_DIR/tmp/auth-cli}"
# Avoid relative path
TMP_DIR=$( realpath "$DEST_DIR" )

mkdir -p "$TMP_DIR"

FILES=("auth/auth.ts" "db/drizzle.ts" "config/db-config.ts" "config/config-error.ts" "utils/logger.ts")

for file in "${FILES[@]}"; do
  # Copy the auth files to the temporary directory without path aliases
  echo "Create $TMP_DIR/$file from $ROOT_DIR/src/$file"
  mkdir -p "$TMP_DIR/$(dirname "$file")"

  sed "s/\(import .* from  *\)\([\"']\)@\/*/\1\2..\\//g" "$ROOT_DIR/src/$file" > "$TMP_DIR/$file"
done

