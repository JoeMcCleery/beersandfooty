<template>
  <div>
    <h2 class="uk-text-center">Footy Page</h2>
    <div class="uk-container uk-flex uk-flex-center">
      <review />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footy',
  components: {
    Review: () => import('~/components/Review.vue')
  }
}
</script>

<style src="assets/scss/pages/footy.scss" lang="scss"></style>
