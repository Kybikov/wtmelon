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
              <p class="service-label">{{ t.modal.serviceAccess }}</p>
            </div>
          </div>

          <div class="modal-body">
            <p class="product-description">{{ product.description[currentLanguage] }}</p>

            <div class="plan-selector">
              <h4>{{ t.modal.selectPlan }}</h4>
              <div class="plans">
                <button
                  v-for="plan in product.plans"
                  :key="plan.id"
                  :class="['plan-btn', { active: selectedPlan?.id === plan.id }]"
                  @click="selectPlan(plan)"
                >
                  {{ plan.name[currentLanguage] }}
                </button>
              </div>
            </div>

            <div v-if="selectedPlan" class="plan-details">
              <p class="plan-desc">{{ selectedPlan.description[currentLanguage] }}</p>

              <div class="features-duration-grid">
                <div class="features-section">
                  <h4>{{ t.modal.features }}</h4>
                  <ul class="features">
                    <li v-for="(feature, index) in selectedPlan.features[currentLanguage]" :key="index">
                      <i class="fa-solid fa-check"></i>
                      {{ feature }}
                    </li>
                  </ul>
                </div>

                <div class="duration-section">
                  <h4>{{ t.modal.duration }}</h4>
                  <div class="durations">
                    <button
                      v-for="(price, months) in selectedPlan.prices"
                      :key="months"
                      :class="['duration-btn', { active: selectedDuration === months }]"
                      @click="selectDuration(months)"
                    >
                      <span class="months">{{ months }} {{ t.modal.months }}</span>
                      <span class="price">{{ price }} ₴</span>
                    </button>
                  </div>
                </div>
              </div>

              <div v-if="selectedDuration" class="modal-footer">
                <div class="total-price">
                  <span class="label">{{ t.modal.total }}:</span>
                  <span class="amount">{{ selectedPlan.prices[selectedDuration] }} ₴</span>
                </div>
                <button class="btn1 order-btn" @click="handleOrder">
                  {{ t.modal.order }}
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
import { useLanguage } from '../composables/useLanguage'

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
    const { currentLanguage, t } = useLanguage()
    return { currentLanguage, t }
  },
  data() {
    return {
      selectedPlan: null,
      selectedDuration: null
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
    handleOrder() {
      if (!this.selectedPlan || !this.selectedDuration) return

      const message = `
Послуга: ${this.product.name}
План: ${this.selectedPlan.name[this.currentLanguage]}
Тривалість: ${this.selectedDuration} міс.
Ціна: ${this.selectedPlan.prices[this.selectedDuration]} ₴
      `
      alert(`Замовлення оформлено!\n${message}`)
      this.$emit('close')
    }
  }
}
</script>
