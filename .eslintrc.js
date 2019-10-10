module.exports = {
  extends: ['airbnb', 'react-app'],
  plugins: ['import', 'react'],
  settings: {
    'import/resolver': {
      webpack: { config: './internals/webpack/resolvers.babel.js' }
    }
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true
  },
  rules: {
    'comma-dangle': 'off',
    'consistent-return': 'warn',
    'eol-last': 'off',
    'import/named': 'warn',
    'import/no-extraneous-dependencies': 'off',
    indent: [
      'error',
      2,
      {
        SwitchCase: 1
      }
    ],
    'linebreak-style': 'off',
    'max-len': ['error', 90],
    'no-console': 'off',
    'no-debugger': 'off',
    'no-lone-blocks': 'off',
    'no-underscore-dangle': 'off',
    'react/forbid-prop-types': 'warn',
    'react/jsx-closing-bracket-location': ['warn', 'tag-aligned'],
    'react/jsx-filename-extension': 'off',
    'react/jsx-indent': ['warn', 2],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-no-target-blank': 'off',
    'react/no-array-index-key': 'off',
    'react/no-children-prop': 'off',
    'react/no-set-state': 'off',
    'react/require-default-props': 'off'
  }
};
