<template>
  <div
    class="search-loader"
  >
    <div class="search-loader__box">
      <video width="100%" autoplay preload="auto">
        <source src="~assets/RateRabbit_RunAnim_v1.webm" type="video/webm">
        <source src="~assets/RateRabbit_RunAnim_v1.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="scss">
@import '~/assets/css/variables.scss';
@import '~bootstrap/scss/mixins.scss';

.search-loader {
  background-color: rgba($black, .5);
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 99999;
  &__aspect-ratio {
    background-color: $black;
    height: 0;
    max-width: 600px;
    padding-top: 56.25%;
    position: relative;
    width: 100%;
  }
  &__box {
    height: auto;
    max-width: 600px;
    width: 100%;
  }
}
</style>
