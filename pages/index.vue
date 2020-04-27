<template>
  <div class="uk-text-center">
    <h1>Beers and Footy</h1>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  head() {
    return {
      title: process.env.SITE_TITLE + ' - Home'
    }
  }
}
</script>
