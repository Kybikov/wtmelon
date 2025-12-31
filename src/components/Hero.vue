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
            <div class="floating-icons">
              <img
                src="https://5odmiluatb.ucarecd.net/abf1a71e-11bc-4e4e-9533-2d8c0691c3ba/spotify_alt_macos_bigsur_icon_189703.png"
                alt="Spotify"
                class="floating-icon icon-1"
              >
              <img
                src="https://5odmiluatb.ucarecd.net/2d718fcc-1a45-4daa-9835-47b47773f4a9/ApplicationEmoji_AgADrDsAAu6SYUo.jpeg"
                alt="Deezer"
                class="floating-icon icon-2"
              >
            </div>
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
