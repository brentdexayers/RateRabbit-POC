<template>
  <div>
    <form
      id="application-form"
      action="/apply"
      method="POST"
      class="form form--apply"
      @submit.prevent="formValidate"
    >
      <h3 class="form--apply__header">
        Start the loan application process
      </h3>
      <p v-if="formHasErrors" class="text-danger">
        Please complete the application form.
      </p>
      <div class="row">
        <div class="form-group col-12 col-lg-6">
          <label
            for="firstName"
            :class="{ hasvalue: firstName }"
          >
            {{ 'First Name' | titlecase }}
          </label>
          <input
            v-model="firstName"
            type="text"
            class="form-control"
            name="firstName"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
          >
        </div>
        <div class="form-group col-12 col-lg-6">
          <label
            for="lastName"
            :class="{ hasvalue: lastName }"
          >
            {{ 'Last Name' | titlecase }}
          </label>
          <input
            v-model="lastName"
            type="text"
            class="form-control"
            name="lastName"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
          >
        </div>
      </div>
      <div class="row">
        <div class="form-group col-12 col-lg-6">
          <label
            for="phone"
            :class="{ hasvalue: phone }"
          >
            {{ 'Phone Number' | titlecase }}
          </label>
          <input
            v-model="phone"
            type="text"
            class="form-control"
            name="phone"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
          >
        </div>
        <div class="form-group col-12 col-lg-6">
          <label
            for="email"
            :class="{ hasvalue: email }"
          >
            {{ 'Email Address' | titlecase }}
          </label>
          <input
            v-model="email"
            type="text"
            class="form-control"
            name="email"
            @focus="focusClassAdd($event)"
            @blur="focusClassRemove($event)"
          >
        </div>
      </div>
      <div class="row">
        <div class="form-group col-12">
          <button
            type="submit"
            name="submit"
            class="btn btn-primary form--apply__submit mt-4"
          >
            {{ 'Submit' | titlecase }}
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-5">
          <p class="form--apply__footer">
            Your information is private, and will be submitted over secure connections.
          </p>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formHasErrors: false
    }
  },
  computed: {
    firstName: {
      get () {
        return this.$store.state.application.firstName
      },
      set (value) {
        this.$store.commit('application/setFirstName', value)
      }
    },
    lastName: {
      get () {
        return this.$store.state.application.lastName
      },
      set (value) {
        this.$store.commit('application/setLastName', value)
      }
    },
    phone: {
      get () {
        return this.$store.state.application.phone
      },
      set (value) {
        this.$store.commit('application/setPhone', value)
      }
    },
    email: {
      get () {
        return this.$store.state.application.email
      },
      set (value) {
        this.$store.commit('application/setEmail', value)
      }
    }
  },
  methods: {
    focusClassAdd (event) {
      const self = event.target
      self.previousElementSibling.classList.add('focused')
    },
    focusClassRemove (event) {
      const self = event.target
      self.previousElementSibling.classList.remove('focused')
    },
    formValidate () {
      this.formHasErrors = false
      if (!this.firstName) {
        this.formHasErrors = true
      }
      if (!this.lastName) {
        this.formHasErrors = true
      }
      if (!this.phone) {
        this.formHasErrors = true
      }
      if (!this.email) {
        this.formHasErrors = true
      }
      if (!this.formHasErrors) {
        this.$store.commit('application/setCompleted', true)
      } else {

      }
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/variables.scss';
@import '~bootstrap/scss/mixins.scss';

.form--apply {
  &__header {
    color: $primary;
    font-size: 21px;
    font-weight: bold;
    line-height: 32px;
  }
  &__submit {
    @include media-breakpoint-down('sm') {
      font-size: $font-size-lg;
      margin-top: #{$spacer * 1.625};
      padding-bottom: #{$spacer * 0.6875};
      padding-top: #{$spacer * 0.6875};
      width: 100%;
    }
  }
  &__footer {
    color: $input-placeholder-color;
    font-size: #{$font-size-sm * 0.75};
    font-style: italic;
    line-height: 1.333333333333333;
    @include media-breakpoint-down('sm') {
      padding: 0 #{$spacer * 2};
      text-align: center;
    }
  }
}
</style>
