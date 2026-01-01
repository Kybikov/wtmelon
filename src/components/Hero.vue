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
                src="https://5odmiluatb.ucarecd.net/7c52764e-df5a-4991-a93f-b346ead9aedb/Adobe_Creative_Cloud_rainbow_iconsvg.png"
                alt="ChatGPT"
                class="floating-icon icon-2"
              >
              <img
                src="https://5odmiluatb.ucarecd.net/dce730b1-d163-4131-91d1-05e0911b997a/ApplicationEmoji_AgADrDsAAu6SYUo.png"
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
.img-box {
  position: relative;
  width: 100%;
  max-width: 450px;
  height: 400px; /* Фіксуємо висоту, щоб була гарна композиція */
  margin: 0 auto; /* Центруємо сам блок */
}

.floating-icons {
  position: relative;
  width: 100%;
  height: 100%;
}

/* --- ЗАГАЛЬНИЙ ВИГЛЯД ІКОНОК --- */
.floating-icon {
  position: absolute;
  height: auto;
  filter: drop-shadow(0 15px 25px rgba(0, 0, 0, 0.15)); /* М'яка тінь */
  transition: all 0.3s ease;
}

/* --- КРАСИВЕ РОЗТАШУВАННЯ (ТРИКУТНИК) --- */

/* 1. Spotify — Лівий нижній кут (Основа) */
.icon-1 {
  width: 80px;
  bottom: 15%; /* Відступ знизу */
  left: 8%;    /* Відступ зліва */
  animation: floatSlow 7s ease-in-out infinite;
}

/* 2. ChatGPT — Правий нижній кут (Основа) */
.icon-2 {
  width: 75px;
  bottom: 25%; /* Трохи вище за Spotify */
  right: 8%;   /* Відступ справа */
  animation: floatMid 5s ease-in-out infinite;
  animation-delay: 1s; /* Стартує пізніше */
}

/* 3. Canva — Верхній центр (Вершина трикутника) */
.icon-3 {
  width: 90px; /* Найбільша іконка як акцент */
  top: 15%;    /* Високо зверху */
  left: 50%;   /* Рівно по центру по горизонталі */
  transform: translateX(-50%); /* Центрування самої іконки */
  animation: floatCenter 6s ease-in-out infinite;
  z-index: 2; /* Вона "ближче" до глядача */
}


/* --- АНІМАЦІЇ (Різні для кожного, щоб було живим) --- */

/* Плавний рух вгору-вниз з легким погойдуванням */
@keyframes floatSlow {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(2deg); }
}

/* Рух трохи активніший */
@keyframes floatMid {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-25px) rotate(-2deg); }
}

/* Центральна іконка плаває строго вертикально, велично */
@keyframes floatCenter {
  0%, 100% { transform: translateX(-50%) translateY(0); } /* Зберігаємо центрування по X */
  50% { transform: translateX(-50%) translateY(-15px); }
}

/* --- МОБІЛЬНА ВЕРСІЯ --- */
@media (max-width: 768px) {
  .img-box {
    height: 300px; /* Зменшуємо висоту блоку */
    margin-top: 20px;
  }
  
  .floating-icon {
    transform-origin: center;
    scale: 0.8; /* Робимо всі іконки трохи меншими */
  }
}
</style>