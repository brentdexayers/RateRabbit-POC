<template>
  <div class="page-content page--credit">
    <p>
      Your Credit Score is important to determine if you will qualify for a loan or not. There are many factors that play a part in how your credit score is determined. Based on research, we have found some of the most important factors that can help improve your credit rating.
    </p>
    <h2>
      Your Payment History
    </h2>
    <p>
      Your payment history is very important to your credit score. Be sure to make your payments on credit cards, installment loans (such as a car loan), mortgage loans or finance company accounts on time. If you should miss a payment, make sure you get current and keep current because the longer you pay your bill on time the better your credit score will be. If you know that you will be paying your bill late, contact your creditor immediately. By negotiating with them, it may help so that you do not get hit with the late on your credit report.
    </p>
    <h2>
      Outstanding Amounts
    </h2>
    <p>
      The amount of outstanding debt can significantly impact your score. It is important to keep the balances on credit cards or installment loans as low as possible. In some instances, it is best to have more credit cards with low balances than to have only a couple with high balances. The closer you are to the credit limit, the lower your credit score will be. Pay off your debt rather than moving it around. Don't close unused accounts because the zero balance may actually help your score. And, do not open new accounts to increase your credit limit, this can affect you negatively.
    </p>
    <h2>
      Credit History
    </h2>
    <p>
      The amount of time you have been establishing your credit also affects your score. The longer, the better. If you have been managing credit for a short period of time, do not open new accounts too rapidly. Rapid account buildup may look risky and cause your score to be lower.
    </p>
    <h2>
      Opening New Credit
    </h2>
    <p>
      Several credit inquiries in a short period can mean you are attempting to open many new accounts. Instead, shop for your rate in a focused period of time. Fico scores can recognize when you are shopping for a single loan in a short amount of time. If it's necessary to pull your credit several times, have them pulled close together. If you have had credit problems in the past, try to open a few new accounts and pay them responsibly and don't max out your credit limit to help increase your credit score in the long run.
    </p>
    <h2>
      Type of Credit
    </h2>
    <p>
      Having a mixture of credit cards and installment loans can help raise your score if you manage them properly and make timely payments. Do not open new accounts just to have a better mix of credit, this can make your score go down. Instead, just manage your existing credit properly. Also, keep in mind that simply closing an account does not remove it from your credit report. It may still be counted for your score.
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
      title: 'How Can I Improve My Credit?'
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
        { hid: 'description', name: 'description', content: 'How Can I Improve My Credit?' }
      ]
    }
  }
}
</script>

<style>
</style>
