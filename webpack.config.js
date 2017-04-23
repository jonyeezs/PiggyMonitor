var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: '#source-map',
  plugins: [
    // generate html landing page
    new HtmlWebpackPlugin({
      template: 'index.ejs',
      title: 'piggyMonitor'
    })
  ],
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
      },
      {
        // https://github.com/dmachat/angular-webpack-cookbook/wiki/Loading-CSS
        // https://webpack.js.org/loaders/css-loader/ & https://webpack.js.org/loaders/style-loader/
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
        // https://webpack.js.org/loaders/less-loader/
        test: /\.less$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
          }, {
            loader: "css-loader" // translates CSS into CommonJS
          }, {
            loader: "less-loader" // compiles Less to CSS
        }]
      },
      {
        // https://shellmonger.com/2016/01/22/working-with-fonts-with-webpack/
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      }
    ]
  }
};
