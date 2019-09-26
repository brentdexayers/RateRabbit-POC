<template>
  <div class="page-content page--about">
    <p>
      We've talked to hundreds of consumers that say they've felt ripped off or unsure if they really got a good rate and fair closing costs when obtaining a home loan from other lenders. Consumers often question the difference between the costs listed in the "loan estimate" and the final closing documents.
    </p>
    <p>
      It's true, frequently closing costs end up being much higher than what a borrower sees on their loan estimate, leaving them feeling taken advantage of and frustrated!
    </p>
    <p>
      Rate Rabbit changes all of that by turning the loan estimate into a guaranteed and protected fixed-fee package . We combine all applicable closing and lender costs into one low, guaranteed fee. Rate Rabbit is committed to providing its customers with the best mortgage rates and the lowest closing fee.
    </p>
    <p>
      Rate Rabbit also provides the most convenient and consumer-friendly loan process in the industry. Borrowers can research rates, choose loan programs and apply for loans online 24 hours a day, or request assistance from a Rate Rabbit non-commissioned loan consultant via our toll-free number. It's Easy!
    </p>
    <h2>
      Our Company
    </h2>
    <p>
      Rate Rabbit is a privately held California corporation based in San Diego. The company has introduced a new, Internet-based method to obtain a home loan. Rate Rabbit combines closing, lender costs into one low, guaranteed fee, and turns the “loan estimate” into a guaranteed and protected fixed-fee package. The one fee guarantee package includes the following costs, and the total of which is guaranteed not to change at closing.
    </p>
    <ul>
      <li>
        Origination Fee
      </li>
      <li>
        Discount Points
      </li>
      <li>
        Appraisal Fee
      </li>
      <li>
        Title Insurance and Related Charges
      </li>
      <li>
        Escrow/Lender Attorney Fee
      </li>
      <li>
        Survey
      </li>
      <li>
        Flood Certification Fee
      </li>
      <li>
        Credit Report Fee
      </li>
      <li>
        Tax Service Fee
      </li>
      <li>
        Underwriting Fee
      </li>
      <li>
        Processing Fee
      </li>
      <li>
        Recording Fees
      </li>
      <li>
        Notary Fee
      </li>
      <li>
        Administration Fee
      </li>
    </ul>
    <p>
      Rate Rabbit is committed to providing its customers throughout the United States with the best mortgage rates and the lowest closing fee in the industry.
    </p>
    <p>
      A Rate Rabbit loan assures consumers protection from last minute changes in costs, and from bait and switch tactics used by aggressive, commissioned sales people. Loan applicants can choose to use our user-friendly Website to shop and compare with an instant quote or to complete the entire loan process online. Rate Rabbit also provides one-on-one customer support by professional, non-commissioned loan consultants to assure a hassle-free loan every time.
    </p>
    <h2>
      Executive Team
    </h2>
    <p>
      Bill Mansy, Founder and President
    </p>
    <h2>
      Headquarters
    </h2>
    <address>
      540 Front St.<br>
      San Diego, CA 92101
    </address>
    <p>
      Toll-free: <PhoneLink /><br>
      San Diego Area: <PhoneLink :phone-number="phone.number.local" /><br>
      Efax: <PhoneLink :phone-number="phone.number.fax" /><br>
      Email: <EmailLink /><br>
      Website:
      <nuxt-link to="/">
        www.raterabbit.com
      </nuxt-link>
    </p>
  </div>
</template>

<script>
import PhoneLink from '~/components/globals/PhoneLink.vue'
import phone from '~/mixins/phoneNumber.js'
import EmailLink from '~/components/globals/EmailLink.vue'

export default {
  layout: 'default',
  components: {
    PhoneLink,
    EmailLink
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
