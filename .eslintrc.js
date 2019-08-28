module.exports = {
  env: {
    node: true
  },
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
    }]
  }
}
