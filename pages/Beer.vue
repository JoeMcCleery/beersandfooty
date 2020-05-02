<template>
  <div>
    <!--  Header  -->
    <div class="header uk-height-medium uk-flex uk-flex-center uk-flex-middle">
      <h1 class="uk-text-center">Beer</h1>
    </div>
    <!--  Content Container  -->
    <section class="uk-section">
      <div class="uk-container">
        <!--  Masonry Grid  -->
        <div
          class="uk-child-width-1-2@s uk-child-width-1-3@m"
          uk-grid="masonry: true"
        >
          <div>
            <div
              class="uk-card uk-card-default uk-flex uk-flex-center uk-flex-middle"
              style="height: 100px"
            >
              Item
            </div>
          </div>
          <div>
            <div
              class="uk-card uk-card-default uk-flex uk-flex-center uk-flex-middle"
              style="height: 130px"
            >
              Item
            </div>
          </div>
          <div>
            <div
              class="uk-card uk-card-default uk-flex uk-flex-center uk-flex-middle"
              style="height: 150px"
            >
              Item
            </div>
          </div>
          <div>
            <div
              class="uk-card uk-card-default uk-flex uk-flex-center uk-flex-middle"
              style="height: 160px"
            >
              Item
            </div>
          </div>
          <div>
            <div
              class="uk-card uk-card-default uk-flex uk-flex-center uk-flex-middle"
              style="height: 120px"
            >
              Item
            </div>
          </div>
          <div>
            <div
              class="uk-card uk-card-default uk-flex uk-flex-center uk-flex-middle"
              style="height: 140px"
            >
              Item
            </div>
          </div>
          <div>
            <div
              class="uk-card uk-card-default uk-flex uk-flex-center uk-flex-middle"
              style="height: 200px"
            >
              Item
            </div>
          </div>
          <div>
            <div
              class="uk-card uk-card-default uk-flex uk-flex-center uk-flex-middle"
              style="height: 180px"
            >
              Item
            </div>
          </div>
          <div>
            <div
              class="uk-card uk-card-default uk-flex uk-flex-center uk-flex-middle"
              style="height: 140px"
            >
              Item
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Beer'
}
</script>

<style src="assets/scss/pages/beer.scss" lang="scss"></style>
