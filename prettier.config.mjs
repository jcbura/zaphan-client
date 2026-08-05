/**
 * @type {import("prettier").Config}
 */
const config = {
  singleQuote: true,
  semi: true,
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
  tailwindFunctions: ['cva', 'cn', 'clsx'],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '5.7.3',
  importOrderCaseSensitive: false,
};

export default config;
