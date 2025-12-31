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
/* --- КОНТЕЙНЕР --- */
/* Важливо: задаємо висоту контейнеру, щоб було де "плавати" */
.img-box {
  position: relative;
  width: 100%;
  height: 500px; /* Збільшив висоту для простору */
  /* Можна додати тимчасову рамку, щоб бачити межі блоку: */
  /* border: 1px dashed red; */
}

.floating-icons {
  width: 100%;
  height: 100%;
}

/* --- БАЗОВИЙ СТИЛЬ ІКОНКИ --- */
.floating-icon {
  position: absolute;
  width: 75px; /* Середній розмір */
  height: auto;
  /* Глибша, м'якша тінь для 3D ефекту */
  filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.2));
  will-change: transform; /* Оптимізація анімації */
}

/* --- ІНДИВІДУАЛЬНІ ПОЗИЦІЇ ТА АНІМАЦІЇ --- */

/* Spotify (Верхній лівий кут) */
/* Рухається повільно, по діагоналі */
.icon-1 {
  top: 10%;
  left: 10%;
  width: 85px; /* Трохи більша */
  animation: floatDiagonal 6s ease-in-out infinite;
}

/* ChatGPT (Нижній правий кут) */
/* Рухається швидше, починається з іншої фази */
.icon-2 {
  bottom: 15%;
  right: 10%;
  width: 75px;
  /* Негативна затримка (-2s) робить рух розсинхронізованим */
  animation: floatVertical 4.5s ease-in-out -2s infinite;
}

/* Canva (Центр) */
/* Найбільша, плаває найповільніше і в інший бік */
.icon-3 {
  top: 50%;
  left: 50%;
  /* Зміщуємо центр іконки в центр контейнера */
  margin-left: -45px; 
  margin-top: -45px;
  width: 90px;
  z-index: 2; /* Поверх інших, якщо перетнуться */
  animation: floatDiagonalReverse 7s ease-in-out -1s infinite;
}


/* --- КЕЙФРЕЙМИ АНІМАЦІЙ (Сценарії руху) --- */

/* Сценарій 1: Плавання вгору і трохи вправо */
@keyframes floatDiagonal {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(15px, -25px) rotate(3deg); }
}

/* Сценарій 2: Плавання вниз і трохи вліво (зворотній) */
@keyframes floatDiagonalReverse {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(-15px, 25px) rotate(-3deg); }
}

/* Сценарій 3: Більш вертикальне плавання */
@keyframes floatVertical {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-30px); }
}

/* --- АДАПТИВ --- */
@media (max-width: 768px) {
  .img-box {
     height: 350px; /* Менша висота на мобільних */
     margin-bottom: 50px;
  }
  .floating-icon {
     transform-origin: center;
     scale: 0.8; /* Зменшуємо всі іконки на 20% */
  }
}
</style>