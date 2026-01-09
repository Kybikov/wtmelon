<template>
  <section id="reviews" class="reviews-section">
    <div class="container">
      <div class="section-title">
        <h2 class="title">{{ t('reviews.title') }}</h2>
        <p class="subtitle">{{ t('reviews.subtitle') }}</p>
      </div>

      <div class="reviews-content">
        <div class="review-sample">
          <div class="review-card rozetka-review">
            <div class="review-header">
              <div class="review-platform">
                <i class="fa-solid fa-store"></i>
                <span>Rozetka</span>
              </div>
              <div class="review-rating">
                <i class="fa-solid fa-star"></i>
                <span>5.0</span>
              </div>
            </div>
            <div class="review-body">
              <p class="review-author">{{ t('reviews.sampleReview.author') }}</p>
              <p class="review-text">{{ t('reviews.sampleReview.text') }}</p>
            </div>
          </div>

          <div class="review-card telegram-review">
            <div class="review-header">
              <div class="review-platform">
                <i class="fa-brands fa-telegram"></i>
                <span>Telegram</span>
              </div>
              <div class="review-emoji">
                <span>❤️</span>
                <span>🔥</span>
              </div>
            </div>
            <div class="review-body">
              <p class="review-author">{{ t('reviews.sampleReview2.author') }}</p>
              <p class="review-text">{{ t('reviews.sampleReview2.text') }}</p>
            </div>
          </div>
        </div>

        <div class="reviews-cta">
          <p class="cta-text">{{ t('reviews.ctaText') }}</p>
          <div class="cta-buttons">
            <a
              href="https://rozetka.com.ua/ua/seller/watermelon-shop/reviews/"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-review rozetka-btn"
            >
              <i class="fa-solid fa-store"></i>
              {{ t('reviews.rozetkaButton') }}
            </a>
            <a
              href="https://t.me/+iPCoDFFJ2Y00NzJi"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-review telegram-btn"
            >
              <i class="fa-brands fa-telegram"></i>
              {{ t('reviews.telegramButton') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useLocale } from '../composables/useLocale'

export default {
  name: 'Reviews',
  setup() {
    const { t } = useLocale()
    return { t }
  }
}
</script>
