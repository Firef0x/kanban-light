const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const configBase = require('./webpack.base');
const pkgs = require('../package.json');

const { babelPresets, configWebpack } = configBase;

const versionHash = Buffer.from(pkgs.version)
  .toString('base64').replace(/[^a-z0-9]/gi, '').toLowerCase();
console.log(`Building with hash: ${versionHash}`);

configWebpack.mode = 'development';

configWebpack.output = {
  path: path.join(__dirname, '..', 'public'),
  chunkFilename: `build/js/[name].js?${versionHash}`,
  filename: 'build/js/[name].js'
};

configWebpack.module.rules.push(
  {
    test: /\.less$/,
    loader: [
      {
        loader: MiniCssExtractPlugin.loader
      },
      {
        loader: 'css-loader',
        options: {
          importLoaders: 2,
          sourceMap: false
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          config: {
            path: 'postcss.config.js'
          },
          sourceMap: false
        }
      },
      {
        loader: 'less-loader?relativeUrls'
      }
    ]
  },
  {
    test: /\.css$/,
    loader: [
      {
        loader: MiniCssExtractPlugin.loader
      },
      {
        loader: 'css-loader?relativeUrls',
        options: {
          importLoaders: 1,
          sourceMap: false
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          config: {
            path: 'postcss.config.js'
          },
          sourceMap: false
        }
      }
    ]
  },
  {
    test: /\.js$/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          presets: babelPresets,
          plugins: [
            '@babel/plugin-proposal-class-properties'
          ]
        }
      }
    ]
  },
  {
    test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.wav$|\.mp3$/,
    loader: 'file-loader',
    options: {
      publicPath: './',
      name: '[name].[ext]?[hash]'
    }
  },
  {
    test: /\.woff$|\.otf$|\.woff2$|\.ttf$|\.eot$/,
    loader: 'file-loader',
    options: {
      publicPath: './',
      name: 'fonts/[name].[ext]?[hash]'
    }
  }
);

configWebpack.plugins.push(
  new webpack.EnvironmentPlugin({
    NODE_ENV: 'production'
  }),
  new webpack.ExtendedAPIPlugin(),
  new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css'
  })
);

configWebpack.optimization.minimizer = [
  new UglifyJsPlugin(),
  new OptimizeCSSAssetsPlugin()
];

module.exports = configWebpack;
