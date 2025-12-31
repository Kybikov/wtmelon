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
                src="https://5odmiluatb.ucarecd.net/dce730b1-d163-4131-91d1-05e0911b997a/ApplicationEmoji_AgADrDsAAu6SYUo.png"
                alt="ChatGPT"
                class="floating-icon icon-2"
              >
              <img
                src="https://5odmiluatb.ucarecd.net/6ace973e-bdd4-469f-b083-95263e478bcd/canvaapplogoonatransparentbackgroundfreepng.png"
                alt="Adobe"
                class="floating-icon icon-3"
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


<style scoped>
/* Контейнер для зображення */
.img-box {
  position: relative;
  width: 100%;
  max-width: 450px; /* Обмеження ширини синього блоку */
  height: 400px; /* Висота блоку */
  margin: auto;
}

/* Обгортка іконок */
.floating-icons {
  position: relative;
  width: 100%;
  height: 100%;
}

/* Загальні стилі для всіх іконок */
.floating-icon {
  position: absolute; /* Це дозволяє рухати їх вільно всередині блоку */
  width: 70px; /* Розмір іконок */
  height: auto;
  filter: drop-shadow(0 10px 15px rgba(0,0,0,0.15)); /* Тінь для об'єму */
  animation: float 4s ease-in-out infinite; /* Анімація плавання */
}

/* --- КООРДИНАТИ ЛОГОТИПІВ --- */

/* Spotify (верхній лівий) */
.icon-1 {
  top: 15%;
  left: 10%;
  width: 80px; /* Можна зробити трохи більшим */
  animation-delay: 0s;
}

/* ChatGPT (нижній правий) */
.icon-2 {
  bottom: 20%;
  right: 15%;
  width: 75px;
  animation-delay: 1s;
}

/* Canva (десь посередині або зміщена) */
.icon-3 {
  top: 40%;
  right: 35%; 
  width: 90px;
  animation-delay: 2s;
}

/* Анімація плавання вгору-вниз */
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
}

/* Адаптив для мобільних (якщо потрібно) */
@media (max-width: 767px) {
  .img-box {
    height: 300px;
    margin-top: 30px;
  }
  .floating-icon {
    width: 50px; /* Менші іконки на телефоні */
  }
}
</style>