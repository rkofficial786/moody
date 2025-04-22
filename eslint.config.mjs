import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disable specific warnings
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      
      // Optional: Additional customizations
      'no-console': 'off', // If you want to allow console logs
      'unused-imports/no-unused-imports': 'off',
      '@typescript-eslint/ban-ts-comment': [
        'warn', 
        {
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': 'allow-with-description',
          'ts-nocheck': 'allow-with-description',
          'minimumDescriptionLength': 3
        }
      ]
    },
    ignores: [
      // Optional: Add paths to ignore
      'node_modules/',
      '.next/',
      'dist/',
    ],
  },
];

export default eslintConfig;