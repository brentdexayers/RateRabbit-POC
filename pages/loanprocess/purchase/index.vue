<template>
  <div class="page-content page--loanprocess--purchase">
    <h2>
      Rate Rabbit has made the loan application process straightforward and easy.
    </h2>
    <p>
      Once you have an idea of what loan program is right for you, select the interest rate and corresponding fee. With Rate Rabbit’s online tools, guaranteed fixed closing fee and competitive rates, you’ll get a great loan every time – No hidden fees, no added lender charges, and guaranteed protection from any last minute changes. Rate Rabbit will provide you with the safest and easiest loan transaction you’ve ever made.
    </p>
    <p>
      From the start of the application process to closing, you will have access to our team of professional, non-commissioned loan consultants by phone or online to answer questions and walk you through the process.
    </p>
    <p>
      As soon as your application is complete, we’ll immediately begin the loan approval process. Once your loan is approved, you will need to sign the final loan documents. Your loan will fund shortly after Rate Rabbit receives your signed loan documents. On a new purchase, this is typically within 1-3 days. Then that’s it – you’ll pick up the keys to your new home. It couldn’t be easier!
    </p>
    <p>
      <nuxt-link to="/loanprocess/purchase/2">
        Click here
      </nuxt-link>
      for more details about our easy loan application process.
    </p>
  </div>
</template>

<script>
export default {
  layout: 'default',
  data () {
    return {
      title: 'Loan Process for New Purchases'
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
        { hid: 'description', name: 'description', content: 'Loan Process for New Purchases' }
      ]
    }
  }
}
</script>

<style>
</style>
