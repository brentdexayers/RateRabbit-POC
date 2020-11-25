<template>
  <div
    @click.self="toggleRateAlert"
    class="rate-alert"
  >
    <div class="rate-alert__wrapper">
      <button
        @click="toggleRateAlert"
        class="close"
      />
      <div class="container">
        <div class="row">
          <div class="col">
            <div
              v-if="leadData.productId === loanProduct.productId"
            >
              <p>
                Thank you for signing up for rate alerts with RateRabbit.
              </p>
              <p>
                <a
                  @click="toggleRateAlert"
                  class="link-decorated"
                >
                  {{ 'Back to Rate Details' | titlecase }}
                </a>
              </p>
            </div>
            <RateAlertForm
              v-else
              :loanProduct="loanProduct"
              @leadCreateSuccess="toggleLeadSuccess"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import RateAlertForm from '~/components/forms/RateAlertForm.vue'

export default {
  components: {
    RateAlertForm
  },
  props: {
    loanProduct: {
      type: Object,
      default () {
        return {}
      }
    },
    showRateAlert: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      leadSuccess: false
    }
  },
  computed: {
    ...mapState({
      leadData: state => state.lead
    })
  },
  methods: {
    toggleRateAlert () {
      this.$emit('rateAlert')
    },
    toggleLeadSuccess () {
      this.leadSuccess = !this.leadSuccess
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/variables.scss';
@import '~bootstrap/scss/mixins.scss';

.rate-alert {
  align-items: center;
  background-color: rgba($black,.16);
  bottom: 0;
  display: flex;
  left: 0;
  overflow-y: auto;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 20001;
  &__wrapper {
    background-color: $light;
    box-shadow: 0 0 1rem rgba($black,.16);
    margin: auto;
    max-width: 720px;
    padding: #{$spacer * 3.75} #{$spacer * 1.75};
    position: relative;
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
}
</style>
