<template>
  <div>
    <div class="content">
      <svg-background />
      <!--  Header  -->
      <div class="header uk-flex uk-flex-center uk-flex-middle">
        <div class="header-content">
          <h1>
            <nuxt-link class="uk-link-text" to="/beer">Beers</nuxt-link>
            <span uk-icon="icon: plus-circle; ratio: 2;" />
            <nuxt-link class="uk-link-text" to="/footy">Footy</nuxt-link>
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
    SvgBackground: () => import('~/components/SvgBackground.vue')
  }
}
</script>

<style src="assets/scss/pages/home.scss" lang="scss"></style>
