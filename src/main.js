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

// scrollBehavior:
// - only available in html5 history mode
// - defaults to no scroll behavior
// - return false to prevent scroll
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition
  } else {
    const position = {}
    // new navigation.
    // scroll to anchor by returning the selector
    if (to.hash) {
      position.selector = to.hash

      // specify offset of the element
      if (to.hash === '#anchor2') {
        position.offset = { y: 100 }
      }
    }
    // check if any matched route config has meta that requires scrolling to top
    if (to.matched.some(m => m.meta.scrollToTop)) {
      // cords will be used if no selector is provided,
      // or if the selector didn't match any element.
      position.x = 0
      position.y = 0
    }
    // if the returned position is falsy or an empty object,
    // will retain current scroll position.
    return position
  }
}

// Create Router Instance
const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior
})

// Render App
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
