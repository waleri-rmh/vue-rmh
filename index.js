import 'es6-promise/auto'

const modules = require.context('./src/components/', true, /\.vue$/)

const rmhPlugin = {
  install (Vue) {
    modules.keys().forEach(key => {
      const module = modules(key).default
      Vue.component(module.name, module)
    })
  }
}

export default rmhPlugin