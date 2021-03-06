import 'es6-promise/auto'

const validator = require('./src/functional/rmh-validator.js')
const modules = require.context('./src/components', true, /\.vue$/)

export default {
  install (Vue) {
    Vue.mixin(validator.default)
    modules.keys().forEach(key => {
      const module = modules(key).default
      Vue.component(module.name, module)
    })
  }
}

