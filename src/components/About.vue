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
            <h1 class="title">{{ t('about.title') }}</h1>
          </div>

          <div class="about-content">
            <div class="features-list">
              <div class="feature-item">
                <i class="fa-solid fa-crown"></i>
                <div>
                  <h4>{{ t('about.quality') }}</h4>
                  <p>{{ t('about.qualityDesc') }}</p>
                </div>
              </div>

              <div class="feature-item">
                <i class="fa-solid fa-headset"></i>
                <div>
                  <h4>{{ t('about.support') }}</h4>
                  <p>{{ t('about.supportDesc') }}</p>
                </div>
              </div>

              <div class="feature-item">
                <i class="fa-solid fa-tag"></i>
                <div>
                  <h4>{{ t('about.price') }}</h4>
                  <p>{{ t('about.priceDesc') }}</p>
                </div>
              </div>

              <div class="feature-item">
                <i class="fa-solid fa-shield-halved"></i>
                <div>
                  <h4>{{ t('about.safety') }}</h4>
                  <p>{{ t('about.safetyDesc') }}</p>
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
import { useLocale } from '../composables/useLocale'

export default {
  name: 'About',
  setup() {
    const { t } = useLocale()
    return { t }
  }
}
</script>
