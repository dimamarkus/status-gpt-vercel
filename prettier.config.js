module.exports = {
  printWidth: 100,
  arrowParens: "always",
  semi: true,
  trailingComma: "all",
  singleQuote: false,
  jsxSingleQuote: false,
  bracketSpacing: true,
  // pnpm doesn't support plugin autoloading
  // https://github.com/tailwindlabs/prettier-plugin-tailwindcss#installation
  plugins: [require("prettier-plugin-tailwindcss")],
};
