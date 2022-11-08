require('@bigcommerce/eslint-config/patch');

module.exports = {
  root: true,
  extends: ['@bigcommerce/eslint-config', 'next/core-web-vitals'],
  rules: {
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-unnecessary-condition': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@bigcommerce/jsx-short-circuit-conditionals': 'off',
  },
};
