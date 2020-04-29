<template>
  <article class="page-content">
    <p>
      NMLS Number: # 664689
    </p>
    <p>
      Rate Rabbit is currently licensed in the following states:
    </p>
    <ul>
      <li>
        Arizona Mortgage Banker License # 0919873
      </li>
      <li>
        California Licensed by the Department of Real Estate DRE#: # 01901658
      </li>
      <li>
        Idaho Department of Finance
        Mortgage Broker/Lender License
        NO. MBL-7709
      </li>
      <li>
        Massachusetts Mortgage Lender License Number: ML664689
      </li>
    </ul>
  </article>
</template>

<script>
export default {
  layout: 'default',
  components: {
    // Logo
  },
  data () {
    return {
      title: 'Licensing'
    }
  },
  async fetch ({ store, params }) {
  },
  head () {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: 'Licensing' }
      ]
    }
  }
}
</script>

<style>
</style>
