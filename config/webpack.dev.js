const webpack = require('webpack');

const configBase = require('./webpack.base');

const { babelPresets, configWebpack } = configBase;

configWebpack.entry.app.push(
  'react-hot-loader/patch',
  'webpack-hot-middleware/client'
);

configWebpack.mode = 'development';

configWebpack.module.rules.push(
  {
    test: /\.less$/,
    loader: [
      {
        loader: 'style-loader'
      },
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          sourceMap: true
        }
      },
      {
        loader: 'less-loader'
      }
    ]
  },
  {
    test: /\.css$/,
    loader: [
      {
        loader: 'style-loader'
      },
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          config: {
            path: 'postcss.config.js'
          }
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
      name: '[name].[ext]?[hash]'
    }
  },
  {
    test: /\.woff$|\.otf$|\.woff2$|\.ttf$|\.eot$/,
    loader: 'file-loader',
    options: {
      useRelativePath: false,
      name: 'fonts/[name].[ext]?[hash]'
    }
  }
);

configWebpack.plugins.push(
  new webpack.EnvironmentPlugin({
    NODE_ENV: 'development'
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
);

module.exports = configWebpack;
