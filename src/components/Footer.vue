<template>
  <footer class="section-padding">
    <div class="container">
      <div class="row">
        <div class="left-col">
          <router-link to="/" class="logo">
            <span class="logo-icon">🍉</span>
            <span class="logo-text">Watermelon</span>
          </router-link>
          <div class="social-media">
            <a href="#"><i class="fa-brands fa-telegram"></i></a>
            <a href="#"><i class="fa-brands fa-instagram"></i></a>
            <a href="#"><i class="fa-brands fa-youtube"></i></a>
          </div>
          <div class="footer-links">
            <router-link to="/privacy" class="footer-link">{{ t.footer.privacy }}</router-link>
            <router-link to="/terms" class="footer-link">{{ t.footer.terms }}</router-link>
          </div>
          <p class="left-text">&copy; 2024 Watermelon. {{ t.footer.rights }}</p>
        </div>

        <div class="right-col">
          <h1>{{ t.footer.newsletter }}</h1>
          <div class="border"></div>
          <p>{{ t.footer.newsletterDesc }}</p>

          <form @submit.prevent="handleSubscribe" class="newsletter-form">
            <input
              type="email"
              v-model="email"
              class="txtb"
              :placeholder="t.footer.email"
              required
            >
            <button type="submit" class="btn1">{{ t.footer.subscribe }}</button>
          </form>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { useLanguage } from '../composables/useLanguage'

export default {
  name: 'Footer',
  setup() {
    const { t } = useLanguage()
    return { t }
  },
  data() {
    return {
      email: ''
    }
  },
  methods: {
    handleSubscribe() {
      alert(this.t.footer.subscribeSuccess)
      this.email = ''
    }
  }
}
</script>
