<template>
  <div class="blogSelected">
    <div class="intro">
      <div class="elevate-cover">
        <div class="elevate-cover__textOffset">
          <div class="elevate-cover__left">
            <!-- <nuxt-link :to="localePath('index')">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 4" aria-hidden="true" style="width: 16px; transform: rotate(180deg);">
                  <polygon fill="currentColor" points="0 2.33 4.72 2.33 3.53 3.53 4 4 6 2 4 0 3.53 0.47 4.72 1.67 0 1.67 0 2.33"/>
              </svg>
              {{ $t('comeBack') }}
            </nuxt-link> -->
          </div>
          <div class="elevate-cover__left">
            <h1 class="elevate-cover__title">
              {{ title }}
            </h1>
            <p class="elevate-cover__description">{{ description }}</p>
          </div>
        </div>
        <ImageResponsive
          :imageURL="'blog/' + id + '/_main.jpg'"
          width="100%"
          class="elevate-cover__img"
          :alt="'Blog picture'" />
      </div>
    </div>
    <div class="container small">
      <no-ssr>
        <DynamicMarkdown
          :render-func="renderFunc"
          :static-render-funcs="staticRenderFuncs"
        />
      </no-ssr>
    </div>
    <!-- <Subscribe/> -->
  </div>
</template>

<script lang="js">
  
  import DynamicMarkdown from "~/components/presentation/Markdown/DynamicMarkdown.vue"


  export default {
    scrollToTop: false,
    middleware: 'scroll',
    async asyncData ({params, app}) {
      const fileContent = await import(`~/contents/about/about.md`)
      const attr = fileContent.attributes
      return {
        name: params.slug,
        title: attr.title,
        trans: attr.trans,
        date: attr.date,
        id: attr.id,
        owner: attr.owner,
        colors: attr.colors,
        role: attr.role,
        cardAlt: attr.cardAlt,
        noMainImage: attr.noMainImage,
        description: attr.description,
        related: attr.related,
        renderFunc: fileContent.vue.render,
        staticRenderFuncs: fileContent.vue.staticRenderFns,
        image: {
          main: attr.image && attr.image.main,
          og: attr.image && attr.image.og
        }
      }
    },

    nuxtI18n: {
      seo: false
    },

    components: { DynamicMarkdown},

    head () {
      return {
        title: this.pageTitle,
        htmlAttrs: {
          lang: this.$i18n.locale,
        },
        meta: [
          { name: "author", content: "Julie Cline" },
          { name: "description", property: "og:description", content: this.description, hid: "description" },
          { property: "og:title", content: this.pageTitle },
          { property: "og:image", content: this.ogImage },
          { name: "twitter:description", content: this.description },
          { name: "twitter:image", content: this.ogImage }
        ],
        link: [
          this.hreflang
        ]
      };
    },

    transition: {
      name: 'slide-fade'
    },

    computed: {
      ogImage () {
        return `${process.env.baseUrl}/images/about/${this.id}/_thumbnail.jpg`;
      },
      pageTitle () {
        return this.title + ' – Julie Cline';
      },
      showLocales () {
        return this.$i18n.locales.filter(locale => locale.code !== this.$i18n.locale)
      },
      hreflang () {
        return ''
      },
    }
  }
</script>

<style lang="scss">
</style>
