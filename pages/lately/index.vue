<template>
  <div class="page-index">
    <div class="container">
      <h2>Lately</h2>
      <BlogSection :blogs="blogs" />
    </div>
    <BlogCarousel :blogs="blogs" />
  </div>
</template>

<script>
  import BlogCarousel from "~/components/carousel/BlogCarousel"
  import BlogSection from "~/components/Sections/BlogSection"
  import { getBlogSection } from '~/services/blogs.js'

  export default {
    scrollToTop: false,
    middleware: 'scroll',
    components: { BlogSection, BlogCarousel },
    transition: {
      name: 'slide-fade'
    },
    head () {
      return {
        title: this.$t('indexPageHead.title'),
        htmlAttrs: {
          lang: this.$i18n.locale,
        },
        meta: [
          { name: "author", content: "Julie Cline" },
          { name: "description", property: "og:description", content: this.$t('indexPageHead.description'), hid: "description" },
          { property: "og:title", content: this.$t('indexPageHead.title') },
          { property: "og:image", content: this.ogImage },
          { name: "twitter:description", content: this.$t('indexPageHead.description') },
          { name: "twitter:image", content: this.ogImage }
        ]
      };
    },
    async asyncData ({app}) {
      return getBlogSection('lately')
    },
    computed: {
      ogImage: function () {
        return;
      }
    }
  }

function getBlogRoutes(blogs) {
  let routes = []
  for (let section in blogs) {
    blogs[section].forEach(blog => {
      routes.push(`${section}/${blog}`)
    })
  }
  return routes
}

</script>

<style lang="scss" scoped>
.container {
  padding: 0 0 5rem;  

  h2 {
    display: none;
    font-size: 2rem;
    color: $primary;
  }
}
</style>