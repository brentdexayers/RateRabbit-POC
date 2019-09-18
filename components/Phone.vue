<template>
  <a href="tel: +1 (888) 395-0395" class="phone" :class="classes">
    {{ phone }}
  </a>
</template>

<script>
export default {
  props: {
    phone: {
      type: String,
      default: '(888) 395-0395'
    },
    classes: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
</style>
