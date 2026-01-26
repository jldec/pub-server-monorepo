# Package Migration Guide

Quick reference for migrating packages from `/Users/jurgen/pub` into the monorepo.

## Steps to Migrate a Package

### 1. Copy Package to Monorepo
```bash
cp -r /Users/jurgen/pub/PACKAGE_NAME packages/
```

### 2. Clean Up Package Directory
```bash
cd packages/PACKAGE_NAME

# Remove monorepo-level configs (now at root)
rm -rf .github .editorconfig .eslintrc.json .gitignore .npmrc .gitattributes

# Remove old dependencies
rm -rf node_modules .DS_Store
```

Remove CI badge (if any) from the top of the README.

### 3. Update package.json

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

### 4. Install Dependencies
```bash
cd /Users/jurgen/pub/pub-server-monorepo
pnpm install
```

### 5. Verify Tests Pass
```bash
# Test specific package
cd packages/PACKAGE_NAME
pnpm test

# Test all packages
cd ../..
pnpm test
```

### 6. Create Changeset
```bash
pnpm changeset
# Select: PACKAGE_NAME
# Select: major (for initial migration)
# Summary: "move to monorepo"
```

### 7. Commit and Push
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
