import Vue from 'vue'
import App from './App.vue'
import CMS from 'netlify-cms'

// Config
Vue.config.productionTip = false
// Now the registry is available via the CMS object.
CMS.registerPreviewTemplate('App', App)

// Render Vue App at #app
new Vue({
  render: h => h(App)
}).$mount('#app')
