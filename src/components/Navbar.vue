<template>
  <nav class="navbar" :class="{ sticky: isSticky }">
    <div class="container">
      <div class="nav-row">
        <router-link to="/" class="logo">
          <img src="/banner_2.png" alt="Watermelon" class="logo-banner">
        </router-link>

        <ul class="menu" :class="{ active: menuOpen }">
          <li class="nav-item">
            <a href="#products" class="nav-link" @click="closeMenu">{{ t('nav.products') }}</a>
          </li>
          <li class="nav-item">
            <a href="#about" class="nav-link" @click="closeMenu">{{ t('nav.about') }}</a>
          </li>
          <li class="nav-item">
            <a href="#partners" class="nav-link" @click="closeMenu">{{ t('nav.partners') }}</a>
          </li>
          <li class="nav-item">
            <a href="#reviews" class="nav-link" @click="closeMenu">{{ t('nav.reviews') }}</a>
          </li>
          <li class="nav-item">
            <a href="#how-it-works" class="nav-link" @click="closeMenu">{{ t('nav.howItWorks') }}</a>
          </li>
          <li class="nav-item">
            <a href="#contact" class="nav-link" @click="closeMenu">{{ t('nav.contact') }}</a>
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

          <router-link v-if="user" to="/cabinet" class="cabinet-link">
            <i class="fa-solid fa-user"></i>
          </router-link>
          <router-link v-else to="/login" class="login-link">
            <i class="fa-solid fa-right-to-bracket"></i>
          </router-link>

          <div class="menu-btn" @click="toggleMenu">
            <i class="fa-solid fa-bars"></i>
          </div>
        </div>
      </div>
    </div>

    <button class="theme-toggle desktop-only" @click="toggleTheme" :title="isDark ? 'Light mode' : 'Dark mode'">
      <i :class="isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'"></i>
    </button>

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
  </nav>
</template>

<script>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useLocale } from '../composables/useLocale'
import { useTheme } from '../composables/useTheme'
import { useAuth } from '../composables/useAuth'

export default {
  name: 'Navbar',
  setup() {
    const route = useRoute()
    const { locale, setLocale, initLocale, t } = useLocale()
    const { isDark, toggleTheme } = useTheme()
    const { user } = useAuth()

    onMounted(() => {
      initLocale(route.params.locale)
    })

    return {
      currentLanguage: locale,
      setLocale,
      t,
      isDark,
      toggleTheme,
      user
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
      return lang ? lang.label : 'EN'
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
      this.setLocale(code)
      this.langMenuOpen = false
      this.closeMenu()
    }
  }
}
</script>

<style scoped>
.cabinet-link,
.login-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: var(--bg-color);
  color: var(--primary-color);
  text-decoration: none;
  transition: var(--transition);
  box-shadow: var(--shadow);
  margin-left: 8px;
  font-size: 18px;
}

.cabinet-link:hover,
.login-link:hover {
  background: var(--primary-color);
  color: white;
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .cabinet-link,
  .login-link {
    width: 42px;
    height: 42px;
    font-size: 16px;
    margin-left: 8px;
  }
}
</style>
