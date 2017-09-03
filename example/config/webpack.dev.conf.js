const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf.js')
const museUiThemePath = path.join(
  __dirname,
  '../../',
  'node_modules',
  'muse-ui',
  'src/styles/themes/variables/green.less'
)

module.exports = merge(baseConfig, {
  devtool: 'inline-source-map',
  output: {
    path: path.join(__dirname, '__build__'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/'
  },
  entry: ['webpack-hot-middleware/client?reload=true', path.join(__dirname, '../main.js')],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
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
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
})