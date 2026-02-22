// ESLint flat config for the monorepo
import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Node.js globals
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        exports: 'writable',
        module: 'writable',
        require: 'readonly',
        global: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearTimeout: 'readonly',
        clearInterval: 'readonly',
        setImmediate: 'readonly',
        clearImmediate: 'readonly',
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        location: 'readonly',
        history: 'readonly',
        navigator: 'readonly',
        localStorage: 'readonly',
        confirm: 'readonly',
        performance: 'readonly',
        fetch: 'readonly',
        $: 'readonly',
      },
    },
    rules: {
      indent: ['error', 2, { ignoredNodes: ['ConditionalExpression'] }],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }],
    },
  },
  // Ignore vendored files
  {
    ignores: [
      'packages/pub-pkg-jquery/js/**',
      'packages/date-plus/dateformat.js',
      'packages/pub-pkg-font-awesome/css/**',
      'packages/pub-pkg-font-awesome/docs/**',
      'packages/pub-pkg-font-awesome/docs-src/**',
      'packages/pub-pkg-font-awesome/fonts/**',
      'packages/pub-pkg-font-open-sans/docs/**',
      'packages/pub-pkg-font-open-sans/docs-src/**',
      'packages/pub-pkg-highlight/docs/**',
      'packages/pub-pkg-highlight/js/**',
      'packages/pub-pkg-highlight/example/**',
      'packages/pub-pkg-prism/docs/**',
      'packages/pub-pkg-prism/js/**',
      'packages/pub-pkg-prism/css/**',
      'packages/pub-pkg-prism/example/**',
      'packages/pub-theme-doc/css/**',
      'packages/pub-theme-doc/templates/**',
    ],
  },
];
