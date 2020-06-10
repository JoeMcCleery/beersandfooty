<template>
  <div>
    <div class="content">
      <svg-background />
      <!--  Header  -->
      <div class="uk-height-medium uk-flex uk-flex-center uk-flex-middle">
        <h1 class="uk-text-center">About</h1>
      </div>
      <!--  Page Content Container  -->
      <section class="uk-section">
        <div class="uk-container uk-text-center">
          <p>
            This website is for beer and footy reviews.<br />
            Send any feedback to:
          </p>
          <a
            href="mailto:contact@beersandfooty.com?subject=Feedback"
            class="uk-button uk-button-secondary"
            >contact@beersandfooty.com</a
          >
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  components: {
    SvgBackground: () => import('~/components/SvgBackground.vue')
  }
}
</script>

<style src="assets/scss/pages/about.scss" lang="scss"></style>
