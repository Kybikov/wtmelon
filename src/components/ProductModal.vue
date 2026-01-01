<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="modal-overlay" @click="handleOverlayClick">
        <div class="modal-container" @click.stop>
          <button class="modal-close" @click="$emit('close')">
            <i class="fa-solid fa-xmark"></i>
          </button>

          <div class="modal-header">
            <img :src="product.icon" :alt="product.name" class="modal-icon">
            <div>
              <h2>{{ product.name }}</h2>
              <p class="service-label">{{ product.shortDescription }}</p>
            </div>
          </div>

          <div class="modal-body">
            <p class="product-description">{{ product.description }}</p>

            <div class="plan-selector">
              <h4>{{ t('productModal.selectPlan') }}</h4>
              <div class="plans">
                <button
                  v-for="plan in product.plans"
                  :key="plan.id"
                  :class="['plan-btn', { active: selectedPlan?.id === plan.id }]"
                  @click="selectPlan(plan)"
                >
                  {{ plan.name }}
                </button>
              </div>
            </div>

            <div v-if="selectedPlan" class="plan-details">
              <p class="plan-desc">{{ selectedPlan.description }}</p>

              <div class="features-duration-grid">
                <div class="features-section">
                  <h4>{{ t('productModal.features') }}</h4>
                  <ul class="features">
                    <li v-for="(feature, index) in selectedPlan.features" :key="index">
                      <i class="fa-solid fa-check"></i>
                      {{ feature }}
                    </li>
                  </ul>
                </div>

                <div class="duration-section">
                  <h4>{{ t('productModal.selectPlan') }}</h4>
                  <div class="durations">
                    <button
                      v-for="(price, months) in localePrices"
                      :key="months"
                      :class="['duration-btn', { active: selectedDuration === months }]"
                      @click="selectDuration(months)"
                    >
                      <span class="months">{{ t('productModal.duration.' + months) }}</span>
                      <span class="price">{{ currency }}{{ price }}</span>
                    </button>
                  </div>
                </div>
              </div>

              <div v-if="selectedDuration" class="modal-footer">
                <div class="total-price">
                  <span class="label">{{ t('contact.telegram') }}:</span>
                  <span class="amount">{{ currency }}{{ getPrice(selectedDuration) }}</span>
                </div>
                <button class="btn1 order-btn" @click="handleOrder">
                  {{ t('contact.telegram') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
import { useLocale } from '../composables/useLocale'

export default {
  name: 'ProductModal',
  props: {
    show: Boolean,
    product: {
      type: Object,
      required: true
    }
  },
  emits: ['close'],
  setup() {
    const { locale, currency, t } = useLocale()
    return { locale, currency, t }
  },
  data() {
    return {
      selectedPlan: null,
      selectedDuration: null
    }
  },
  computed: {
    localePrices() {
      if (!this.selectedPlan) return {}
      return this.selectedPlan.prices[this.locale] || this.selectedPlan.prices
    }
  },
  watch: {
    show(newVal) {
      if (newVal) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
        this.selectedPlan = null
        this.selectedDuration = null
      }
    }
  },
  beforeUnmount() {
    document.body.style.overflow = ''
  },
  methods: {
    handleOverlayClick() {
      this.$emit('close')
    },
    selectPlan(plan) {
      this.selectedPlan = plan
      this.selectedDuration = null
    },
    selectDuration(months) {
      this.selectedDuration = months
    },
    getPrice(months) {
      return this.localePrices[months] || 0
    },
    handleOrder() {
      if (!this.selectedPlan || !this.selectedDuration) return

      const price = this.getPrice(this.selectedDuration)
      const message = `
${this.t('productModal.selectPlan')}: ${this.product.name}
${this.selectedPlan.name}
${this.t('productModal.duration.' + this.selectedDuration)}
${this.t('contact.telegram')}: ${this.currency}${price}
      `
      alert(message)
      this.$emit('close')
    }
  }
}
</script>
