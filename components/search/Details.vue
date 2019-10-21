<template>
  <div
    class="search-results-details"
    @click.self="closeDetailsModal"
  >
    <div class="search-results-details__wrapper">
      <button
        class="close"
        @click="closeDetailsModal"
      />
      <div class="container">
        <div class="row">
          <div class="col">
            <h2 class="search-results-details__term">
              {{ searchResults[termIndex].term }}
            </h2>
            <p class="search-results-details__p">
              <strong>Interest Rate:</strong> {{ searchResults[termIndex].rates[rateIndex].rate | percent }}
            </p>
            <p class="search-results-details__p">
              <strong>APR:</strong> {{ searchResults[termIndex].rates[rateIndex].apr | percent }}
            </p>
            <p class="search-results-details__p" :class="{ recommended: !searchResults[termIndex].rates[rateIndex].oneFeeGuarantee }">
              <strong>One Fee Guarantee:</strong> {{ searchResults[termIndex].rates[rateIndex].oneFeeGuarantee | currency }}
            </p>
          </div>
          <div class="col-12 col-md-5">
            <nuxt-link
              to="/apply"
              class="btn btn-primary search-results-details__apply-btn"
              :data-term="termIndex"
              :data-rate="rateIndex"
              @click="apply($event, termIndex, rateIndex)"
            >
              {{ 'Apply' | titlecase }}
            </nuxt-link>
            <p class="search-results-details__connect">
              <nuxt-link
                to="/connect"
                class="link-decorated search-results-details__connect__link"
              >
                {{ 'Talk to a Loan Consultant' }}
              </nuxt-link>
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <p class="search-results-details__datetime">
              {{ searchDate | datetime }}
            </p>
            <table class="table table-striped">
              <tbody>
                <tr>
                  <td scope="col">
                    {{ 'One Fee Guarantee' | titlecase }}
                  </td>
                  <td scope="col">
                    {{ searchResults[termIndex].rates[rateIndex].oneFeeGuarantee | currency }}
                  </td>
                </tr>
                <tr
                  v-if="searchForm.fields.propertyValue.value"
                >
                  <td scope="col">
                    {{ 'Home Value' | titlecase }}
                  </td>
                  <td scope="col">
                    {{ searchForm.fields.propertyValue.value }}
                  </td>
                </tr>
                <tr
                  v-if="searchForm.fields.loanAmount.value"
                >
                  <td scope="col">
                    {{ 'Loan Amount' | titlecase }}
                  </td>
                  <td scope="col">
                    {{ searchForm.fields.loanAmount.value }}
                  </td>
                </tr>
                <tr>
                  <td scope="col">
                    {{ 'Monthly Payment' | titlecase }}
                  </td>
                  <td scope="col">
                    {{ searchResults[termIndex].rates[rateIndex].monthlyPayment | currency }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <hr>
            <p class="search-results-details__table-info">
              <strong>Rate Rabbit has revolutionized the way loans are offered</strong> by turning the good faith estimate into a guaranteed and protected fixed-fee package. We combine closing, lender and third-party costs into one low, guaranteed fee.
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <h2>
              One Fee Guarantee includes all costs
            </h2>
            <table class="table table-striped">
              <tbody>
                <tr>
                  <td scope="col">
                    Origination Fee
                  </td>
                  <td scope="col">
                    Included
                  </td>
                </tr>
                <tr>
                  <td scope="col">
                    Loan Discount
                  </td>
                  <td scope="col">
                    Included
                  </td>
                </tr>
                <tr>
                  <td scope="col">
                    Appraisal Fee
                  </td>
                  <td scope="col">
                    Included
                  </td>
                </tr>
                <tr>
                  <td scope="col">
                    Credit Report Fee
                  </td>
                  <td scope="col">
                    Included
                  </td>
                </tr>
                <tr>
                  <td scope="col">
                    Processing Fee
                  </td>
                  <td scope="col">
                    Included
                  </td>
                </tr>
                <tr>
                  <td scope="col">
                    Underwriting Fee
                  </td>
                  <td scope="col">
                    Included
                  </td>
                </tr>
                <tr>
                  <td scope="col">
                    Tax Service
                  </td>
                  <td scope="col">
                    Included
                  </td>
                </tr>
                <tr>
                  <td scope="col">
                    Document Preparation Fee
                  </td>
                  <td scope="col">
                    Included
                  </td>
                </tr>
                <tr>
                  <td scope="col">
                    Administration Fee
                  </td>
                  <td scope="col">
                    Included
                  </td>
                </tr>
                <tr>
                  <td scope="col">
                    Wire Fee
                  </td>
                  <td scope="col">
                    Included
                  </td>
                </tr>
                <tr>
                  <td scope="col">
                    Flood Certification Fee
                  </td>
                  <td scope="col">
                    Included
                  </td>
                </tr>
                <tr>
                  <td scope="col">
                    Messenger Fee
                  </td>
                  <td scope="col">
                    Included
                  </td>
                </tr>
                <tr>
                  <td scope="col">
                    One Fee Guarantee
                  </td>
                  <td scope="col">
                    Included
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <h2>
              Additional pre-paid items not included in your One Fee Guarantee
            </h2>
            <table class="table table-striped">
              <tbody>
                <tr>
                  <td scope="col">
                    20 Days Interest @ $45
                  </td>
                  <td scope="col">
                    {{ 900 | currency }}
                  </td>
                </tr>
                <tr>
                  <td scope="col">
                    Mortgage Insurance (if applicable)
                  </td>
                  <td scope="col">
                    TBD
                  </td>
                </tr>
                <tr>
                  <td scope="col">
                    Homeowners/Hazard Insurance
                  </td>
                  <td scope="col">
                    TBD
                  </td>
                </tr>
                <tr>
                  <td scope="col">
                    Property Taxes
                  </td>
                  <td scope="col">
                    TBD
                  </td>
                </tr>
                <tr>
                  <td scope="col">
                    <strong>
                      Total Prepaid Items:
                    </strong>
                  </td>
                  <td scope="col">
                    <strong>
                      {{ 900 | currency }}
                    </strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <h2>
              Third Party Fees not included in your
              One Easy Fee
            </h2>
            <table class="table table-striped">
              <tbody>
                <tr>
                  <td scope="col">
                    Settlement: Escrow/Attorney
                  </td>
                  <td scope="col">
                    Not Included
                  </td>
                </tr>
                <tr>
                  <td scope="col">
                    Notary Fee
                  </td>
                  <td scope="col">
                    Not Included
                  </td>
                </tr>
                <tr>
                  <td scope="col">
                    Title Insurance
                  </td>
                  <td scope="col">
                    Not Included
                  </td>
                </tr>
                <tr>
                  <td scope="col">
                    <strong>
                      Total Third Party
                    </strong>
                  </td>
                  <td scope="col">
                    <strong>
                      Fees TBD
                    </strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    searchForm () {
      return this.$store.state.searchform
    },
    searchResults () {
      return this.$store.state.searchresults.results[0]
    },
    searchDate () {
      return this.$store.state.searchresults.date
    },
    termIndex () {
      return this.$store.state.application.termIndex
    },
    rateIndex () {
      return this.$store.state.application.rateIndex
    }
  },
  methods: {
    closeDetailsModal (event) {
      // this.$store.commit('application/setTermIndex', null)
      // this.$store.commit('application/setRateIndex', null)
      this.$store.commit('searchresults/toggleShowDetails')
    },
    apply (event, term, rate) {
      this.$store.commit('application/setTermIndex', term)
      this.$store.commit('application/setRateIndex', rate)
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/variables.scss';
@import '~bootstrap/scss/mixins.scss';

.search-results-details {
  background-color: rgba($black,.16);
  bottom: 0;
  left: 0;
  overflow-y: auto;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 20000;
  &__wrapper {
    background-color: $white;
    box-shadow: 0 0 1rem rgba($black,.16);
    margin: auto;
    max-width: 720px;
    padding: #{$spacer * 3.75} #{$spacer * 1.75};
    position: relative;
    .container {
      @include media-breakpoint-down('sm') {
        padding: 0;
      }
    }
    .close {
      background-color: transparent;
      background-image: url(~assets/icons/icon-close.png);
      background-position: center center;
      background-repeat: no-repeat;
      background-size: contain;
      border: 0;
      height: 1rem;
      opacity: 1;
      position: absolute;
      top: $spacer;
      right: $spacer;
      width: 1rem;
    }
    table {
      margin-bottom: #{$spacer * 4.5};
      @include media-breakpoint-down('sm') {
        margin-bottom: #{$spacer * 4};
      }
      td {
        @include media-breakpoint-down('sm') {
          font-size: $font-size-sm;
          line-height: 1.3;
        }
        + td {
          text-align: right;
        }
      }
    }
  }
  &__term {
    font-size: #{$font-size-base * 1.714285714285714};
  }
  &__p {
    margin-bottom: 0;
    &:last-child {
      margin-bottom: #{$spacer * 4.25} !important;
      @include media-breakpoint-down('sm') {
        margin-bottom: #{$spacer * 2.5} !important;
      }
    }
    &.recommended {
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
    }
  }
  &__apply-btn {
    font-size: $font-size-base;
    margin-bottom: #{$spacer * .75};
    padding: 7.2px 0;
    width: 100%;
  }
  &__connect {
    text-align: center;
    @include media-breakpoint-down('sm') {
      margin-bottom: #{$spacer * 3.875} !important;
    }
    &__link {
      font-size: $font-size-sm;
      font-weight: $font-weight-normal;
    }
  }
  &__datetime {
    font-size: #{$font-size-sm * 0.875};
    font-style: italic;
    margin-bottom: 1em;
    opacity: 0.5;
    text-align: right;
    @include media-breakpoint-down('sm') {
      display: none;
    }
  }
  &__table-info {
    font-size: $font-size-sm;
    margin-bottom: #{$spacer * 3.875} !important;
  }
}
</style>
