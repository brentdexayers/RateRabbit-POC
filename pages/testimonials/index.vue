<template>
  <div class="page-content page--testimonials">
    <blockquote
      v-for="(testimonial, index) in testimonials"
      :key="index"
      class="primary"
    >
      {{ testimonial.content }}
      <footer>
        {{ testimonial.citation }}
      </footer>
    </blockquote>
  </div>
</template>

<script>
import testimonials from '~/mixins/testimonials.js'

export default {
  layout: 'default',
  data () {
    return {
      testimonials,
      title: 'Testimonials'
    }
  },
  async fetch ({ store, params }) {
  },
  head () {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: 'Customer testimonials' }
      ]
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/variables.scss';

.page--testimonials {
  blockquote {
    margin-bottom: #{$spacer * 4};
  }
}
</style>
