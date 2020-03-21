import Vue from 'vue'
import CMS from 'netlify-cms'
import App from './App'
import VueRouter from 'vue-router'
// Import Components for routing
import Website from './components/Website'

// Config
Vue.use(VueRouter)
Vue.config.productionTip = false
CMS.registerPreviewTemplate('App', App)

// Define Routes
const routes = [
  { path: '/', component: Website }
]

// Create Router
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: routes
})

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
