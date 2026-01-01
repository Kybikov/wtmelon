<template>
  <div>
    <div v-if="menuOpen" class="menu-overlay" @click="closeMenu"></div>
    <nav class="navbar" :class="{ sticky: isSticky, 'force-light': isLoginPage }">
      <div class="container">
        <div class="nav-row">
          <router-link to="/" class="logo">
            <img src="/banner_2.png" alt="Watermelon" class="logo-banner">
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

            <li v-if="!isAuthenticated" class="nav-item mobile-only">
              <router-link to="/login" class="nav-link" @click="closeMenu">
                <i class="fa-solid fa-user"></i>
                {{ t.nav.login }}
              </router-link>
            </li>

            <li v-else class="nav-item mobile-only">
              <router-link to="/dashboard" class="nav-link" @click="closeMenu">
                <i class="fa-solid fa-user-circle"></i>
                {{ currentUser?.name?.split(' ')[0] }}
              </router-link>
            </li>

            <li class="nav-item mobile-only">
              <div class="mobile-controls">
                <div class="mobile-language-switcher">
                  <button class="lang-toggle" @click="toggleLangMenu">
                    <i class="fa-solid fa-globe"></i>
                    <span class="current-lang">{{ getCurrentLangLabel }}</span>
                    <i class="fa-solid fa-chevron-down" :class="{ rotated: langMenuOpen }"></i>
                  </button>
                  <div v-if="langMenuOpen" class="lang-dropdown">
                    <button
                      v-for="lang in languages"
                      :key="lang.code"
                      :class="['lang-option', { active: currentLanguage === lang.code }]"
                      @click="selectLanguage(lang.code)"
                    >
                      <span class="lang-flag">{{ lang.flag }}</span>
                      <span class="lang-name">{{ lang.name }}</span>
                      <i v-if="currentLanguage === lang.code" class="fa-solid fa-check"></i>
                    </button>
                  </div>
                </div>

                <button class="theme-toggle" @click="toggleTheme" :title="isDark ? 'Light mode' : 'Dark mode'">
                  <i :class="isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'"></i>
                </button>
              </div>
            </li>
          </ul>

          <div class="nav-controls">
            <a href="tel:+380633084244" class="phone-link">
              <i class="fa-solid fa-phone"></i>
              <span class="phone-number">+380 63 308 42 44</span>
            </a>

            <div class="language-switcher desktop-only">
              <button class="lang-toggle" @click="toggleLangMenu">
                <i class="fa-solid fa-globe"></i>
                <span class="current-lang">{{ getCurrentLangLabel }}</span>
                <i class="fa-solid fa-chevron-down" :class="{ rotated: langMenuOpen }"></i>
              </button>
              <div v-if="langMenuOpen" class="lang-dropdown">
                <button
                  v-for="lang in languages"
                  :key="lang.code"
                  :class="['lang-option', { active: currentLanguage === lang.code }]"
                  @click="selectLanguage(lang.code)"
                >
                  <span class="lang-flag">{{ lang.flag }}</span>
                  <span class="lang-name">{{ lang.name }}</span>
                  <i v-if="currentLanguage === lang.code" class="fa-solid fa-check"></i>
                </button>
              </div>
            </div>

            <button class="theme-toggle desktop-only" @click="toggleTheme" :title="isDark ? 'Light mode' : 'Dark mode'">
              <i :class="isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'"></i>
            </button>

            <router-link v-if="!isAuthenticated" to="/login" class="login-btn desktop-only">
              <i class="fa-solid fa-user"></i>
              <span>{{ t.nav.login }}</span>
            </router-link>

            <router-link v-else to="/dashboard" class="profile-btn desktop-only">
              <i class="fa-solid fa-user-circle"></i>
              <span>{{ currentUser?.name?.split(' ')[0] }}</span>
            </router-link>

            <div class="menu-btn" @click="toggleMenu" :class="{ active: menuOpen }">
              <i :class="menuOpen ? 'fa-solid fa-times' : 'fa-solid fa-bars'"></i>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { useLanguage } from '../composables/useLanguage'
import { useTheme } from '../composables/useTheme'
import { useAuth } from '../composables/useAuth'
import { useRoute } from 'vue-router'

export default {
  name: 'Navbar',
  setup() {
    const { currentLanguage, setLanguage, t } = useLanguage()
    const { isDark, toggleTheme } = useTheme()
    const { isAuthenticated, currentUser } = useAuth()
    const route = useRoute()

    return {
      currentLanguage,
      setLanguage,
      t,
      isDark,
      toggleTheme,
      isAuthenticated,
      currentUser,
      route
    }
  },
  data() {
    return {
      isSticky: false,
      menuOpen: false,
      langMenuOpen: false,
      languages: [
        { code: 'uk', label: 'UA', name: 'Українська', flag: '🇺🇦' },
        { code: 'ru', label: 'RU', name: 'Русский', flag: '🇷🇺' },
        { code: 'en', label: 'EN', name: 'English', flag: '🇬🇧' },
        { code: 'de', label: 'DE', name: 'Deutsch', flag: '🇩🇪' }
      ]
    }
  },
  computed: {
    getCurrentLangLabel() {
      const lang = this.languages.find(l => l.code === this.currentLanguage)
      return lang ? lang.label : 'UA'
    },
    isLoginPage() {
      return this.route.path === '/login'
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
      this.langMenuOpen = false
    },
    closeMenu() {
      this.menuOpen = false
    },
    toggleLangMenu() {
      this.langMenuOpen = !this.langMenuOpen
    },
    selectLanguage(code) {
      this.setLanguage(code)
      this.langMenuOpen = false
    }
  }
}
</script>
