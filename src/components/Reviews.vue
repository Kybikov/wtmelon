<template>
  <section id="reviews" class="reviews-section">
    <div class="section-title">
      <h2 class="title">{{ t('reviews.title') }}</h2>
      <p class="subtitle">{{ t('reviews.subtitle') }}</p>
    </div>

    <div class="reviews-carousel">
      <div
        ref="carouselRef"
        class="reviews-wrapper"
        @mousedown="startDrag"
        @mousemove="drag"
        @mouseup="endDrag"
        @mouseleave="endDrag"
        @touchstart="startDrag"
        @touchmove="drag"
        @touchend="endDrag"
      >
        <div class="reviews-track" :style="trackStyle">
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
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import { useLocale } from '../composables/useLocale'

export default {
  name: 'Reviews',
  setup() {
    const { t, locale } = useLocale()
    const reviewItems = ref([])
    const carouselRef = ref(null)
    const scrollPosition = ref(0)
    const isDragging = ref(false)
    const startX = ref(0)
    const scrollLeft = ref(0)
    const isAutoScrolling = ref(true)
    const animationFrame = ref(null)

    const loadReviews = async () => {
      try {
        const response = await fetch(`/locales/${locale.value}.json`)
        if (response.ok) {
          const data = await response.json()
          const items = data.reviews?.items || []

          const rozetkaReview = items.find(r => r.platform === 'rozetka')
          const telegramReviews = items.filter(r => r.platform === 'telegram')

          const middleIndex = Math.floor(telegramReviews.length / 2)
          const reorderedItems = [
            ...telegramReviews.slice(0, middleIndex),
            rozetkaReview,
            ...telegramReviews.slice(middleIndex)
          ].filter(Boolean)

          reviewItems.value = reorderedItems
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

    const trackStyle = computed(() => ({
      transform: `translateX(${scrollPosition.value}px)`,
      transition: isDragging.value ? 'none' : 'transform 0.05s linear'
    }))

    const autoScroll = () => {
      if (!isAutoScrolling.value || !carouselRef.value) return

      scrollPosition.value -= 1

      const track = carouselRef.value.querySelector('.reviews-track')
      if (track) {
        const trackWidth = track.scrollWidth / 3
        if (Math.abs(scrollPosition.value) >= trackWidth) {
          scrollPosition.value = 0
        }
      }

      animationFrame.value = requestAnimationFrame(autoScroll)
    }

    const startDrag = (e) => {
      isDragging.value = true
      isAutoScrolling.value = false
      startX.value = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX
      scrollLeft.value = scrollPosition.value
      if (carouselRef.value) {
        carouselRef.value.style.cursor = 'grabbing'
      }
    }

    const drag = (e) => {
      if (!isDragging.value) return
      e.preventDefault()
      const x = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX
      const walk = (x - startX.value) * 1.5
      scrollPosition.value = scrollLeft.value + walk
    }

    const endDrag = () => {
      if (!isDragging.value) return
      isDragging.value = false
      if (carouselRef.value) {
        carouselRef.value.style.cursor = 'grab'
      }
      setTimeout(() => {
        isAutoScrolling.value = true
        autoScroll()
      }, 2000)
    }

    onMounted(() => {
      autoScroll()
    })

    onUnmounted(() => {
      if (animationFrame.value) {
        cancelAnimationFrame(animationFrame.value)
      }
    })

    return {
      t,
      duplicatedReviews,
      carouselRef,
      trackStyle,
      startDrag,
      drag,
      endDrag
    }
  }
}
</script>
