const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const babelPresets = [
  ['@babel/env', {
    targets: {
      browsers: [
        'last 2 versions',
        'not ie <= 8',
        'not op_mini all'
      ],
      node: 'current'
    }
  }],
  '@babel/react'
];

const configWebpack = {
  entry: {
    app: [
      './src/client/App.js'
    ]
  },
  output: {
    path: path.join(__dirname, '..', 'public'),
    filename: 'js/[name].[hash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: [
      '.js',
      '.css',
      '.json'
    ],
    enforceExtension: false,
    modules: [
      path.resolve('./node_modules')
    ]
  },
  module: {
    rules: []
  },
  optimization: {
    splitChunks: {
      name: 'vendor'
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      title: 'Kanban Light',
      template: path.join(__dirname, '..', 'src', 'client', 'index.tpl.html'),
      filename: './index.html',
      chunks: ['manifest', 'vendor', 'app']
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map'
    })
  ]
};

const configBase = {
  babelPresets,
  configWebpack
};

module.exports = configBase;
