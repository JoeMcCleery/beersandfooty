import Vue from 'vue'
import CMS from 'netlify-cms'
import VueRouter from 'vue-router'
// Import Components for routing
import Website from './components/Website'
// Config
Vue.config.productionTip = false
// Now the registry is available via the CMS object.
CMS.registerPreviewTemplate('CMS', CMS)

// Define Routes
const routes = [
  { path: '/website', component: Website }
]

// Create Router
const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  router
}).$mount('#app')
