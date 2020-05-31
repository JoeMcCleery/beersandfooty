import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'

UIkit.use(Icons)
UIkit.container = '#__nuxt'

window.hideModal = function(element) {
  UIkit.modal(element).hide()
}

window.showModal = function(element) {
  UIkit.modal(element).show()
}
