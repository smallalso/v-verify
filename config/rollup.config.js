const path = require('path')
const replace = require('rollup-plugin-replace')
const buble = require('rollup-plugin-buble')
const nodeResolve = require('rollup-plugin-node-resolve')
const resolve = _path => path.resolve(__dirname, '../', _path)
const version = require('../package.json').version

function genConfig (opts) {
  const config = {
    input: 'src/index.js',
    output: {
      format: opts.format,
      name: 'v-verify',
      file: opts.file,
      banner: `/**
      * v-verify v${version}
      * (c) ${new Date().getFullYear()} joinyi
      * @license MIT
      */`
    },
    plugins: [
      replace({ __VERSION__: version }),
      nodeResolve(),
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
    file: resolve('dist/v-verify.min.js')
  },
  'unpack': {
    format: 'umd',
    file: resolve('dist/v-verify.js')
  }
}, genConfig)