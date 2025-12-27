const typescriptParser = require("@typescript-eslint/parser");
const typescriptPlugin = require("@typescript-eslint/eslint-plugin");

module.exports = [
  {
    ignores: ["node_modules/**", "**/*.js", "dist/**"],
  },
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-require-imports": "off",
      "no-console": "error",
    },
  },
];
