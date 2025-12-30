<template>
  <div class="home-page">
    <Hero />
    <Products />
    <About />
    <Contact />
  </div>
</template>

<script>
import Hero from '../components/Hero.vue'
import Products from '../components/Products.vue'
import About from '../components/About.vue'
import Contact from '../components/Contact.vue'

export default {
  name: 'Home',
  components: {
    Hero,
    Products,
    About,
    Contact
  }
}
</script>
