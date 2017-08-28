const fs = require('fs')
const rollup = require('rollup')
const configs = require('./rollup.config.js')
const uglify = require('uglify-js')

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist')
}

function buildEntry (builds) {
  let count = 0
  const total = builds.length
  const next = () => {
    build(builds[count])
    .then(() => {
      count++
      if (count < total) {
        next()
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  next()
}

function build (config) {
  return rollup.rollup(config)
  .then(bundle => {
    return generate(config, bundle)
  })
}

function generate (config, bundle) {
  return bundle.generate(config.output)
  .then(gen => {
    return write(config, gen.code)
  })
}

function write (config, code) {
  return new Promise((resolve, reject) => {
    const isProd = /min\.js$/.test(config.output.file)
    if (isProd) {
      code = uglify.minify(code, {
        mangle: true,
        compress: true
      }).code
    }
    fs.writeFile(config.output.file, code, (err) => {
      if (err) {
        return reject(err)
      }
      reject()
    })
  })
}

buildEntry(Object.keys(configs).map(key => configs[key]))
