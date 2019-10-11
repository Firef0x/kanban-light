const micromatch = require('micromatch');

const ignoreFiles = [
  'docs/**/*.{js,jsx}',
  'public/**/*.{js,jsx}',
  'static/**/*.{js,jsx}',
  '**/dist/*.min.js'
];

module.exports = {
  '**/*.{js,jsx}': (files) => {
    const match = micromatch.not(files, ignoreFiles);
    return match.map(file => `eslint --fix ${file}`);
  }
};
