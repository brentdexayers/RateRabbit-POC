<template>
  <article class="page-content">
    <p class="page-content__intro">
      Have a question or concern? We are here to help.
    </p>
    <p>
      <b>(888) 395-0395</b> Toll-free<br>
      <b>(619) 280-0655</b> San Diego
    </p>
    <p>
      <b>Efax:</b> 619-285-5104<br>
      <b>Email:</b> <a href="mailto:info@raterabbit.com">info@raterabbit.com</a><br>
      <b>Website:</b> <a href="/">www.raterabbit.com</a>
    </p>
    <p>
      <b>Rate Rabbit Headquarters:</b> <a href="https://www.google.com/maps/place/Rate+Rabbit+Home+Loans/@32.7111518,-117.1670554,17z/data=!3m1!4b1!4m5!3m4!1s0x80d9535701dee22d:0xe579c2af2f739e13!8m2!3d32.7111518!4d-117.1648667" target="_blank">540 Front St. San Diego, CA 92101 (Map)</a>
    </p>
    <div v-if="leadCreated" class="alert alert-success p-4">
      <p>Thank you for contacting RateRabbit. One of our representatives will get back to you shortly.</p>
      <button
        @click="startNew"
        class="btn btn-primary mt-2"
      >
        {{ 'Ask Another Question' | titlecase }}
      </button>
    </div>
    <div v-else>
      <Form
        @leadCreateStart="handleLeadStart"
        @leadCreateSuccess="handleLeadSuccess"
        @leadCreateError="handleLeadError"
        @leadCreateEnd="handleLeadEnd"
        comments
        lead-description="Connect form submission"
      />
      <div class="row">
        <div class="col-12 col-md-5">
          <p class="form--apply__footer">
            Your information is private, and will be submitted over secure connections.
          </p>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import { mapState } from 'vuex'

import Form from '~/components/forms/LeadForm.vue'

export default {
  layout: 'default',
  components: {
    Form
  },
  data () {
    return {
      leadCreated: false,
      loading: false,
      step: 0,
      throwError: false,
      title: 'Connect'
    }
  },
  computed: {
    ...mapState({
      applicationData: state => state.application.data,
      leadData: state => state.lead
    })
  },
  mounted () {
    if (this.leadData.id) {
      this.leadCreated = true
    }
  },
  methods: {
    handleLeadStart () {
      this.loading = true
      this.throwError = false
    },
    handleLeadSuccess () {
      this.throwError = false
      this.leadCreated = true
    },
    handleLeadError () {
      this.throwError = true
    },
    handleLeadEnd () {
      this.loading = false
    },
    startNew () {
      this.leadCreated = false
    }
  },
  head () {
    return {
      title: this.title,
      titleTemplate: '%s',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: 'Connect with a RateRabbit loan consultant' }
      ]
    }
  }
}
</script>

<style lang="scss">
.page-content {
  &__intro {
    margin-bottom: 55px;
  }
}
</style>
