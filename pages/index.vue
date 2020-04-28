<template>
  <div>
    <!--  Header  -->
    <div class="header uk-height-medium uk-flex uk-flex-center uk-flex-middle">
      <h1>
        Beers and Footy
      </h1>
    </div>
    <!--  Page Content Container  -->
    <section class="uk-section">
      <div class="uk-container">
        <!--  CTA  -->
        <div class="uk-child-width-1-2 uk-text-center" uk-grid>
          <div>
            <a class="uk-button uk-button-default" href="/beer">Beer</a>
          </div>
          <div>
            <a class="uk-button uk-button-default" href="/footy">Footy</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style src="assets/scss/pages/home.scss" lang="scss"></style>
