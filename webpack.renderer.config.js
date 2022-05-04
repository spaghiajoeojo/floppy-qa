const rules = require('./webpack.rules');
const webpack = require('webpack');
const path = require('path');

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
  ],
};
