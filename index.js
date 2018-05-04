import 'es6-promise/auto'

import rmhField from './src/components/rmh-field/rmh-field.vue'
import rmhSelect from './src/components/rmh-select/rmh-select.vue'
import rmhOption from './src/components/rmh-option/rmh-option.vue'
import rmhTextbox from './src/components/rmh-textbox/rmh-textbox.vue'
import rmhButton from './src/components/rmh-button/rmh-button.vue'
import rmhIcon from './src/components/rmh-icon/rmh-icon.vue'

const rmhPlugin = {
  install (Vue, options) {
    Vue.component(rmhField.name, rmhField),
    Vue.component(rmhSelect.name, rmhSelect),
    Vue.component(rmhOption.name, rmhOption),
    Vue.component(rmhTextbox.name, rmhTextbox),
    Vue.component(rmhButton.name, rmhButton),
    Vue.component(rmhIcon.name, rmhIcon)
  }
}

export default rmhPlugin