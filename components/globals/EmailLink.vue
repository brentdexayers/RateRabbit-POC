<template>
  <a :href="email | emaillink" class="email__link" :class="classes">
    {{ email }}
  </a>
</template>

<script>
export default {
  props: {
    classes: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default () {
        return 'info@raterabbit.com'
      }
    }
  }
}
</script>

<style lang="scss">
.email__link {
  white-space: nowrap;
}
</style>
