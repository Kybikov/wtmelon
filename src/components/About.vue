<template>
  <section class="about-section section-padding" id="about">
    <div class="container">
      <div class="row">
        <div class="about-img">
          <div class="img-box">
            <img src="https://res.cloudinary.com/dtvh4rws0/image/upload/v1767721003/32_j4gavw.jpg" alt="Watermelon" class="watermelon-logo">
          </div>
        </div>

        <div class="about-text">
          <div class="section-title">
            <h2 class="title">{{ t('about.title') }}</h2>
            <p class="subtitle-desc">{{ t('about.subtitle') }}</p>
          </div>

          <div class="about-content">
            <div class="mission-block">
              <h3>{{ t('about.mission.title') }}</h3>
              <p>{{ t('about.mission.description') }}</p>
            </div>

            <div class="services-block">
              <h3>{{ t('about.services.title') }}</h3>
              <p class="intro-text">{{ t('about.services.description') }}</p>

              <div class="services-list">
                <div class="service-item">
                  <i class="fa-solid fa-play-circle"></i>
                  <div>
                    <strong>{{ t('about.services.item1') }}</strong>
                    <span>{{ t('about.services.item1desc') }}</span>
                  </div>
                </div>

                <div class="service-item">
                  <i class="fa-solid fa-fire"></i>
                  <div>
                    <strong>{{ t('about.services.item2') }}</strong>
                    <span>{{ t('about.services.item2desc') }}</span>
                  </div>
                </div>

                <div class="service-item">
                  <i class="fa-solid fa-gift"></i>
                  <div>
                    <strong>{{ t('about.services.item3') }}</strong>
                    <span>{{ t('about.services.item3desc') }}</span>
                  </div>
                </div>

                <div class="service-item">
                  <i class="fa-solid fa-globe"></i>
                  <div>
                    <strong>{{ t('about.services.item4') }}</strong>
                    <span>{{ t('about.services.item4desc') }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="how-work-block">
              <h3>{{ t('about.howWeWork.title') }}</h3>
              <p class="intro-text">{{ t('about.howWeWork.description') }}</p>

              <div class="steps-inline">
                <div class="step-badge">1. {{ t('about.howWeWork.step1') }}</div>
                <i class="fa-solid fa-arrow-right arrow-icon"></i>
                <div class="step-badge">2. {{ t('about.howWeWork.step2') }}</div>
                <i class="fa-solid fa-arrow-right arrow-icon"></i>
                <div class="step-badge">3. {{ t('about.howWeWork.step3') }}</div>
              </div>

              <div class="guarantee-line">
                <i class="fa-solid fa-shield-check"></i>
                <span>{{ t('about.howWeWork.guarantee') }}</span>
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
