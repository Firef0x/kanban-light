module.exports = {
  collectCoverageFrom: [
    '<rootDir>/client-react/components/**/*.{js,jsx}',
    '!**/*.spec.{js,jsx}',
    '!**/*.test.{js,jsx}'
  ],
  coverageDirectory: '<rootDir>/coverage/',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/stories/',
    '.*\\.config\\.js',
    '.*\\.setup\\.js'
  ],
  testMatch: [
    '<rootDir>/client-react/components/**/?(*.)(test|spec).js?(x)',
    '<rootDir>/client-react/components/**/__tests__/**/*.js?(x)'
  ],
  testEnvironment: 'node',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(jpe?g|gif|png|svg|ttf|eot|otf|woff|woff2)$': '<rootDir>/__mocks__fileMock.js'
  },
  moduleFileExtensions: [
    'web.js',
    'js',
    'json',
    'web.jsx',
    'jsx'
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testPathIgnorePatterns: [
    '<rootDir>/build/',
    '<rootDir>/config/',
    '<rootDir>/coverage/',
    '<rootDir>/docs/',
    '<rootDir>/node_modules/'
  ],
  testResultsProcessor: './node_modules/jest-html-reporter',
  unmockedModulePathPatterns: [
    'react',
    'enzyme',
    'jest-enzyme'
  ],
  verbose: true
};
