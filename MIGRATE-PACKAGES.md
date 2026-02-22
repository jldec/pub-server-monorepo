# Package Migration Guide
Quick reference for migrating packages from `/Users/jurgen/pub` into the monorepo.
The order of package migration is listed in `/Users/jurgen/pub/dependency-graph.md`

- session 1 - https://share.opencode.cloudflare.dev/share/ZySzv0bt 


## Steps to Migrate a Package

### Create a Feature Branch
Start on main and confirm the previous migration has been merged:
```bash
git checkout main
git pull
git log --oneline -3  # confirm latest migration commit is present
git checkout -b migrate-PACKAGE_NAME
```

### Copy Package to Monorepo
If the package is named `pub-NAME`, the source directory is `../NAME` (without the `pub-` prefix).

NOTE: If the package directory contains an `env` file, stop and ask user to cleanup first.

```bash
cp -r /Users/jurgen/pub/PACKAGE_NAME packages/
```

NOTE: The directory name under `packages/` should match the `name` field in `package.json`. Rename after copying if needed.

### Clean Up Package Directory
```bash
cd packages/PACKAGE_NAME

rm -rf .git

# Remove monorepo-level configs (now at root) if they match the root settings
rm -rf .github .editorconfig .gitignore .npmrc .gitattributes LICENSE

# Remove old dependencies
rm -rf node_modules .DS_Store
```

### .eslintrc
- Remove .eslintrc after confirming that the rules are covered by the root-level eslint.config
- If there are additional rules, add them to the root-level config if they are generic.
  Otherwise create a package-level eslint config.

### Remove CI badge (if any) from the top of the README.

### Update package.json

**Remove from devDependencies:**
- `eslint` (now at root)
- `tape` (now at root)

**Update repository field:**
```json
"repository": {
  "type": "git",
  "url": "git://github.com/jldec/pub-server-monorepo.git",
  "directory": "packages/PACKAGE_NAME"
}
```

**Update internal dependencies to use workspace:**
- If the package depends on other packages in the monorepo (e.g., `date-plus`, `asyncbuilder`), change the version to `workspace:*`
- Example: `"date-plus": "^1.2.0"` → `"date-plus": "workspace:*"`

**Keep package-specific devDependencies** (e.g., `lodash.partial` for asyncbuilder)

### Install Dependencies
```bash
cd /Users/jurgen/pub/pub-server-monorepo
pnpm install
```

### Fix Lint Errors
The monorepo eslint config may be stricter than the package's original config (e.g., `no-unused-vars` requires unused caught errors to be prefixed with `_`). Fix any new lint errors before proceeding.

### Verify Tests Pass
```bash
# Test specific package
cd packages/PACKAGE_NAME
pnpm test

# Test all packages
cd ../..
pnpm test
```

### Create Changeset
```bash
pnpm changeset
# Select: PACKAGE_NAME
# Select: major (for initial migration)
# Summary: "move to monorepo"
```

### Commit and Push
```bash
git add .
git commit -m "feat: migrate PACKAGE_NAME to monorepo"
git push -u origin migrate-PACKAGE_NAME
```

## Key Files Already at Root

- `.editorconfig` - Editor configuration
- `.gitattributes` - Git line ending settings
- `.gitignore` - Ignores node_modules
- `eslint.config.mjs` - ESLint configuration
- `LICENSE` - MIT license

## Release Flow

The Release workflow runs twice per migration:
1. First run: finds the changeset, creates a "chore: version packages" PR
2. After that PR is merged: publishes the new version to npm and creates a git tag

## Notes

- Root devDependencies: `@changesets/cli`, `@eslint/js`, `eslint`, `tape`
- Packages inherit root configuration
- Remove redundant config files from packages
- Each package needs its own changeset for versioning
- Documentation-only changes don't trigger CI/Release
