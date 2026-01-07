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

          <div class="mission-block">
            <h3>{{ t('about.mission.title') }}</h3>
            <p>{{ t('about.mission.description') }}</p>
          </div>
        </div>
      </div>

      <div class="services-section">
        <div class="section-header">
          <h2>{{ t('about.services.title') }}</h2>
          <p>{{ t('about.services.description') }}</p>
        </div>

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

      <div class="workflow-section" id="how-it-works">
        <div class="section-header">
          <h2>{{ t('about.howWeWork.title') }}</h2>
          <p>{{ t('about.howWeWork.description') }}</p>
        </div>

        <div class="workflow-steps">
          <div class="workflow-step">
            <div class="step-circle">
              <span class="step-num">01</span>
            </div>
            <div class="step-icon-wrapper">
              <i class="fa-solid fa-cart-shopping"></i>
            </div>
            <h4>{{ t('about.howWeWork.step1') }}</h4>
            <p>Оберіть потрібну підписку з нашого каталогу та оформіть замовлення</p>
          </div>

          <div class="workflow-arrow">
            <i class="fa-solid fa-arrow-right"></i>
          </div>

          <div class="workflow-step">
            <div class="step-circle">
              <span class="step-num">02</span>
            </div>
            <div class="step-icon-wrapper">
              <i class="fa-solid fa-gears"></i>
            </div>
            <h4>{{ t('about.howWeWork.step2') }}</h4>
            <p>Наші фахівці швидко обробляють ваше замовлення</p>
          </div>

          <div class="workflow-arrow">
            <i class="fa-solid fa-arrow-right"></i>
          </div>

          <div class="workflow-step">
            <div class="step-circle">
              <span class="step-num">03</span>
            </div>
            <div class="step-icon-wrapper">
              <i class="fa-solid fa-check-circle"></i>
            </div>
            <h4>{{ t('about.howWeWork.step3') }}</h4>
            <p>Отримуєте доступ та насолоджуєтесь сервісом</p>
          </div>
        </div>

        <div class="guarantee-box">
          <i class="fa-solid fa-shield-check"></i>
          <div>
            <strong>{{ t('about.howWeWork.guarantee') }}</strong>
            <span>Наша підтримка завжди на зв'язку, щоб допомогти вам</span>
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
