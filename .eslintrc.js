// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  env: {
    node: true
  },
  extends: [
    `eslint:recommended`,
    `plugin:node/recommended`,
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
  parser: `@typescript-eslint/parser`,
  plugins: [
    `json-format`,
    `security`,
    `disable`,
    `no-secrets`,
    `sonarjs`,
    `sort-keys-fix`,
    `import`,
    `@typescript-eslint`,
  ],
  processor: `disable/disable`,
  rules: {
    "node/no-missing-import": `off`,
    "node/no-unpublished-require": [`error`, {
      "allowModules": [
        `dotenv`
      ],
    }],
    "node/no-unsupported-features/es-syntax": [
      `error`,
      { ignores: [`modules`] },
    ],
    quotes: [
      `error`,
      `backtick`
    ],
    "security/detect-non-literal-require": `off`,
    semi: [
      `warn`,
      `never`
    ],
    "sort-keys": [`error`, `asc`, { "caseSensitive": true, "minKeys": 2, "natural": true }],
    "sort-keys-fix/sort-keys-fix": 2,
    "unicorn/filename-case": `off`,
    "unicorn/prefer-node-protocol": `off`
  }
}
