<template>
<div class="background">
    <div class="backgroundVideo uk-position-center">
    </div>
</div>
</template>

<script>
export default {
  name: 'BackgroundVideo',
  props: {
    vimeoID: String
  }
}
</script>

<style lang="scss" scoped>
.background {
    height: 100vh;
    width: 100vw;
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    .backgroundVideo {
        background-color: rgba(0,0,0,0.01);
    }
}
</style>
