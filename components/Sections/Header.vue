<template>
  <div class="container header">

    <div class="logo">
      <ImageResponsive
        class="img"
        imageURL="logo.png"
        alt="Julie Cline Logo"
        width="100%"
      />
    </div>

    <ul class="routes">
      <li><nuxt-link class="route" to="/">HOME</nuxt-link></li>
      <li><nuxt-link class="route" to="about">ABOUT</nuxt-link></li>
      <li><nuxt-link class="route" to="lately">LATELY</nuxt-link></li>
      <li><nuxt-link class="route" to="art">ART</nuxt-link></li>
      <li><nuxt-link class="route" to="travel">TRAVEL</nuxt-link></li>
      <li><nuxt-link class="route" to="a-day-in-the-life">A DAY IN THE LIFE</nuxt-link></li>
    </ul>
    
  </div>
</template>

<script>
export default {
  name: 'app-header'
}
</script>

<style lang="scss">
.header {
  padding-top: 7rem;
  padding-bottom: 7rem;
}
.logo {
  margin-bottom: 4rem;

  .img {
    width: 250px;
    margin: 0 auto;
  }
}
.routes {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  li {
    margin: 0 3rem;
  }
}
.route:not(.nuxt-link-exact-active) {
  color: grey;
}
.route.nuxt-link-exact-active {
  text-decoration: underline;
}
</style>
