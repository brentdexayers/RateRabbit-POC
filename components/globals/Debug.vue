<template>
  <div class="debug debug--wrapper">
    <a
      href="#"
      class="debug__link"
      @click.prevent="toggleDebug"
    >
      <span v-if="!showDebug">
        Show debug
      </span>
      <span v-else>
        Hide debug
      </span>
    </a>
    <div
      class="toast"
      :class="{ show: showDebug, hide: !showDebug }"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-header">
        <strong class="mr-auto">Search Form Data</strong>
        <button
          type="button"
          class="ml-2 mb-1 close"
          data-dismiss="toast"
          aria-label="Close"
          @click.prevent="searchFormReset"
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
      showDebug: false
    }
  },
  computed: {
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
    }
  },
  methods: {
    toggleDebug () {
      this.showDebug = !this.showDebug
    },
    searchFormReset () {
      this.$store.commit('searchform/reset')
      this.$store.commit('searchform/clearErrors')
      // this.$store.commit('searchresults/reset')
      // this.$store.commit('application/reset')
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/variables.scss';
@import '~bootstrap/scss/mixins.scss';

.debug {
  &--wrapper {
    bottom: 1rem;
    left: 1rem;
    position: fixed;
    z-index: 10009;
    max-height: calc(100vh - 2rem);
    overflow: auto;
  }
  &__link {
    font-size: $font-size-sm;
    color: $danger;
    &--reset {
      text-align: right;
    }
  }
  .toast {
    color: rgba($body-color, 0.5);
  }
}
</style>
