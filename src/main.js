import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'

// Import Components for routing
import Website from './components/Website'

// Config
Vue.config.productionTip = false
Vue.use(VueRouter)

// Define Routes
const routes = [
  { path: '/', component: Website },
  { path: '/beers', component: Website },
  { path: '/footy', component: Website }
]

// Create Router Instance
const router = new VueRouter({
  mode: 'history',
  routes
})

// Render App
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
