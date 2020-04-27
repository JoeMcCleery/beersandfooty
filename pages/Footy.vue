<template>
  <div>
    <div class="header uk-height-large uk-flex uk-flex-center uk-flex-middle">
      <h1 class="uk-text-center">Footy Page</h1>
    </div>
    <div class="uk-container uk-section uk-flex uk-flex-center">
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
