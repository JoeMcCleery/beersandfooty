export default function(context) {
  // Update page name in store on changing page
  // allow timeout for previous page to transition out
  setTimeout(function() {
    context.store.commit(
      'UPDATE_PAGE',
      context.route.name === 'index' ? 'Home' : context.route.name
    )
  }, 500)
}
