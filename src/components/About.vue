<template>
  <section class="about-section section-padding" id="about">
    <div class="container">
      <div class="section-title text-center">
        <h2 class="title">{{ t('about.title') }}</h2>
        <p class="subtitle-text">{{ t('about.subtitle') }}</p>
      </div>

      <div class="about-content-wrapper">
        <div class="about-mission">
          <div class="mission-icon">
            <i class="fa-solid fa-bullseye"></i>
          </div>
          <h3>{{ t('about.mission.title') }}</h3>
          <p>{{ t('about.mission.description') }}</p>
        </div>

        <div class="about-services">
          <h3>{{ t('about.services.title') }}</h3>
          <p class="services-intro">{{ t('about.services.description') }}</p>

          <div class="services-grid">
            <div class="service-card">
              <div class="service-icon">
                <i class="fa-solid fa-play-circle"></i>
              </div>
              <h4>{{ t('about.services.item1') }}</h4>
              <p>{{ t('about.services.item1desc') }}</p>
            </div>

            <div class="service-card">
              <div class="service-icon">
                <i class="fa-solid fa-fire"></i>
              </div>
              <h4>{{ t('about.services.item2') }}</h4>
              <p>{{ t('about.services.item2desc') }}</p>
            </div>

            <div class="service-card">
              <div class="service-icon">
                <i class="fa-solid fa-gift"></i>
              </div>
              <h4>{{ t('about.services.item3') }}</h4>
              <p>{{ t('about.services.item3desc') }}</p>
            </div>

            <div class="service-card">
              <div class="service-icon">
                <i class="fa-solid fa-globe"></i>
              </div>
              <h4>{{ t('about.services.item4') }}</h4>
              <p>{{ t('about.services.item4desc') }}</p>
            </div>
          </div>
        </div>

        <div class="about-how-we-work">
          <h3>{{ t('about.howWeWork.title') }}</h3>
          <p class="how-we-work-intro">{{ t('about.howWeWork.description') }}</p>

          <div class="steps-container">
            <div class="step-item">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>{{ t('about.howWeWork.step1') }}</h4>
              </div>
            </div>

            <div class="step-arrow">
              <i class="fa-solid fa-arrow-right"></i>
            </div>

            <div class="step-item">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>{{ t('about.howWeWork.step2') }}</h4>
              </div>
            </div>

            <div class="step-arrow">
              <i class="fa-solid fa-arrow-right"></i>
            </div>

            <div class="step-item">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>{{ t('about.howWeWork.step3') }}</h4>
              </div>
            </div>
          </div>

          <div class="guarantee-badge">
            <i class="fa-solid fa-shield-check"></i>
            <span>{{ t('about.howWeWork.guarantee') }}</span>
          </div>
        </div>

        <div class="about-features">
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fa-solid fa-crown"></i>
            </div>
            <h4>{{ t('about.quality') }}</h4>
            <p>{{ t('about.qualityDesc') }}</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <i class="fa-solid fa-headset"></i>
            </div>
            <h4>{{ t('about.support') }}</h4>
            <p>{{ t('about.supportDesc') }}</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <i class="fa-solid fa-tag"></i>
            </div>
            <h4>{{ t('about.price') }}</h4>
            <p>{{ t('about.priceDesc') }}</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <i class="fa-solid fa-shield-halved"></i>
            </div>
            <h4>{{ t('about.safety') }}</h4>
            <p>{{ t('about.safetyDesc') }}</p>
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
