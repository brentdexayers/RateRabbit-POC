<template>
  <div class="page-content page--basics">
    <p>
      Let’s say you’re in the planning stages to buy a new home or to refinance your existing one – how do you choose your lender? Perhaps you have a good credit history and a FICO score above 720, but you’re a busy person and don’t have much time available to shop prices.
    </p>
    <p>
      You’ve checked for some basic information on the Web, but all this conflicting info makes it complicated and you just want it to be easy! You’re tired of mortgage brokers who can’t be trusted and who seem to give one projection of costs one minute and another each time you talk or recheck the website. What can you do? Online mortgages seem like a good idea and more time-efficient but how do you know how to pick the right one?
    </p>
    <p>
      You have earned the right to get straight answers, great rates, guaranteed fees, and a broker who knows you’re a good risk. Above all, you need a mortgage company that is reputable and reliable.
    </p>
    <p>
      The following is a good list to check when you’re working with an online lender.
    </p>
    <ul>
      <li>
        <strong>
          Does the online lender seem trustworthy?
        </strong>
        <p>
          Remember that the mortgage market is volatile and lenders reset prices every day. So unless price quotes from different lenders are obtained at about the same time on the same day, they may not be comparable. This is much more of a problem in off-line lending than online because price quotes can be easily and quickly refreshed. Look for online lenders where fees are disclosed on the site and don’t change when you go back five minutes later.
        </p>
        <p>
          Testimonials from customers include specific details, like names and either location or company name so you know they’re real. Educational information is thorough and direct so you can weigh the options for yourself. Case studies or examples are clearly written and thorough in explaining the challenges and solutions used for customers like you.
        </p>
      </li>
      <li>
        <strong>
          What is the process by which you qualify for the loan – is it systematic and clear?
        </strong>
        <p>
          Rate lock-in periods should be explained. Timeframes should be identified and set in a timely fashion. Remember that a seller can cancel if your mortgage process isn’t proceeding according to plan so it’s important to know what that plan is so you can be assured of closing on time. If the seller cancels on you for lack of meeting the scheduled milestones, you could forfeit the money you have put into the escrow account, typically 1-3% of the house price.
        </p>
      </li>
      <li>
        <strong>
          Are the loan representatives knowledgeable?
        </strong>
        <p>
          Even when you are doing a loan through an online mortgage banker, there will come a time when you are talking to an account manager. Make sure he or she gives you good advice and guidance on the appropriate loans for you and your situation and doesn’t sound like they are just repeating a script that is the same for everyone. And look for non-commissioned loan consultants. When loan reps are salaried, they aren’t making commissions based on their ability to get your mortgage rate and fees higher so they would rather get you the best loan they can for your situation.
        </p>
      </li>
      <li>
        <strong>
          Are ramifications of all loan types explained clearly on the site and through the account rep?
        </strong>
        <p>
          You should receive basically the same information from both the site and the loan representative. Make sure you understand the differences between a fixed and an adjustable rate loan and how these will impact your financial situation. A good site will ask you questions about how long you plan to stay in the house, if your income is increasing and so on to help you narrow down the right type of loan for you.
        </p>
      </li>
      <li>
        <strong>
          Can you get a pre-approval before buying?
        </strong>
        <p>
          A pre-approval letter is based on the initial paperwork information you give a lender and can help to smooth the sales process for you in a seller’s market because the seller knows your bid is credible based on the amount of loan for which you prequalified. A good online lender will handle this for you just like a personal mortgage broker does. A full approval is granted once all numbers are validated; this one will have the underwriter’s official stamp on it.
        </p>
      </li>
      <li>
        <strong>
          Is the Good Faith Estimate fluid or guaranteed?
        </strong>
        <p>
          As soon as the rate is locked-in, the lender should be able to give you a guaranteed closing costs figure, not just a “good faith estimate”. As an example, Rate Rabbit actually guarantees that these rates and fees won’t change – so there are no surprises at the closing, and you are protected against unscrupulous practices.
        </p>
      </li>
      <li>
        <strong>
          Is the process managed for you to make it easy?
        </strong>
        <p>
          Look for a lender who makes the procedure easy for you, takes the time to answer your questions both online and off, outlines all steps in the process, and gives you a clear and concise explanation of all fees and charges.
        </p>
      </li>
    </ul>
    <p>
      By assessing each lender on these merits, you’ll know that you’re getting a good loan from a reputable lender and it will give you the peace of mind you always wanted when making one of the biggest decisions of your life – to buy or refinance a home.
    </p>
    <p>
      <nuxt-link to="/help" class="link-decorated">
        Help Guides
      </nuxt-link>
      <nuxt-link to="/about" class="link-decorated">
        About RateRabbit
      </nuxt-link>
    </p>
  </div>
</template>

<script>
export default {
  layout: 'default',
  data () {
    return {
      title: 'Home-Buying Basics: Things to Consider When Choosing an Online Lender'
    }
  },
  async fetch ({ store, params }) {
  },
  head () {
    return {
      title: this.title,
      titleTemplate: '%s',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: 'Home-Buying Basics: Things to Consider When Choosing an Online Lender' }
      ]
    }
  }
}
</script>

<style>
</style>
