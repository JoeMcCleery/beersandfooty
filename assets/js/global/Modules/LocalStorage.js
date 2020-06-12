import Vue from 'vue'

Vue.prototype.$localStorageSet = function(key, val) {
  if (typeof window !== 'undefined') {
    // client-side-only code
    window.localStorage.setItem(key, JSON.stringify(val))
  }
  return val
}

Vue.prototype.$localStorageGet = function(key) {
  if (typeof window !== 'undefined') {
    // client-side-only code
    return JSON.parse(window.localStorage.getItem(key))
  }
  return null
}

Vue.prototype.$localStorageClear = function() {
  if (typeof window !== 'undefined') {
    // client-side-only code
    window.localStorage.clear()
  }
}
