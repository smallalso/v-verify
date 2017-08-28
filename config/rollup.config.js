const path = require('path')
const replace = require('rollup-plugin-replace')
const buble = require('rollup-plugin-buble')
const resolve = _path => path.resolve(__dirname, '../', _path)
const version = require('../package.json').version

function genConfig (opts) {
  const config = {
    input: 'src/index.js',
    output: {
      format: opts.format,
      name: 'vv-alidate',
      file: opts.file,
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
  
  return config
}

function mapValues (obj, fn) {
  const res = {}
  Object.keys(obj).forEach(key => {
    res[key] = fn(obj[key], key)
  })
  return res
}

module.exports = mapValues({
  'min': {
    format: 'umd',
    file: resolve('dist/vv-alidate.min.js')
  },
  'unpack': {
    format: 'umd',
    file: resolve('dist/vv-alidate.js')
  }
}, genConfig)