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
            <h2>
              {{ resultDetails.term }}
            </h2>
            <p>
              <strong>Interest Rate:</strong> {{ resultDetails.rate | percent }}<br>
              <strong>APR:</strong> {{ resultDetails.apr | percent }}<br>
              <strong>One Fee Guarantee:</strong> {{ resultDetails.oneFeeGuarantee | currency }}
            </p>
          </div>
          <div class="col">
            <nuxt-link
              to="/apply"
              class="btn btn-primary"
            >
              Apply
            </nuxt-link>
            <p>
              <nuxt-link
                to="/connect"
                class="link-decorated"
              >
                Talk to a Loan Consultant
              </nuxt-link>
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="search-results-details__datetime">
              {{ resultDetails.date | datetime }}
            </div>
            <table class="table table-striped">
              <tbody>
                <tr>
                  <td scope="col">
                    One Fee Guarantee
                  </td>
                  <td scope="col">
                    {{ resultDetails.oneFeeGuarantee | currency }}
                  </td>
                </tr>
                <tr>
                  <td scope="col">
                    Home Value
                  </td>
                  <td scope="col">
                    {{ homeValue | currency }}
                  </td>
                </tr>
                <tr>
                  <td scope="col">
                    Loan Amount
                  </td>
                  <td scope="col">
                    {{ loanAmount | currency }}
                  </td>
                </tr>
                <tr>
                  <td scope="col">
                    Monthly Payment
                  </td>
                  <td scope="col">
                    {{ resultDetails.monthlyPayment | currency }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <hr>
            <p>
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
  props: {
    resultDetails: {
      type: Object,
      default () {
        return null
      }
    }
  },
  methods: {
    closeDetailsModal (event) {
      this.$parent.hideDetails()
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/variables.scss';

.search-results-details {
  background-color: rgba($black,.16);
  bottom: 0;
  left: 0;
  overflow-y: auto;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 1001;
  &__wrapper {
    background-color: $white;
    box-shadow: 0 0 1rem rgba($black,.16);
    margin: auto;
    max-width: 720px;
    padding: #{$spacer * 3.75} #{$spacer * 1.75};
    position: relative;
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
      td + td {
        text-align: right;
      }
    }
  }
}
</style>
