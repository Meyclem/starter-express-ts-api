import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default tseslint.config(eslint.configs.recommended, ...tseslint.configs.recommended, {
  rules: {
    "@typescript-eslint/explicit-function-return-type": 1,
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
      },
    ],
  },
  ...eslintPluginPrettierRecommended,
});
