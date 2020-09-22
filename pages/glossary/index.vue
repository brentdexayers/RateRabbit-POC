<template>
  <div class="page-content page--credit">
    <p>
      <nuxt-link to="/help" class="link-decorated">
        Help Guides
      </nuxt-link>
    </p>
    <ul class="nav nav-pills">
      <li
        v-for="termKey in glossary"
        :key="termKey.id"
        class="nav-link"
      >
        <a
          :href="termKey.id | nospecialchars | anchor"
          class="nav-item"
        >
          {{ termKey.id }}
        </a>
      </li>
    </ul>
    <dl
      v-for="terms in glossary"
      :key="terms.id | nospecialchars"
    >
      <a :id="terms.id | nospecialchars" />
      <template
        v-for="term in terms.terms"
      >
        <dt
          :id="term.name | nospecialchars"
          :key="term.name | nospecialchars"
        >
          {{ term.name }}
        </dt>
        <dd
          :key="term.name | nospecialchars"
        >
          {{ term.description }}
        </dd>
      </template>
    </dl>
    <p>
      <nuxt-link to="/help" class="link-decorated">
        Help Guides
      </nuxt-link>
    </p>
  </div>
</template>

<script>
import glossary from '~/mixins/glossaryTerms.js'

export default {
  layout: 'default',
  data () {
    return {
      title: 'Glossary of Terms',
      glossary
    }
  },
  async fetch ({ store, params }) {
  },
  head () {
    return {
      title: this.title,
      titleTemplate: '%s',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: 'Glossary of Terms' }
      ]
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/variables.scss';

dl {
  position: relative;
  a {
    position: absolute;
    top: -#{$spacer * 6.875};
  }
}
</style>
