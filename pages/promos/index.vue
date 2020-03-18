<template>
  <article class="page-content">
    <p>
      The Rate Rabbit promo code is a unique code that can be used to reduce the closing cost fee. Rate Rabbit will create a unique code for each institution or company. We should also mention that if anyone is interested in our promotional campaign, whether it's companies want to participate in the program, or individual clients, they should feel free to email us. Codes vary depending on the institution or company. It could consist of letters, numbers, or a combination of both.
    </p>
  </article>
</template>

<script>
// import Logo from '~/components/Logo.vue'

export default {
  layout: 'default',
  components: {
    // Logo
  },
  data () {
    return {
      title: 'Promos'
    }
  },
  async fetch ({ store, params }) {
    await store.dispatch('AUTHENTICATE')
  },
  head () {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: 'Promotional codes' }
      ]
    }
  }
}
</script>

<style>
</style>
