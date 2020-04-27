<template>
  <div>
    <div class="header uk-height-large uk-flex uk-flex-center uk-flex-middle">
      <h1 class="uk-text-center">Beer Page</h1>
    </div>
    <div class="uk-container uk-section uk-flex uk-flex-center">
      <review />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Beer',
  components: {
    Review: () => import('~/components/Review.vue')
  }
}
</script>

<style src="assets/scss/pages/beer.scss" lang="scss"></style>
