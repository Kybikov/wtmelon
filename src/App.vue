<template>
  <div id="app">
    <LoadingSpinner v-if="loading" />
    <template v-else>
      <Navbar />
      <router-view />
      <Footer />
    </template>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import LoadingSpinner from './components/LoadingSpinner.vue'
import { useSEO } from './composables/useSEO'
import { useLocale } from './composables/useLocale'
import { useAuth } from './composables/useAuth'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    LoadingSpinner
  },
  setup() {
    useSEO()
    const { loading } = useLocale()
    const { initAuth } = useAuth()

    onMounted(() => {
      initAuth()
    })

    return {
      loading: computed(() => loading.value)
    }
  }
}
</script>
