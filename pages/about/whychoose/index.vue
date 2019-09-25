<template>
  <div class="page-content">
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo autem quia qui optio molestiae aperiam quae ipsam, voluptatibus itaque, numquam ad dolorum, quos maiores corporis consequuntur ex recusandae tempore ducimus!
    </p>
  </div>
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
      title: 'Why Choose RateRabbit'
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: 'Why choose RateRabbit' }
      ]
    }
  }
}
</script>

<style>
</style>
