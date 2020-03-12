<template>
  <div
    v-if="mode === 'development'"
    class="debug debug--wrapper"
  >
    <ul class="nav">
      <li class="nav-item">
        <a
          v-if="!searchFormDebugShow && !searchResultsDebugShow"
          @click.prevent="debugShow"
          href="#"
          class="nav-link debug__link"
        >
          {{ 'Show debug' | titlecase }}
        </a>
        <a
          v-else
          @click.prevent="debugHide"
          href="#"
          class="nav-link debug__link"
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
                @click.prevent="searchFormReset"
                class="reset mr-auto"
              >
                (Reset)
              </button>
              <button
                @click.prevent="searchFormDebugShow = !searchFormDebugShow"
                type="button"
                class="ml-2 mb-1 close"
                data-dismiss="toast"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
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
                @click.prevent="searchResultsReset"
                class="reset mr-auto"
              >
                (Reset)
              </button>
              <button
                @click.prevent="searchResultsDebugShow = !searchResultsDebugShow"
                type="button"
                class="ml-2 mb-1 close"
                data-dismiss="toast"
                aria-label="Close"
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
                @click.prevent="applicationReset"
                class="reset mr-auto"
              >
                (Reset)
              </button>
              <button
                @click.prevent="applicationDebugShow = !applicationDebugShow"
                type="button"
                class="ml-2 mb-1 close"
                data-dismiss="toast"
                aria-label="Close"
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
      this.$store.commit('application/reset')
    },
    searchResultsReset () {
      this.$store.commit('searchresults/reset')
    },
    applicationReset () {
      this.$store.commit('application/setcompletedStatus', false)
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
