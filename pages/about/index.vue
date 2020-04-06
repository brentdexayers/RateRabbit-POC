<template>
  <div class="page-content page--about">
    <p>
      Founded in 2011, Rate Rabbit Home Loans simplified the online experience to save you time and money.
    </p>
    <p>
      Based in San Diego, we have introduced a new, Internet-based method to obtain a home loan. Rate Rabbit uses advanced technology to provide live rates, transparent pricing, and easy online applications.
    </p>
    <h2>
      We make it easy. Over 80% of our clients are repeat customers or are referred by our previous customers.
    </h2>
    <h3>
      Our Customers
    </h3>
    <p>
      Rate Rabbit Home Loans has been successful because of our customers. Over 80% of our customers are either repeat customers or referred by one of our previous customers.
    </p>
    <h3>
      Savings
    </h3>
    <p>
      We offer our customers the most competitive rates available, saving our customers thousands/millions (need to pick one here) over the life of the mortgage. Through our state of the art technology, our customers can search live rates without adding any personal information.
    </p>
    <h3>
      Transparency
    </h3>
    <p>
      Our advance rate search fully discloses the rate, apr, closing fees, and third party fees. In fact, we believe you should never be left wondering what your fees will be by guaranteeing the fee disclosed. Yes, you read that correctly, we guarantee our low closing costs!
    </p>
    <h3>
      Convenience
    </h3>
    <p>
      Our customers have 24/7 access to our website and live rate pricing. Even if you apply after hours, one of our Loan Consultants will contact you by the next day.
    </p>
    <p>
      We also offer you Tools that will help you be prepared for the loan process so you don’t have to wait for us to contact you. You will be ready and your loan can close as fast as possible.
    </p>
    <h3>
      Service
    </h3>
    <p>
      We offer the best customer service in the business. Our customers are our number one reason we have been successful. For that reason, our customers come first!
    </p>
  </div>
</template>

<script>
// import EmailLink from '~/components/globals/EmailLink.vue'
// import PhoneLink from '~/components/globals/PhoneLink.vue'
import phone from '~/mixins/phoneNumber.js'

export default {
  layout: 'default',
  components: {
    // PhoneLink,
    // EmailLink
  },
  data () {
    return {
      title: 'About Us',
      phone
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: 'About RateRabbit' }
      ]
    }
  }
}
</script>

<style>
</style>
