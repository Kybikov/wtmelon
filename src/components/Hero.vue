<template>
  <section class="home-section" id="home">
    <div class="effect-wrap">
      <div class="effect effect1"></div>
      <div class="effect effect2">
        <div v-for="n in 28" :key="n"></div>
      </div>
      <div class="effect effect3"></div>
      <div class="effect effect4">
        <div v-for="n in 8" :key="n"></div>
      </div>
    </div>

    <div class="container">
      <div class="row full-screen align-items-center">
        <div class="home-text">
          <h2>
            {{ t.hero.title }} <span class="highlight">{{ t.hero.subtitle }}</span>
          </h2>
          <p>{{ t.hero.description }}</p>
          <a href="#products" class="btn1">{{ t.hero.cta }}</a>
        </div>

        <div class="home-image">
          <div class="img-box">
            <img
              src="/banner_2.png"
              alt="Watermelon Banner"
              class="hero-banner"
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useLanguage } from '../composables/useLanguage'

export default {
  name: 'Hero',
  setup() {
    const { t } = useLanguage()
    return { t }
  }
}
</script>
