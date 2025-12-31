<template>
  <section class="about-section section-padding" id="about">
    <div class="container">
      <div class="row">
        <div class="about-img">
          <div class="img-box">
            <img src="https://5odmiluatb.ucarecd.net/654c7d6d-2928-46c8-b519-07cbbc59e3d4/32.jpg" alt="Watermelon" class="watermelon-logo">
          </div>
        </div>

        <div class="about-text">
          <div class="section-title">
            <h1 class="title">{{ t.about.title }}</h1>
            <h2 class="subtitle">{{ t.about.subtitle }}</h2>
          </div>

          <div class="about-content">
            <p>{{ t.about.description }}</p>

            <div class="features-list">
              <div class="feature-item">
                <i class="fa-solid fa-shield-halved"></i>
                <div>
                  <h4>{{ t.about.security.title }}</h4>
                  <p>{{ t.about.security.desc }}</p>
                </div>
              </div>

              <div class="feature-item">
                <i class="fa-solid fa-bolt"></i>
                <div>
                  <h4>{{ t.about.speed.title }}</h4>
                  <p>{{ t.about.speed.desc }}</p>
                </div>
              </div>

              <div class="feature-item">
                <i class="fa-solid fa-headset"></i>
                <div>
                  <h4>{{ t.about.support.title }}</h4>
                  <p>{{ t.about.support.desc }}</p>
                </div>
              </div>

              <div class="feature-item">
                <i class="fa-solid fa-tag"></i>
                <div>
                  <h4>{{ t.about.price.title }}</h4>
                  <p>{{ t.about.price.desc }}</p>
                </div>
              </div>
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
  name: 'About',
  setup() {
    const { t } = useLanguage()
    return { t }
  }
}
</script>
