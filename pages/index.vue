<template>
  <div class="page-content page--home">
    <Hero />
    <OurPromise />
    <Testimonials />
    <ContactMeCTA />
  </div>
</template>

<script>
import Hero from '~/components/pages/home/Hero.vue'
import OurPromise from '~/components/pages/home/OurPromise.vue'
import Testimonials from '~/components/pages/home/Testimonials.vue'
import ContactMeCTA from '~/components/pages/home/ContactMeCTA.vue'

export default {
  layout: 'home',
  head () {
    return {
      title: 'Home',
      titleTemplate: 'Rate Rabbit / Real Rates, Real Time'
    }
  },
  components: {
    Hero,
    OurPromise,
    Testimonials,
    ContactMeCTA
  },
  async fetch ({ store, params }) {
  }
}
</script>

<style>
</style>
