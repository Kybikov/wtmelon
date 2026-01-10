<template>
  <footer class="section-padding">
    <div class="container">
      <div class="row">
        <div class="left-col">
          <router-link to="/" class="logo">
            <img src="/banner_2.png" alt="Watermelon" class="logo-banner">
          </router-link>
          <div class="social-media">
            <a href="https://t.me/wtmelon_ua" target="_blank" rel="noopener" title="Telegram"><i class="fa-brands fa-telegram"></i></a>
            <a href="https://instagram.com/wtmelon.ua" target="_blank" rel="noopener" title="Instagram"><i class="fa-brands fa-instagram"></i></a>
            <a href="https://wa.me/380633084244" target="_blank" rel="noopener" title="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
            <a href="viber://chat?number=%2B380633084244" target="_blank" rel="noopener" title="Viber"><i class="fa-brands fa-viber"></i></a>
            <a href="https://t.me/WTmelon" target="_blank" rel="noopener" title="Telegram Support"><i class="fa-solid fa-headset"></i></a>
          </div>
          <div class="payment-methods">
            <img src="https://4cd6555acz.ucarecd.net/794a6951-9d91-451a-9f34-3430da501606/Visa.png" alt="Visa" title="Visa">
            <img src="https://4cd6555acz.ucarecd.net/50c1c2bb-adad-4196-9371-887a18890732/Mastercard.png" alt="Mastercard" title="Mastercard">
          </div>
          <div class="footer-links">
            <router-link :to="privacyPath" class="footer-link">{{ t('nav.privacy') }}</router-link>
            <router-link :to="termsPath" class="footer-link">{{ t('nav.terms') }}</router-link>
            <router-link :to="refundPath" class="footer-link">{{ t('nav.refund') }}</router-link>
            <router-link :to="deliveryPath" class="footer-link">{{ t('nav.delivery') }}</router-link>
            <router-link :to="requisitesPath" class="footer-link">{{ t('nav.requisites') }}</router-link>
          </div>
          <p class="left-text">&copy; 2025 Watermelon. {{ t('footer.rights') }}</p>
          <p class="no-service-notice">{{ t('footer.noService') }}</p>
        </div>

        <div class="right-col">
          <h1>{{ t('footer.newsletter') }}</h1>
          <div class="border"></div>
          <p>{{ t('footer.newsletterDesc') }}</p>

          <form @submit.prevent="handleSubscribe" class="newsletter-form">
            <input
              type="email"
              v-model="email"
              class="txtb"
              :placeholder="t('footer.email')"
              required
            >
            <button type="submit" class="btn1">{{ t('footer.subscribe') }}</button>
          </form>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useLocale } from '../composables/useLocale'

export default {
  name: 'Footer',
  setup() {
    const route = useRoute()
    const { t, locale } = useLocale()

    const getLocalePath = (path) => {
      return computed(() => {
        if (locale.value === 'en') {
          return path
        }
        return `/${locale.value}${path}`
      })
    }

    return {
      t,
      privacyPath: getLocalePath('/privacy'),
      termsPath: getLocalePath('/terms'),
      refundPath: getLocalePath('/refund'),
      deliveryPath: getLocalePath('/delivery'),
      requisitesPath: getLocalePath('/requisites')
    }
  },
  data() {
    return {
      email: ''
    }
  },
  methods: {
    handleSubscribe() {
      alert(this.t('footer.subscribeSuccess'))
      this.email = ''
    }
  }
}
</script>
