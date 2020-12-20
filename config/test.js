'use strict';

const jest = require('jest');

process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';
process.env.NPCONFIG = 'dev';

process.on('unhandledRejection', (err) => { throw err; });

const argv = process.argv.slice(2);

// Watch unless on CI or in coverage mode
if (!process.env.CI && argv.indexOf('--coverage') < 0) {
  argv.push('--watch');
}

jest.run(argv);
