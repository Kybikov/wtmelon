<template>
  <section id="reviews" class="reviews-section">
    <div class="section-title">
      <h2 class="title">{{ t('reviews.title') }}</h2>
      <p class="subtitle">{{ t('reviews.subtitle') }}</p>
    </div>

    <div class="reviews-carousel">
      <div class="reviews-track">
        <div
          v-for="(review, index) in duplicatedReviews"
          :key="`review-${index}`"
          class="review-card"
          :class="review.platform === 'telegram' ? 'telegram-review' : 'rozetka-review'"
        >
          <div class="review-header">
            <div class="review-platform">
              <i :class="review.platform === 'telegram' ? 'fa-brands fa-telegram' : 'fa-solid fa-store'"></i>
              <span>{{ review.platform === 'telegram' ? 'Telegram' : 'Rozetka' }}</span>
            </div>
            <div v-if="review.platform === 'rozetka'" class="review-rating">
              <i class="fa-solid fa-star"></i>
              <span>5.0</span>
            </div>
          </div>
          <div class="review-body">
            <p class="review-author">{{ review.author }}</p>
            <p class="review-text">{{ review.text }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
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
  </section>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useLocale } from '../composables/useLocale'

export default {
  name: 'Reviews',
  setup() {
    const { t, locale } = useLocale()
    const reviewItems = ref([])

    const loadReviews = async () => {
      try {
        const response = await fetch(`/locales/${locale.value}.json`)
        if (response.ok) {
          const data = await response.json()
          reviewItems.value = data.reviews?.items || []
        }
      } catch (error) {
        console.error('Failed to load reviews:', error)
        reviewItems.value = []
      }
    }

    watch(locale, loadReviews, { immediate: true })

    const duplicatedReviews = computed(() => {
      const items = reviewItems.value
      return [...items, ...items, ...items]
    })

    return { t, duplicatedReviews }
  }
}
</script>
