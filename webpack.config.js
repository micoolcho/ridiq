var path = require('path');

module.exports = {
  entry: './src/jsx/app.jsx',
  output: { path: path.resolve('./build/js'), filename: 'app.js' },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ],
  },
};