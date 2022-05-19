const rules = require('./webpack.rules');
const webpack = require('webpack');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const assets = [ 'model' ]; // folder exposed by static:// scheme

const copyPlugin = new CopyWebpackPlugin(
  {
    patterns: assets.map(asset => ({
      from: path.resolve(__dirname, 'src', asset),
      to: path.resolve(__dirname, '.webpack/renderer', asset)
    }))
  }
);

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

new webpack.DefinePlugin({
  __VUE_OPTIONS_API__: true,
  __VUE_PROD_DEVTOOLS__: false
})

module.exports = {
  resolve: {
    alias: {
      'vue': '@vue/runtime-dom',
      'vue': 'vue/dist/vue.esm-bundler',
      '@': path.join(__dirname, 'src')
    }
  },
  // Put your normal webpack config below here
  module: {
    rules,
  },
  plugins: [
    new webpack.DefinePlugin({
        "__VUE_OPTIONS_API__": true,
        "__VUE_PROD_DEVTOOLS__": false,
    }),
    new VueLoaderPlugin(),
    copyPlugin,
  ],
  devtool: 'source-map',
};
