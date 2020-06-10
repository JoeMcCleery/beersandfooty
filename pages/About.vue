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
        <div class="uk-container">
          <p>
            This website is for beer and footy reviews.<br />
            Send any feedback to
            <a
              href="mailto:contact@beersandfooty.com?subject=Feedback"
              class="uk-link-text"
              >contact@beersandfooty.com</a
            >
          </p>
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
