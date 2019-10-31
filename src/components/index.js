import VHeader from 'components/v-header/v-header'
import VInput from 'components/v-input/v-input'
import VPopup from 'components/v-popup/v-popup'

const components = {
  VHeader,
  VInput,
  VPopup
}

const install = Vue => {
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key])
  })
}

export default {
  install
}
