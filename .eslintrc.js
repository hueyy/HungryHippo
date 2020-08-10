module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    node: true
  },
  plugins: [
    `json-format`,
    `security`,
    `disable`,
    `no-secrets`,
    `sonarjs`,
    `sort-keys-fix`,
    `import`,
  ],
  processor: `disable/disable`,
  extends: [
    "eslint:recommended",
    "plugin:node/recommended",
    `plugin:@typescript-eslint/recommended`,
    `plugin:security/recommended`,
    `plugin:sonarjs/recommended`,
    `plugin:unicorn/recommended`,
    `plugin:import/errors`,
    `plugin:import/warnings`,
    `plugin:import/typescript`
  ],
  overrides: [
    {
      files: [`*.json`],
      settings: {
        "disable/plugins": [`no-secrets`],
      },
    },
  ],
  rules: {
    semi: [
      "warn",
      "never"
    ],
    quotes: [
      "error",
      "backtick"
    ],
    "node/no-unpublished-require": ["error", {
      "allowModules": [
        `dotenv`
      ],
    }],
    "sort-keys": ["error", "asc", { "caseSensitive": true, "natural": true, "minKeys": 2 }],
    "sort-keys-fix/sort-keys-fix": 2
  }
}
