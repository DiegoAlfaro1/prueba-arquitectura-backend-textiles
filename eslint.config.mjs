import js from "@eslint/js";
import globals from "globals";

export default [
  { ignores: ["dist", "node_modules"] },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.node, // Set Node.js globals
      parserOptions: {
        ecmaFeatures: { jsx: false },
        sourceType: "module",
      },
    },
    rules: {
      ...js.configs.recommended.rules,

      // ESLint Rules for Backend
      "object-shorthand": "error",
      "no-new-object": "error",
      "default-param-last": "error",
      "no-new-func": "error",
      "function-paren-newline": ["error", "consistent"],
      "no-duplicate-imports": "error",
      "object-curly-newline": ["error", { consistent: true }],
      "no-undef": "error",
      "prefer-const": "error",
      "one-var": ["error", "never"],
      "no-multi-assign": "error",
      "no-plusplus": "error",
      "operator-linebreak": ["error", "before"],
      "new-cap": [
        "error",
        {
          newIsCap: true, // Enforce capitalization for constructors
          capIsNew: false, // Allow capitalized functions that aren't constructors
          capIsNewExceptions: ["Router"], // Allow express.Router() without error
          properties: false,
        },
      ],
      camelcase: [
        "error",
        {
          properties: "never", // Ignore object properties
          allow: ["exec_mode"], // Allow specific exceptions
        },
      ],
      "id-length": ["error", { min: 2 }],
      "nonblock-statement-body-position": ["error", "beside"],
      "brace-style": ["error", "1tbs", { allowSingleLine: true }],
      "no-iterator": "error",
      "no-restricted-syntax": "error",
      "prefer-arrow-callback": "error",
      "arrow-spacing": "error",
      "no-array-constructor": "error",
      "template-curly-spacing": ["error", "never"],
      "prefer-template": "error",
      "no-eval": "error",
      "no-useless-constructor": "error",
      "no-dupe-class-members": "error",
      "class-methods-use-this": "error",
      "dot-notation": "error",
      "prefer-exponentiation-operator": "error",
    },
  },
];
