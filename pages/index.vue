<template>
  <article class="page-content article--home">
    <Hero />
    <OurPromise />
    <Testimonials />
    <ContactMeCTA />
  </article>
</template>

<script>
import Hero from '~/components/pages/home/Hero.vue'
import OurPromise from '~/components/pages/home/OurPromise.vue'
import Testimonials from '~/components/pages/home/Testimonials.vue'
import ContactMeCTA from '~/components/pages/home/ContactMeCTA.vue'

export default {
  layout: 'home',
  components: {
    Hero,
    OurPromise,
    Testimonials,
    ContactMeCTA
  }
}
</script>

<style>
</style>
