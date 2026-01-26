# Package Migration Guide
Quick reference for migrating packages from `/Users/jurgen/pub` into the monorepo.

- session 1 - https://share.opencode.cloudflare.dev/share/ZySzv0bt 


## Steps to Migrate a Package

### Copy Package to Monorepo
```bash
cp -r /Users/jurgen/pub/PACKAGE_NAME packages/
```

### Clean Up Package Directory
```bash
cd packages/PACKAGE_NAME

# Remove monorepo-level configs (now at root) if they match the root settings
rm -rf .github .editorconfig .gitignore .npmrc .gitattributes

# Remove old dependencies
rm -rf node_modules .DS_Store
```

### .eslintrc
- Remove .eslintrc after confirming that the rules are covered by the root-level eslint.config
- If there are additional rules, add them to the rool-level config if they are generic.
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

**Keep package-specific devDependencies** (e.g., `lodash.partial` for asyncbuilder)

### Install Dependencies
```bash
cd /Users/jurgen/pub/pub-server-monorepo
pnpm install
```

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
git push
```

## Key Files Already at Root

- `.editorconfig` - Editor configuration
- `.gitattributes` - Git line ending settings
- `.gitignore` - Ignores node_modules
- `eslint.config.mjs` - ESLint configuration
- `LICENSE` - MIT license

## Notes

- Root devDependencies: `@changesets/cli`, `@eslint/js`, `eslint`, `tape`
- Packages inherit root configuration
- Remove redundant config files from packages
- Each package needs its own changeset for versioning
- Documentation-only changes don't trigger CI/Release
