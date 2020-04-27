<template>
  <div class="uk-text-center">
    <h1>Beer Reviews</h1>
  </div>
</template>

<script>
export default {
  name: 'Beer',
  head() {
    return {
      title: process.env.SITE_TITLE + ' - Beer Reviews'
    }
  }
}
</script>
