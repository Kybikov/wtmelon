<template>
  <div class="product-card" @click="$emit('click')">
    <div class="product-icon-wrapper">
      <img :src="product.icon" :alt="product.name" class="product-icon">
    </div>

    <h3>{{ product.name }}</h3>
    <p class="product-short-desc">{{ product.shortDescription }}</p>

    <div class="product-price">
      <span class="from-label">{{ t.services.from }}</span>
      <span class="price-amount">{{ minPrice }} ₴</span>
    </div>

    <button class="btn-details">
      {{ t.services.viewDetails }}
      <i class="fa-solid fa-arrow-right"></i>
    </button>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useLanguage } from '../composables/useLanguage'

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
    const { currentLanguage, t } = useLanguage()

    const minPrice = computed(() => {
      let min = Infinity
      props.product.plans.forEach(plan => {
        Object.values(plan.prices).forEach(price => {
          if (price < min) min = price
        })
      })
      return min
    })

    return {
      currentLanguage,
      t,
      minPrice
    }
  }
}
</script>
