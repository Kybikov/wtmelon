<template>
  <nav class="navbar" :class="{ sticky: isSticky }">
    <div class="container">
      <div class="nav-row">
        <router-link to="/" class="logo">
          <span class="logo-icon">🍉</span>
          <span class="logo-text">Watermelon</span>
        </router-link>

        <ul class="menu" :class="{ active: menuOpen }">
          <li class="nav-item">
            <a href="#home" class="nav-link" @click="closeMenu">{{ t.nav.home }}</a>
          </li>
          <li class="nav-item">
            <a href="#products" class="nav-link" @click="closeMenu">{{ t.nav.services }}</a>
          </li>
          <li class="nav-item">
            <a href="#about" class="nav-link" @click="closeMenu">{{ t.nav.about }}</a>
          </li>
          <li class="nav-item">
            <a href="#contact" class="nav-link" @click="closeMenu">{{ t.nav.contact }}</a>
          </li>
        </ul>

        <div class="nav-controls">
          <div class="language-switcher">
            <button
              v-for="lang in languages"
              :key="lang.code"
              :class="['lang-btn', { active: currentLanguage === lang.code }]"
              @click="setLanguage(lang.code)"
            >
              {{ lang.label }}
            </button>
          </div>

          <button class="theme-toggle" @click="toggleTheme" :title="isDark ? 'Light mode' : 'Dark mode'">
            <i :class="isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'"></i>
          </button>

          <div class="menu-btn" @click="toggleMenu">
            <i class="fa-solid fa-bars"></i>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useLanguage } from '../composables/useLanguage'
import { useTheme } from '../composables/useTheme'

export default {
  name: 'Navbar',
  setup() {
    const { currentLanguage, setLanguage, t } = useLanguage()
    const { isDark, toggleTheme } = useTheme()

    return {
      currentLanguage,
      setLanguage,
      t,
      isDark,
      toggleTheme
    }
  },
  data() {
    return {
      isSticky: false,
      menuOpen: false,
      languages: [
        { code: 'uk', label: 'UA' },
        { code: 'ru', label: 'RU' },
        { code: 'en', label: 'EN' }
      ]
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.isSticky = window.scrollY > 20
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen
    },
    closeMenu() {
      this.menuOpen = false
    }
  }
}
</script>
