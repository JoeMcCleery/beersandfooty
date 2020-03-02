import Vue from 'vue'
import App from './App.vue'
import CMS from 'netlify-cms'

// Config
Vue.config.productionTip = false
CMS.registerPreviewTemplate('MyCMS', MyCMS)

// Render Vue App at #app
new Vue({
  render: h => h(App)
}).$mount('#app')
