<template>
  <a :href="phoneNumber | phonelink" class="phone__link" :class="classes">
    {{ phoneNumber | phone }}
  </a>
</template>

<script>
import phone from '~/mixins/phoneNumber.js'

export default {
  props: {
    classes: {
      type: String,
      default: ''
    },
    phoneNumber: {
      type: String,
      default () {
        return phone.number.tollFree
      }
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
