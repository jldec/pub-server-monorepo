# Agent Guidelines

Instructions for AI agents working on this monorepo.

## Package Manager

- Use `pnpm` (not npm or yarn)
- Run `pnpm install` to install dependencies
- Run `pnpm test` to run tests

## Git Workflow

- Always work in a feature branch (not main)
- Create a new branch for each task: `git checkout -b feature-name`
- Do NOT commit changes - let the user commit
- Do NOT push changes - let the user push

## Development Process

1. Create a feature branch
2. Make code changes
3. Run tests to verify changes
4. Leave changes unstaged for user to review and commit
