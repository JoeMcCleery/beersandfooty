<template>
  <div>
    <h2 class="uk-text-center">Beer Page</h2>
    <div class="uk-container uk-flex uk-flex-center">
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
