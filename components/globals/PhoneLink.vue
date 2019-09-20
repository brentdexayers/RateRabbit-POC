<template>
  <a :href="phone.number | phonelink" class="phone__link" :class="classes">
    {{ phone.number | phone }}
  </a>
</template>

<script>
import phone from '~/mixins/phoneNumber.js'

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
.phone__link {
  white-space: nowrap;
}
</style>
