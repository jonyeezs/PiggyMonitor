var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = function(env) {
  var srcDir = path.resolve(__dirname, 'src');
  var distDir = path.resolve(__dirname, 'dist');
  if (!env) { env = { production: false }; }
  return {
    context: srcDir,
    entry: './app/index.js',
    output: {
      filename: 'bundle.js',
      path: distDir
    },
    // exit on first sight of error during build
    bail: true,
    // https://webpack.js.org/configuration/performance/
    performance: env.production ? false : {
      hints: "warning"
    },
    // hidden-source-map for stack traces during production | eval-source-map for original source with some good speed
    devtool: env.production ? 'hidden-source-map' : 'eval',
    devServer: env.production ? {} : {
      contentBase: distDir,
      compress: true,
      port: 8080,
      // https://webpack.js.org/configuration/stats/
      stats: {
        chunks: true,
        colors: true,
        errors: true,
        performance: true,
        warnings: true,
        reasons: true,
        usedExports: true,
      },
      overlay: {
        warnings: false,
        errors: true
      }
    },
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
  }
};
