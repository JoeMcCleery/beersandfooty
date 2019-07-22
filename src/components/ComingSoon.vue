<template>
  <div class="coming-soon uk-container">
    <h1>{{ msg }}</h1>
    <p>
      The website is still in development, please come back soon!
    </p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>
