<template>
  <div class="home-page">
    <Hero />
    <Products />
    <About />
    <Reviews />
    <Partners />
    <Contact />
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useLocale } from '../composables/useLocale'
import Hero from '../components/Hero.vue'
import Products from '../components/Products.vue'
import About from '../components/About.vue'
import Reviews from '../components/Reviews.vue'
import Partners from '../components/Partners.vue'
import Contact from '../components/Contact.vue'

export default {
  name: 'Home',
  components: {
    Hero,
    Products,
    About,
    Reviews,
    Partners,
    Contact
  },
  setup() {
    const route = useRoute()
    const { initLocale } = useLocale()

    onMounted(() => {
      initLocale(route.params.locale)
    })
  }
}
</script>
