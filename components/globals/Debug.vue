<template>
  <div class="debug">
  </div>
</template>

<script>
// import phone from '~/mixins/phoneNumber.js'

export default {
  props: {
    classes: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      phone
    }
  }
}
</script>

<style lang="scss">
.debug {
}
</style>
