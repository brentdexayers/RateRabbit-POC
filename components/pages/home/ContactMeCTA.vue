<template>
  <section id="contactMeCTA">
    <div class="container">
      <div class="row">
        <div class="col-8">
          <h2>
            Have a Loan Officer Contact Me
          </h2>
          <p>
            Rate Rabbit is committed to providing its customers with the best mortgage rates and the lowest closing fee, combining all applicable closing & lender costs into one low, guaranteed fee.
          </p>
        </div>
        <div class="col-4 text-center">
          <nuxt-link to="connect" class="btn btn-primary">
            Connect Today
          </nuxt-link>
          <p class="text-primary">
            or Call <Phone />
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Phone from '~/components/Phone.vue'

export default {
  components: {
    Phone
  }
}
</script>

<style lang="scss">
@import '@/assets/css/variables.scss';

#contactMeCTA {
  background-color: #ffffff;
  padding-bottom: 164px;
  padding-top: 150px;
}
</style>
