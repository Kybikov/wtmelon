<template>
  <nav class="navbar" :class="{ sticky: isSticky }">
    <div class="container">
      <div class="row justify-content-between align-items-center">
        <router-link to="/" class="logo">
          <span class="logo-icon">🍉</span>
          <span class="logo-text">Watermelon</span>
        </router-link>

        <ul class="menu" :class="{ active: menuOpen }">
          <li class="nav-item">
            <a href="#home" class="nav-link" @click="closeMenu">Главная</a>
          </li>
          <li class="nav-item">
            <a href="#products" class="nav-link" @click="closeMenu">Подписки</a>
          </li>
          <li class="nav-item">
            <a href="#about" class="nav-link" @click="closeMenu">О нас</a>
          </li>
          <li class="nav-item">
            <a href="#contact" class="nav-link" @click="closeMenu">Контакты</a>
          </li>
        </ul>

        <div class="menu-btn" @click="toggleMenu">
          <i class="fa-solid fa-bars"></i>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      isSticky: false,
      menuOpen: false
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
