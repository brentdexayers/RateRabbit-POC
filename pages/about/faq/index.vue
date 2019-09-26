<template>
  <article class="page-content page--faq">
    <h3>
      <i>
        Why should I choose an online mortgage lender like Rate Rabbit as opposed to a brick and mortar mortgage lender?
      </i>
    </h3>
    <p>
      Online mortgage lenders offer numerous advantages to consumers.
    </p>
    <p>
      First, online lenders such as Rate Rabbit provide an easy way to shop and compare mortgage rates.If the loan you want is priced on a website, it is easy to compare it to the quotes on other sites.
    </p>
    <p>
      Price quotes found in the newspaper never provide the detail needed by most shoppers and are always out of date by the time they are published. Telephone and email quotes from brokers and loan officers can’t often be trusted either, unless you know the source and have a relationship or referrals to prove they are trustworthy.
    </p>
    <h3>
      <i>
        I’ve heard that online mortgage pricing is often better. Why is that?
      </i>
    </h3>
    <p>
      Online lenders avoid paying the usual costs of maintaining retail lending facilities and are able to pass along the savings to borrowers. There are also numerous online lenders now, and borrowers are benefiting from this competition among online lenders with competitive pricing.
    </p>
    <p>
      With Rate Rabbit, borrowers also save on commissions that they would normally pay to a retail lender.  Rate Rabbit does not employ commission paid loan officers, but instead salaried loan consultants, so their goal is to get you the best deal, not crank up their commission.
    </p>
    <h3>
      <i>
        What if I don’t like the idea of giving my personal financial information online?
      </i>
    </h3>
    <p>
      Rate Rabbit provides an encrypted, secure site so you can be sure that your information is not being exposed.  Rate Rabbit also never, ever sells, rents or gives away your personal information. In fact, we have one of the best privacy policies in the online lending industry.  Visit our online privacy policy.
    </p>
    <h3>
      <i>
        What is included in Rate Rabbit’s fixed closing fee?
      </i>
    </h3>
    <p>
      Rate Rabbit has revolutionized the way home loans are done by offering a guaranteed and protected fixed-fee package. We combine all applicable closing and lender costs into one low, guaranteed fee every time.
    </p>
    <p>
      Your closing package includes the following costs – Guaranteed not to change.
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
        Survey (when required for loan)
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
        Admin Costs
      </li>
    </ul>
    <h3>
      <i>
        Is it really a better value to go with the one fixed-fee instead of getting my own vendors?
      </i>
    </h3>
    <p>
      Yes, Rate Rabbit has negotiated with the best third-party vendors in the business to get the best fees for your refinance possible.  These vendors give Rate Rabbit their best prices because we give them a consistent, high-volume amount of business. It’s that simple.
    </p>
    <h3>
      <i>
        What makes Rate Rabbit different from other retail and online mortgage lenders?
      </i>
    </h3>
    <p>
      Our guarantee of one fixed closing fee is unique. We don’t know of anyone in the industry that is offering our type of refinance loan program and guaranteed fixed-fee on ALL closing costs, not just lending fees.
    </p>
    <p>
      We are also highly committed to being a lender you can trust. We’ve heard hundreds of horror stories from consumers that feel “burned” by the mortgage loan process. We don’t think there’s an excuse for people being taken advantage of or getting a deal based on their negotiation skills.  We are so confident that you will enjoy our no-nonsense approach to doing loans that you will refer us to your family and friends.
    </p>
    <h3>
      <i>
        How do I know I’m getting the best price on my loan closing and not a low ball estimate?
      </i>
    </h3>
    <p>
      Rate Rabbit provides a GUARANTEE with every loan, not just a good faith estimate. For refinances we guarantee the total cost of your loan, including all lender and third party fees. On purchases we guarantee the lender fees and appraisal.
    </p>
    <p>
      Some lenders will often lowball third party costs, which they can’t be held to because they are “estimates.” Sometimes they even mark up the costs as they see fit and keep the difference.
    </p>
    <p>
      These practices usually occur off-line because details on third-party costs typically is not provided until the borrower receives the Good Faith Estimate, and are not given to the borrower until three business days after the lender has received the loan application.
    </p>
    <p>
      Rate Rabbit gives you the price quote upfront and takes the “estimate” out of the Good Faith Estimate. One Easy guarantees that you will pay what you see on the Good Faith Estimate.  Last minute changes and fees are not your problem, they’re ours – period.
    </p>
    <h2>
      The One Fee Guarantee:
    </h2>
    <p>
      Our customers are guaranteed protection against any changes to the low interest rates, closing costs, and third-party fees quoted by Rate Rabbit. All applicable lender fees and closing costs are stated upfront in the good faith estimate and will not change. Last minute changes in fees are not your problem, they’re ours – we’ve got them covered.
    </p>
    <p>
      Of course, every home purchase includes costs such as escrow, title, notary, recording, survey (when applicable), taxes, insurance, and prepaid interest, which are covered by each homeowner.
    </p>
    <h3>
      <i>
        What is the best way to get started?
      </i>
    </h3>
    <p>
      Simply log on to the Rate Rabbit site www.raterabbit.com and find the loan program that’s right for you. Complete the application online or call one of our non-commissioned loan consultants at <PhoneLink /> to walk you through the process. It’s that easy.
    </p>
  </article>
</template>

<script>
import PhoneLink from '~/components/globals/PhoneLink.vue'

export default {
  layout: 'default',
  components: {
    PhoneLink
  },
  data () {
    return {
      title: 'FAQ\'s'
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: 'Frequently asked questions' }
      ]
    }
  }
}
</script>

<style>
</style>
