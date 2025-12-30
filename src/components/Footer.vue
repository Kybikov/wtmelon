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
            <a href="#"><i class="fa-brands fa-vk"></i></a>
            <a href="#"><i class="fa-brands fa-instagram"></i></a>
            <a href="#"><i class="fa-brands fa-youtube"></i></a>
          </div>
          <div class="footer-links">
            <router-link to="/privacy" class="footer-link">Политика конфиденциальности</router-link>
            <router-link to="/terms" class="footer-link">Договор оферты</router-link>
          </div>
          <p class="left-text">&copy; 2024 Watermelon. Все права защищены</p>
        </div>

        <div class="right-col">
          <h1>Рассылка</h1>
          <div class="border"></div>
          <p>Подпишитесь на рассылку и получайте эксклюзивные предложения</p>

          <form @submit.prevent="handleSubscribe" class="newsletter-form">
            <input
              type="email"
              v-model="email"
              class="txtb"
              placeholder="Введите ваш email"
              required
            >
            <button type="submit" class="btn1">Подписаться</button>
          </form>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      email: ''
    }
  },
  methods: {
    handleSubscribe() {
      alert(`Спасибо за подписку! Email: ${this.email}`)
      this.email = ''
    }
  }
}
</script>
