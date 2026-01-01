<template>
  <div class="product-card" @click="$emit('click')">
    <div class="product-icon-wrapper">
      <img :src="product.icon" :alt="product.name" class="product-icon">
    </div>

    <h3>{{ product.name }}</h3>
    <p class="product-short-desc">{{ product.shortDescription }}</p>

    <div class="product-price">
      <span class="from-label">{{ t('productCard.from') }}</span>
      <span class="price-amount">{{ currency }}{{ minPrice }}</span>
    </div>

    <button class="btn-details">
      {{ t('productCard.learnMore') }}
      <i class="fa-solid fa-arrow-right"></i>
    </button>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useLocale } from '../composables/useLocale'

export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  emits: ['click'],
  setup(props) {
    const { locale, currency, t } = useLocale()

    const minPrice = computed(() => {
      let min = Infinity
      props.product.plans.forEach(plan => {
        const prices = plan.prices
        Object.values(prices).forEach(price => {
          if (typeof price === 'number' && price < min) {
            min = price
          }
        })
      })
      return min === Infinity ? 0 : min
    })

    return {
      locale,
      currency,
      t,
      minPrice
    }
  }
}
</script>
