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
            <span class="highlight">Подписки</span> на стриминговые сервисы
          </h2>
          <p>
            Выгодные предложения на Spotify, Deezer и другие популярные сервисы.
            Индивидуальные, семейные и групповые планы. Надежно, быстро, выгодно.
          </p>
          <a href="#products" class="btn1">Смотреть подписки</a>
        </div>

        <div class="home-image">
          <div class="img-box">
            <div class="floating-icons">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/168px-Spotify_logo_without_text.svg.png"
                alt="Spotify"
                class="floating-icon icon-1"
              >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Deezer_logo.svg/200px-Deezer_logo.svg.png"
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
export default {
  name: 'Hero'
}
</script>
