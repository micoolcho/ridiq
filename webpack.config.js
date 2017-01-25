var path = require('path');

var webpack = require('webpack')

module.exports = {
  entry: './src/jsx/app.jsx',
  output: { path: path.resolve('../yam/vendor/assets/stylesheets/share_page/js'), filename: 'app.js' },
  // output: { path: path.resolve('./build/js'), filename: 'app.js' },
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

  plugins: [
    new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }
    }),
  ]
};
