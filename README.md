[![CI](https://github.com/jldec/pub-server-monorepo/workflows/CI/badge.svg)](https://github.com/jldec/pub-server-monorepo/actions)

# pub-server-monorepo

Monorepo for pub-server packages.

## 📦 Packages

- **[asyncbuilder](./packages/asyncbuilder)** - Simple semi-asynchronous array builder
- **[date-plus](./packages/date-plus)** - Javascript dates extended with dateformat
- **[pub-util](./packages/pub-util)** - Utility toolbelt based on lodash for pub-server packages

## 🚀 Development

### Prerequisites

- Node.js 22+ (tested on 22, 24, 25)
- pnpm (latest version)

### Setup

```bash
# Install dependencies
pnpm install

# Run tests for all packages
pnpm test

# Lint all packages
pnpm lint
```

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests for a specific package
cd packages/asyncbuilder
pnpm test
```

## 📝 Contributing with Changesets

This monorepo uses [Changesets](https://github.com/changesets/changesets) for versioning and publishing.

### Adding a Changeset

When you make changes that should be released, create a changeset:

```bash
pnpm changeset
```

This will prompt you to:
1. Select which packages have changed
2. Choose the semver bump type (major/minor/patch)
3. Write a summary of the changes

The changeset will be saved as a markdown file in `.changeset/`.

### Changeset Guidelines

- **Patch**: Bug fixes, documentation updates, minor tweaks
- **Minor**: New features, non-breaking changes
- **Major**: Breaking changes

Example changeset flow:
```bash
# 1. Make your changes
git checkout -b my-feature

# 2. Create a changeset
pnpm changeset
# Select: asyncbuilder
# Select: patch
# Summary: "Fix timeout handling in asyncAppend"

# 3. Commit and push
git add .
git commit -m "fix: improve timeout handling"
git push origin my-feature

# 4. Create PR
# The changeset file will be part of your PR
```

### Release Process

The release process is automated via GitHub Actions:

1. **Create changesets** as you make changes (via PRs)
2. **Changesets accumulate** on the main branch
3. **Version Packages PR** is automatically created/updated
4. **Review and merge** the Version Packages PR
5. **Packages are automatically published** to npm

You don't need to manually run versioning or publishing commands!

## 🔧 CI/CD

### Continuous Integration

All commits and PRs are tested on:
- Node.js: 22, 24, 25
- OS: Ubuntu, macOS, Windows

Tests must pass before merging.

### Automated Publishing

When a "Version Packages" PR is merged:
- Package versions are bumped
- CHANGELOGs are updated
- Packages are published to npm
- GitHub releases are created

## 📄 License

MIT - see [LICENSE](./LICENSE) for details.

## 👤 Author

Jürgen Leschner - [github.com/jldec](https://github.com/jldec)
