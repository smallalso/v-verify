const webpack = require('webpack')
const path =require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf.js')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const museUiThemePath = path.join(
  __dirname,
  '../../',
  'node_modules',
  'muse-ui',
  'src/styles/themes/variables/green.less'
)

module.exports = merge(baseConfig, {
  devtool: '#source-map',
  entry: path.join(__dirname, '../main.js'),
  output: {
    path: path.resolve(__dirname, '../../docs'),
    filename: 'js/[name].js',
    chunkFilename: 'js/[id].chunk.js',
    publicPath: '/v-verify/'
  },
  devtool: '#source-map',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      },
      {
        test: /\.scss$/i,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.less$/i,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', {
            loader: "less-loader", 
            options: {
              globalVars: {
                'museUiTheme': `'${museUiThemePath}'`
              }
            }
          }]
        })
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['docs']),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
      },
      sourceMap: true
    }),
    new ExtractTextPlugin({
      filename: "css/style.css"
    })
  ]
})