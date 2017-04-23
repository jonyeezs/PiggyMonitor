var path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        // https://webpack.js.org/loaders/html-loader/
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {}
          }
        ]
      }
    ]
  }
};
