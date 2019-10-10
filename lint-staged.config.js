module.exports = {
  linters: {
    '**/*.{js,jsx}': [
      'eslint --fix',
      'git add'
    ]
  },
  ignore: [
    'docs/**/*.{js,jsx}',
    'public/**/*.{js,jsx}',
    'static/**/*.{js,jsx}',
    '**/dist/*.min.js'
  ]
};
