const path = require('path')
const replace = require('rollup-plugin-replace')
const buble = require('rollup-plugin-buble')
const resolve = _path => path.resolve(__dirname, '../', _path)
const version = require('../package.json').version

module.exports = {
  input: 'src/index.js',
  output: {
    format: 'cjs',
    file: resolve('dist/vv-alidate.js'),
    banner: `/**
    * vv-alidate v${version}
    * (c) ${new Date().getFullYear()} joinyi
    * @license MIT
    */`
  },
  plugins: [
    replace({ __VERSION__: version }),
    buble()
  ]
}