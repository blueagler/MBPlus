const path = require('path');
const resolve = dir => path.resolve(__dirname, dir);
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: 8,
          toplevel: false,
          ie8: false,
          keep_classnames: false,
          keep_fnames: false,
          safari10: false,
          compress: {
            drop_console: false,
            drop_debugger: true
          }
        },
        parallel: true
      })
    ],
  },
  plugins: [],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'build.js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  resolve: {
    // 设置别名
    alias: {
      '@': resolve('src'),
      '^': resolve('src/function'),
      '%': resolve('src/styles'),
      '&': resolve('src/component')
    }
  }
}