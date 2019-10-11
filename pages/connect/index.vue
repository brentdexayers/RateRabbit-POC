<template>
  <article class="page-content">
    <p class="page-content__intro">
      Have a question or concern? We are here to help.
    </p>
    <Form />
  </article>
</template>

<script>
import Form from '~/components/forms/ConnectForm.vue'

export default {
  layout: 'default',
  components: {
    Form
  },
  data () {
    return {
      title: 'Connect With a Loan Consultant'
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: 'Connect with a RateRabbit loan consultant' }
      ]
    }
  }
}
</script>

<style lang="scss">
.page-content {
  &__intro {
    margin-bottom: 55px;
  }
}
</style>
