<template>
  <div class="layout">
    <app-header />
    <nuxt class="nuxt-content"/>
  </div>
</template>
<script>
  import AppHeader from '~/components/Sections/Header'

  export default {
    components: {
      AppHeader
    }
  }
</script>
<style lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.nuxt-content {
  flex-grow: 1;
}
</style>
