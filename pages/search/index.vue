<template>
  <article class="page-content article--search">
    <div>
      <h1 class="title">
        <strong>Search Live Rates</strong> and Lock Your Rate In
      </h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut laboriosam asperiores inventore, aperiam necessitatibus, ducimus magni iusto assumenda quibusdam aliquam harum unde esse libero, eaque officia sapiente illum incidunt vero.
      </p>
      <nuxt-link to="search" class="btn btn-primary">
        Search Live Rates
      </nuxt-link>
    </div>
  </article>
</template>

<script>
export default {
  layout: 'squeeze',
  components: {
    // Logo
  },
  data () {
    return {
      title: 'Search Rates'
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: 'Search Rates' }
      ]
    }
  }

}
</script>

<style lang="scss">
@import '@/assets/css/variables.scss';

.article--search {
  max-width: 420px;
  margin: 0 auto;
}
</style>
