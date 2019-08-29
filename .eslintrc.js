module.exports = {
  env: {
    node: true
  },
  plugins: [
    "sort-keys-fix"
  ],
  extends: [
    "eslint:recommended",
    "plugin:node/recommended"
  ],
  rules: {
    semi: [
      "error",
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
