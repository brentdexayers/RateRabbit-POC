<template>
  <div
    v-if="mode === 'development'"
    class="debug debug--wrapper"
  >
    <ul class="nav">
      <li class="nav-item">
        <a
          v-if="!searchFormDebugShow && !searchResultsDebugShow"
          href="#"
          class="nav-link debug__link"
          @click.prevent="debugShow"
        >
          {{ 'Show debug' | titlecase }}
        </a>
        <a
          v-else
          href="#"
          class="nav-link debug__link"
          @click.prevent="debugHide"
        >
          {{ 'Hide debug' | titlecase }}
        </a>
      </li>
    </ul>
    <div class="container-fluid">
      <div class="row">
        <div v-if="searchFormDebugShow" class="col-auto">
          <div
            v-if="searchFormDebugShow"
            class="toast show"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div class="toast-header">
              <h4 class="">
                Search Form Data
              </h4>
              <button
                class="reset mr-auto"
                @click.prevent="searchFormReset"
              >
                (Reset)
              </button>
              <button
                type="button"
                class="ml-2 mb-1 close"
                data-dismiss="toast"
                aria-label="Close"
                @click.prevent="searchFormDebugShow = !searchFormDebugShow"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="toast-body">
              <code>
                {{ searchFormData }}
              </code>
            </div>
          </div>
        </div>
        <div v-if="searchResultsDebugShow" class="col-auto">
          <div
            v-if="searchResultsDebugShow"
            class="toast show"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div class="toast-header">
              <h4 class="">
                Search Results Data
              </h4>
              <button
                class="reset mr-auto"
                @click.prevent="searchResultsReset"
              >
                (Reset)
              </button>
              <button
                type="button"
                class="ml-2 mb-1 close"
                data-dismiss="toast"
                aria-label="Close"
                @click.prevent="searchResultsDebugShow = !searchResultsDebugShow"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="toast-body">
              <code>
                {{ searchResultsData }}
              </code>
            </div>
          </div>
        </div>
        <div v-if="applicationDebugShow" class="col-auto">
          <div
            v-if="applicationDebugShow"
            class="toast show"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div class="toast-header">
              <h4 class="">
                Application Data
              </h4>
              <button
                class="reset mr-auto"
                @click.prevent="applicationReset"
              >
                (Reset)
              </button>
              <button
                type="button"
                class="ml-2 mb-1 close"
                data-dismiss="toast"
                aria-label="Close"
                @click.prevent="applicationDebugShow = !applicationDebugShow"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="toast-body">
              <code>
                {{ applicationData }}
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    classes: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      searchFormDebugShow: false,
      searchResultsDebugShow: false,
      applicationDebugShow: false
    }
  },
  computed: {
    mode () {
      return process.env.mode
    },
    submitted () {
      return this.$store.state.searchform.submit.datetime
    },
    searchFormData () {
      const form = this.$store.state.searchform
      const values = []
      Object.keys(form.fields).forEach(function (key) {
        values.push({ [key]: form.fields[key].value })
      })
      return values
    },
    searchResultsData () {
      return this.$store.state.searchresults.results
    },
    applicationData () {
      return this.$store.state.application
    }
  },
  methods: {
    debugShow () {
      this.searchFormDebugShow = true
      this.searchResultsDebugShow = true
      this.applicationDebugShow = true
    },
    debugHide () {
      this.searchFormDebugShow = false
      this.searchResultsDebugShow = false
      this.applicationDebugShow = false
    },
    searchFormReset () {
      this.$store.commit('searchform/reset')
      this.$store.commit('searchform/clearErrors')
    },
    searchResultsReset () {
      this.$store.commit('searchresults/reset')
    },
    applicationReset () {
      this.$store.commit('application/setCompletedStatus', false)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/variables.scss';
@import '~bootstrap/scss/mixins.scss';

.debug {
  &--wrapper {
    background-color: $gray-700;
    border-top: 2px solid $danger;
    bottom: 0;
    left: 0;
    max-height: 40vh;
    overflow: auto;
    position: fixed;
    right: 0;
    z-index: 10009;
  }
  .nav {
    .nav-link {
      font-size: $font-size-sm;
      color: $white;
      &:hover {
        color: $gray-500;
      }
    }
  }
  &__link {
    &--reset {
      text-align: right;
    }
  }
  .toast {
    color: rgba($body-color, 0.5);
    &-header {
      h4 {
        margin-bottom: 0;
        margin-right: #{$spacer * .5};
      }
    }
    button {
      &.reset {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background-color: transparent;
        border: 0;
        color: $danger;
        padding: 0;
      }
    }
  }
}
</style>
