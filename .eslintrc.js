module.exports = {
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:jsx-a11y/recommended'
  ],
  parser: 'babel-eslint',
  env: {
    browser: true,
    commonjs: true,
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
    'react/destructuring-assignment': 'off',
    'react/forbid-prop-types': 'warn',
    'react/jsx-closing-bracket-location': ['warn', 'tag-aligned'],
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
    'react/jsx-indent': ['warn', 2],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-no-target-blank': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/no-array-index-key': 'off',
    'react/no-children-prop': 'off',
    'react/no-set-state': 'off',
    'react/require-default-props': 'off'
  }
};
