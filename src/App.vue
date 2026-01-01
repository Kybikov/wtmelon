<template>
  <div id="app">
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { useSEO } from './composables/useSEO'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  setup() {
    useSEO()
  }
}
</script>
