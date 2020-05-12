<template>
  <div>
    <!--  Header  -->
    <div class="header uk-flex uk-flex-center uk-flex-middle">
      <div class="header-content uk-animation-fade">
        <h1>
          <a class="uk-link-text" href="/beer">Beers</a>
          <span uk-icon="icon: plus-circle; ratio: 2;" />
          <a class="uk-link-text" href="/footy">Footy</a>
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style src="assets/scss/pages/home.scss" lang="scss"></style>
