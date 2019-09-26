<template>
  <div class="page-content page--trackrecord">
    <p>
      Rate Rabbit is a new Internet-based mortgage lender offering one guaranteed and fixed-fee closing package that assures consumers protection from last minute changes in costs, and from bait and switch tactics often seen in the mortgage business.
    </p>
    <p>
      “Time and again we would hear horror stories from customers about predatory lenders who make money off consumer’s lack of knowledge or negotiation skills,” says Mansy. “I built a highly successful mortgage business by offering the best mortgage rates and straightforward deals.  Rate Rabbit is taking it to the next level and offering competitive rates, one low fixed-fee and the convenience of working with non-commissioned loan experts over the phone or online.  At Rate Rabbit, the consumer is protected from bait and switch tactics and aggressive loan officers motivated by high commissions. We don’t believe that a borrower’s rate and closing costs should be based on their negotiation skills.”
    </p>
    <p>
      Rate Rabbit combines all applicable closing and lender costs into one low, guaranteed fee every time, which the consumer knows up front. Rate Rabbit is committed to providing its customers with the best mortgage rates and the lowest closing fee in the industry.
    </p>
    <p>
      Rate Rabbit assures consumers protection from last minute changes in costs, and from unscrupulous sales tactics used by aggressive, commissioned sales people.   Loan applicants can choose to use the user-friendly Website to shop and compare with an instant quote, or to complete the entire loan process online. Rate Rabbit also provides one-on-one customer support by professional, non-commissioned loan consultants to assure a hassle-free loan every time.
    </p>
    <p>
      <nuxt-link to="/about/help" class="link-decorated">
        Help Guides
      </nuxt-link><br>
      <nuxt-link to="/about" class="link-decorated">
        About Rate Rabbit
      </nuxt-link>
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
      title: 'Our Track Record'
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: 'Our track record' }
      ]
    }
  }
}
</script>

<style>
</style>
