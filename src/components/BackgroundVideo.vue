<template>
<div class="background">
    <div class="backgroundVideo uk-position-center">
        &nbsp;
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
    height: 100%;
    width: 100%;
    z-index: -1000;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    .backgroundVideo {
        width: 100%;
        height: 100%;
    }
}
</style>
