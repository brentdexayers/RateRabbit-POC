<template>
  <button
    class="scroll-to-next-section"
    :class="classes"
    @click="scrollToNext"
  >
    <img src="~assets/icons/icon-chevron-down-sm.png" alt="Continue..." class="icon scroll-to-next-section__icon">
  </button>
</template>

<script>
import scrollToNextMixin from '~/mixins/scrollToNextMixin.js'

export default {
  mixins: [scrollToNextMixin],
  props: {
    classes: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.scroll-to-next-section {
  background-color: #ffffff;
  border: 0;
  border-radius: 100%;
  bottom: -60px;
  color: #009646;
  cursor: pointer;
  display: block;
  height: 93px;
  left: 50%;
  margin-left: -46.5px;
  padding: 0;
  position: absolute;
  width: 93px;
  &__icon {
    display: block;
    height: 11px;
    margin: auto;
    max-width: 100%;
    position: absolute;
    left: 50%;
    margin-left: -8.5px;
    top: 18px;
    width: auto;
  }
}

</style>
