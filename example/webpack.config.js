const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const museUiThemePath = path.join(
  __dirname,
  '../',
  'node_modules',
  'muse-ui',
  'src/styles/themes/variables/green.less'
)

module.exports = {
  devtool: 'inline-source-map',
  entry: ['webpack-hot-middleware/client?reload=true', path.join(__dirname, './main.js')],
  output: {
    path: path.join(__dirname, '__build__'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /muse-ui.src.*?js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            less: [
              'vue-style-loader',
              'css-loader',
              {
                loader: 'less-loader',
                options: {
                  globalVars: {
                    'museUiTheme': `'${museUiThemePath}'`
                  }
                }
              }
            ]
          }
        }
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', {
          loader: "less-loader", 
          options: {
            globalVars: {
              'museUiTheme': `'${museUiThemePath}'`
            }
          }
        }]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      },
      {
        test: /\.md$/,
        use: [{
          loader: 'html-loader'
        }, {
          loader: 'markdown-loader',
          options: {
            highlight: function (code) {
              return require('highlight.js').highlightAuto(code).value
            }
          }
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.md'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'v-verify': path.join(__dirname, '../src/index.js'),
      'muse-components': 'muse-ui/src',
      '@': path.join(__dirname, '../example'),
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'vv-alidate examples',
      template: path.join(__dirname, './index.html'),
      inject: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: JSON.stringify('production')
    //   }
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}