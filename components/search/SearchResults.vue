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
      <div class="results-table container-fluid">
        <div class="row results-table__header">
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
          class="row results-table__result"
          :data-rate-index="rateIndex"
        >
          <div class="col">
            <div class="row results-table__result__rates">
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
                <span class="results-table__result__guarantee">
                  One Fee Guarantee: {{ rate.oneFeeGuarantee | currency }}
                </span>
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
            <a
              href="#"
              class="link-decorated results-table__result__link"
              @click.prevent="showDetails($event, resultIndex, rateIndex)"
            >
              See Details
            </a>
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

.search-results {
  .results-table {
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
      > .row {
        align-items: center;
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
}
</style>
