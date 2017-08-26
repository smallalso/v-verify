const rollup = require('rollup')
const config = require('./rollup.config.js')

function build () {
  rollup.rollup(config)
  .then(bundle => {
    write(bundle)
  })
}

function write (bundle) {
  bundle.write(config.output)
  .then(res => {
    console.log(res, '...ok')
  })
}

build()
