const webpack = require('webpack');
const path = require('path');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  // bundling mode
  mode: 'production',

  // compile for usage in a Node.js-like environment
  target: 'node',

  // entry files
  entry: './src/index.ts',

  // output bundles (location)
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
  },

  // file resolutions
  resolve: {
    extensions: ['.ts', '.js'],
  },

  // loaders
  module: {
    rules: [
      {
        test: /\.tsx?/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new webpack.BannerPlugin({
      banner: '#!/usr/bin/env node',
      raw: true,
    }),
    new BundleAnalyzerPlugin(),
  ],
};
