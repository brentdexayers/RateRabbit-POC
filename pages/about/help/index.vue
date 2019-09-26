<template>
  <div class="page-content page--help">
    <p>
      The loan process can sometimes be overwhelming and confusing. We believe the best way to ensure you're getting the best loan or refinance program for you, is to get educated and stay informed. Below you will find useful links to the loan process and to some helpful articles.
    </p>
    <h2>
      Loan Process
    </h2>
    <p>
      Rate Rabbit takes you through the process of obtaining a home loan or refinance, step by step. If you don't find the information here, call one of our non-commissioned loan consultants.
    </p>
    <p>
      <nuxt-link to="/loanprocess/purchase" class="link-decorated">
        Loan Process for Home Purchases
      </nuxt-link>
      <nuxt-link to="/loanprocess/refinance" class="link-decorated">
        Loan Process for Refinancing
      </nuxt-link>
    </p>
    <h2>
      Helpful Articles
    </h2>
    <p>
      We've compiled some useful articles and tips written by industry experts and Rate Rabbit to keep you informed on the latest trends and resources available to borrowers.
    </p>
    <p>
      <nuxt-link to="/basics" class="link-decorated">
        Home-Buying Basics: Things to Consider When Choosing an Online Lender
      </nuxt-link>
      <nuxt-link to="/basics" class="link-decorated">
        How Can I Improve My Credit?
      </nuxt-link>
    </p>
    <h2>
      Glossary
    </h2>
    <p>
      A summary of common mortgage terms and their definitions.
    </p>
    <p>
      <nuxt-link to="/glossary" class="link-decorated">
        Glossary of Useful Terms
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
      title: 'Help Guides'
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: 'Help guides' }
      ]
    }
  }
}
</script>

<style>
</style>
