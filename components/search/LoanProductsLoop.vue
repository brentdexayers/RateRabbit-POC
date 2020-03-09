<template>
  <div>
    <div
      v-if="loanProducts"
      class="results-table__results"
    >
      <h2>
        {{ '30-Year Fixed' }}
      </h2>
      <div class="results-table__header container-fluid">
        <div class="row">
          <div class="col">
            {{ 'Rate' | uppercase }}
          </div>
          <div class="col">
            {{ 'APR' | uppercase }}
          </div>
          <div class="col">
            {{ 'Monthly Payment' | uppercase }}
          </div>
          <div class="col d-md-none d-lg-flex">
            &nbsp;
          </div>
        </div>
      </div>
      <div
        v-for="(loanProduct, loanProductIndex) in loanProducts"
        :key="loanProductIndex"
        :data-rate-index="loanProductIndex"
      >
        <div
          v-for="(priceDetail, priceDetailIndex) in loanProduct.LOAN_PRICE_QUOTE.OB_PRICE_DETAILS.OB_PRICE_DETAIL"
          :key="priceDetailIndex"
          :data-rate-index="priceDetailIndex"
        >
          <!-- Desktop view -->
          <div class="results-table__result results-table__result--desktop">
            <!-- One Fee Guarantee -->
            <div v-if="false" class="results-table__result__recommended">
              <img src="~assets/icons/icon-check.png" width="18">
            </div>
            <!-- END: One Fee Guarantee -->
            <div class="row">
              <div class="col">
                <div class="row results-table__result--desktop__rates">
                  <div class="col-4">
                    {{ priceDetail.Rate | percent }}
                  </div>
                  <div class="col-4">
                    {{ priceDetail.APR || 0 | percent }}
                  </div>
                  <div class="col-4">
                    {{ priceDetail.Price | currency }}
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <p :class="{ recommended: !false }">
                      {{ 'One fee guarantee' | titlecase }}: <span :class="{ strong: false }">{{ false | currency }}</span>
                      <span v-if="!false" class="no-cost-loan-text">
                        {{ 'Recommended No-Cost loan' | titlecase }}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-12 col-lg-3">
                <div class="row justify-content-between">
                  <div class="col-12 col-md-4 col-lg-12 order-md-last order-lg-first">
                    <nuxt-link
                      to="/apply"
                      class="btn btn-sm btn-primary results-table__result--desktop__button"
                      :data-term="loanProductIndex"
                      :data-rate="priceDetailIndex"
                      @click.native="apply($event, loanProductIndex, priceDetailIndex, priceDetail.Rate, priceDetail.APR || 0, priceDetail.Price, false)"
                    >
                      {{ 'Apply' | titlecase }}
                    </nuxt-link>
                  </div>
                  <div class="col-12 col-md-auto col-lg-12 order-md-first order-lg-last">
                    <p class="results-table__result--desktop__link-p">
                      <a
                        href="#"
                        class="link-decorated results-table__result--desktop__link"
                        @click.prevent="showDetails($event, loanProductIndex, priceDetailIndex)"
                      >
                        {{ 'See Details' | titlecase }}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Mobile view -->
          <div class="results-table__result results-table__result--mobile">
            <!-- One Fee Guarantee -->
            <div v-if="!false" class="results-table__result__recommended">
              <img src="~assets/icons/icon-check.png" width="18">
            </div>
            <!-- END: One Fee Guarantee -->
            <div class="results-table__result--mobile__rates">
              <div class="row">
                <div class="col">
                  <p>
                    {{ 'Rate' | capitalize }}
                  </p>
                </div>
                <div class="col-auto text-right">
                  <p>
                    {{ priceDetail.Rate | percent }}
                  </p>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <p>
                    {{ 'APR' | capitalize }}
                  </p>
                </div>
                <div class="col-auto text-right">
                  <p>
                    {{ priceDetail.APR || 0 | percent }}
                  </p>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <p>
                    {{ 'Monthly Payment' | capitalize }}
                  </p>
                </div>
                <div class="col-auto text-right">
                  <p>
                    {{ priceDetail.Price | currency }}
                  </p>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <p :class="{ recommended: !false }">
                    {{ 'One Fee Guarantee' | capitalize }}
                    <span v-if="!false" class="no-cost-loan-text">
                      {{ 'Recommended No-Cost loan' | titlecase }}
                    </span>
                  </p>
                </div>
                <div class="col-auto text-right">
                  <p>
                    {{ false | currency }}
                  </p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <a
                  href="#"
                  class="btn btn-sm btn-outline-primary results-table__result--mobile__button results-table__button--mobile--details"
                  @click.prevent="showDetails($event, loanProductIndex, priceDetailIndex)"
                >
                  {{ 'Details' | titlecase }}
                </a>
              </div>
              <div class="col">
                <nuxt-link
                  to="/apply"
                  class="btn btn-sm btn-primary results-table__result--mobile__button results-table__result--mobile__button--apply"
                  @click.native="apply($event, loanProductIndex, priceDetailIndex, priceDetail.Rate, priceDetail.APR || 0, priceDetail.Price, false)"
                >
                  {{ 'Apply' | titlecase }}
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
    loanProducts () {
      return this.$store.state.searchresults.loanProducts.DEAL.LOANS.LOAN.ELIGIBLE_LOAN_PRODUCTS.LOAN_PRODUCT
    }
  },
  methods: {
    apply (event, loanProductIndex, priceDetailIndex, rate, apr, monthlypayment, onefeeguarantee) {
      this.$store.commit('application/setloanProductIndex', loanProductIndex)
      this.$store.commit('application/setpriceDetailIndex', priceDetailIndex)
      this.$store.commit('application/setrate', rate)
      this.$store.commit('application/setAPR', apr)
      this.$store.commit('application/setmonthlypayment', monthlypayment)
      this.$store.commit('application/setonefeeguarantee', onefeeguarantee)
      this.$store.commit('searchresults/hideShowDetails')
      this.$store.commit('application/setcompleted', false)
    },
    showDetails (event, term, rate) {
      this.$store.commit('application/setloanProductIndex', term)
      this.$store.commit('application/setpriceDetailIndex', rate)
      this.$store.commit('searchresults/toggleShowDetails')
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/variables.scss';
@import '~bootstrap/scss/mixins.scss';

.search-results {
  .results-table {
    &__results {
      margin-bottom: #{$spacer * 4.125};
    }
    &__header {
      background-color: $white;
      border: $border-width solid $gray-450;
      color: rgba($body-color,0.5);
      font-size: 12px;
      font-weight: $font-weight-bold;
      line-height: 28px;
      padding-left: #{$spacer * 1.25};
      padding-right: #{$spacer * 1.25};
      @include media-breakpoint-down('sm') {
        display: none;
      }
      .row {
        align-items: center;
        .col {
          white-space: nowrap;
        }
      }
    }
    &__result {
      &--desktop {
        @include media-breakpoint-down('sm') {
          display: none;
        }
        background-color: $gray-400;
        border: $border-width solid $gray-450;
        margin-bottom: .25rem;
        padding-left: #{$spacer * 1.25};
        padding-right: #{$spacer * 1.25};
        padding-top: #{$spacer * 2};
        padding-bottom: $spacer;
        position: relative;
        &__rates {
          font-size: $font-size-lg;
          font-weight: $font-weight-semibold;
          line-height: 28px;
          margin-bottom: $spacer;
        }
        &__guarantee {
          font-size: $font-size-sm;
          line-height: 28px;
        }
        &__button {
          display: block;
          margin-bottom: #{$spacer * .7};
          width: 100%;
        }
        &__link {
          color: $primary;
          font-size: $font-size-sm;
          line-height: 28px;
          margin-bottom: 0;
          white-space: nowrap;
          &::after {
            height: 12px;
            width: 12px;
          }
          &-p {
            text-align: center;
          }
        }
      }
      &--mobile {
        @include media-breakpoint-up('md') {
          display: none;
        }
        background-color: $gray-400;
        border: $border-width solid $gray-450;
        margin-bottom: #{$spacer * .25};
        padding-left: #{$spacer * 1.25};
        padding-right: #{$spacer * 1.25};
        padding-top: #{$spacer * 2};
        padding-bottom: $spacer;
        position: relative;
        &__rates {
          font-size: $font-size-sm;
          font-weight: $font-weight-semibold;
          line-height: 28px;
          margin-bottom: $spacer;
        }
        &__button {
          display: block;
          width: 100%;
        }
      }
      &__recommended {
        background-color: $primary;
        background: -moz-linear-gradient(-45deg,  rgba($primary,1) 0%, rgba($primary,1) 50%, rgba($primary,0) 50.01%, rgba($primary,0) 100%); /* FF3.6-15 */
        background: -webkit-linear-gradient(-45deg,  rgba($primary,1) 0%,rgba($primary,1) 50%,rgba($primary,0) 50.01%,rgba($primary,0) 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(135deg,  rgba($primary,1) 0%,rgba($primary,1) 50%,rgba($primary,0) 50.01%,rgba($primary,0) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        height: 2rem;
        left: 0;
        position: absolute;
        top: 0;
        width: 2rem;
        img {
          left: 2px;
          position: absolute;
          top: 4px;
        }
      }
      .recommended {
        padding-left: 1em;
        position: relative;
        &::before {
          background-image: url(~assets/icons/icon-verified.png);
          background-repeat: no-repeat;
          background-size: contain;
          content: "";
          display: block;
          height: .85em;
          left: 0;
          position: absolute;
          top: .4rem;
          width: .85em;
        }
        .strong {
          font-weight: $font-weight-bold;
        }
        .no-cost-loan-text {
          font-size: 0.875em;
          font-style: italic;
          opacity: .5;
          display: block;
        }
      }
    }
  }
}
</style>
