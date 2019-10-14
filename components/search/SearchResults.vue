<template>
  <div class="search-results">
    <div
      v-for="(result, resultIndex) in searchResults"
      :key="resultIndex"
      :data-result-index="resultIndex"
    >
      <h2>
        {{ result.term }}
      </h2>
      <div class="results-table--desktop container-fluid">
        <div class="row results-table--desktop__header">
          <div class="col">
            <div class="row">
              <div class="col">
                {{ 'Rate' | capitalize }}
              </div>
              <div class="col">
                {{ 'APR' | capitalize }}
              </div>
              <div class="col">
                {{ 'Monthly Payment' | capitalize }}
              </div>
            </div>
          </div>
          <div class="col col-custom">
            &nbsp;
          </div>
        </div>
        <div
          v-for="(rate, rateIndex) in result.rates"
          :key="rateIndex"
          class="row results-table--desktop__result"
          :data-rate-index="rateIndex"
        >
          <div v-if="!rate.oneFeeGuarantee" class="results-table--desktop__result__recommended">
            <img src="~assets/icons/icon-check.png" width="18">
          </div>
          <div class="col">
            <div class="row results-table--desktop__result__rates">
              <div class="col">
                {{ rate.rate | percent }}
              </div>
              <div class="col">
                {{ rate.apr | percent }}
              </div>
              <div class="col">
                {{ rate.monthlyPayment | currency }}
              </div>
            </div>
            <div class="row">
              <div class="col">
                <p :class="{ recommended: !rate.oneFeeGuarantee }">
                  {{ 'One Fee Guarantee' | uppercase }}: <span :class="{ strong: !rate.oneFeeGuarantee }">{{ rate.oneFeeGuarantee | currency }}</span>
                  <span v-if="!rate.oneFeeGuarantee" class="no-cost-loan-text">
                    Recommended No-Cost loan
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div class="col col-custom">
            <nuxt-link
              to="#"
              class="btn btn-sm btn-primary results-table__result__button"
            >
              Apply
            </nuxt-link>
            <p>
              <a
                href="#"
                class="link-decorated results-table--desktop__result__link"
                @click.prevent="showDetails($event, resultIndex, rateIndex)"
              >
                See Details
              </a>
            </p>
          </div>
        </div>
      </div>
      <div class="results-table--mobile">
        <div
          v-for="(rate, rateIndex) in result.rates"
          :key="rateIndex"
          class="results-table--mobile__result"
          :data-rate-index="rateIndex"
        >
          <div v-if="!rate.oneFeeGuarantee" class="results-table--mobile__result__recommended">
            <img src="~assets/icons/icon-check.png" width="18">
          </div>
          <div class="results-table--mobile__result__rates">
            <div class="row">
              <div class="col">
                <p>
                  {{ 'Rate' | uppercase }}
                </p>
              </div>
              <div class="col-auto text-right">
                <p>
                  {{ rate.rate | percent }}
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <p>
                  {{ 'APR' | uppercase }}
                </p>
              </div>
              <div class="col-auto text-right">
                <p>
                  {{ rate.apr | percent }}
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <p>
                  {{ 'Monthly Payment' | uppercase }}
                </p>
              </div>
              <div class="col-auto text-right">
                <p>
                  {{ rate.monthlyPayment | currency }}
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <p :class="{ recommended: !rate.oneFeeGuarantee }">
                  {{ 'One Fee Guarantee' | uppercase }}
                  <span v-if="!rate.oneFeeGuarantee" class="no-cost-loan-text">
                    Recommended No-Cost loan
                  </span>
                </p>
              </div>
              <div class="col-auto text-right">
                <p>
                  {{ rate.oneFeeGuarantee | currency }}
                </p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <nuxt-link
                to="#"
                class="btn btn-sm btn-outline-primary results-table--mobile__result__button results-table--mobile__button--details"
                @click.prevent="showDetails($event, resultIndex, rateIndex)"
              >
                Details
              </nuxt-link>
            </div>
            <div class="col">
              <nuxt-link
                to="#"
                class="btn btn-sm btn-primary results-table--mobile__result__button results-table--mobile__result__button--apply"
              >
                Apply
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <SearchResultsDetails
      v-if="resultDetails.show"
      :result-details="resultDetails"
    />
  </div>
</template>

<script>
import SearchResultsDetails from '~/components/search/SearchResultsDetails.vue'

export default {
  components: {
    SearchResultsDetails
  },
  props: {
    phone: {
      type: String,
      default: '(888) 395-0395'
    },
    classes: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      searchResults: [
        {
          term: '30 Year Fixed',
          rates: [
            {
              rate: 0.03250,
              apr: 0.03479,
              monthlyPayment: 2089.00,
              oneFeeGuarantee: 13992.00
            },
            {
              rate: 0.03875,
              apr: 0.03875,
              monthlyPayment: 2257.14,
              oneFeeGuarantee: 0.00
            }
          ]
        },
        {
          term: '20 Year Fixed',
          rates: [
            {
              rate: 0.03250,
              apr: 0.03479,
              monthlyPayment: 2089.00,
              oneFeeGuarantee: 13992.00
            },
            {
              rate: 0.03875,
              apr: 0.03875,
              monthlyPayment: 2257.14,
              oneFeeGuarantee: 0.00
            }
          ]
        },
        {
          term: '15 Year Fixed',
          rates: [
            {
              rate: 0.03250,
              apr: 0.03479,
              monthlyPayment: 2089.00,
              oneFeeGuarantee: 13992.00
            },
            {
              rate: 0.03875,
              apr: 0.03875,
              monthlyPayment: 2257.14,
              oneFeeGuarantee: 0.00
            }
          ]
        }
      ],
      resultDetails: {
        show: false
      }
    }
  },
  methods: {
    showDetails (event, resultIndex, rateIndex) {
      this.resultDetails.term = this.searchResults[resultIndex].term
      this.resultDetails.rate = this.searchResults[resultIndex].rates[rateIndex].rate
      this.resultDetails.apr = this.searchResults[resultIndex].rates[rateIndex].apr
      this.resultDetails.oneFeeGuarantee = this.searchResults[resultIndex].rates[rateIndex].oneFeeGuarantee
      this.resultDetails.monthlyPayment = this.searchResults[resultIndex].rates[rateIndex].monthlyPayment
      this.resultDetails.date = new Date()
      this.resultDetails.show = true
    },
    hideDetails () {
      this.resultDetails = { show: false }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/variables.scss';
@import '~bootstrap/scss/mixins.scss';

.search-results {
  .results-table {
    &--desktop {
      @include media-breakpoint-down('sm') {
        display: none;
      }
      margin-bottom: #{$spacer * 4.125};
      .col-custom {
        max-width: 145px;
        text-align: center;
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
        .row {
          align-items: center;
          .col {
            white-space: nowrap;
          }
        }
      }
      &__result {
        background-color: $gray-400;
        border: $border-width solid $gray-450;
        margin-bottom: .25rem;
        padding-left: #{$spacer * 1.25};
        padding-right: #{$spacer * 1.25};
        padding-top: #{$spacer * 2};
        padding-bottom: $spacer;
        position: relative;
        > .row {
          align-items: center;
        }
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
        }
      }
    }
    &--mobile {
      margin-bottom: #{$spacer * 4.125};
      @include media-breakpoint-up('md') {
        display: none;
      }
      &__result {
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
    }
    &--desktop__result,
    &--mobile__result {
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
