<template>
  <div class="product-card">
    <div class="product-header">
      <img :src="product.icon" :alt="product.name" class="product-icon">
      <h3>{{ product.name }}</h3>
    </div>
    <p class="product-description">{{ product.description }}</p>

    <div class="plan-selector">
      <h4>Выберите план</h4>
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
      <ul class="features">
        <li v-for="(feature, index) in selectedPlan.features" :key="index">
          <i class="fa-solid fa-check"></i> {{ feature }}
        </li>
      </ul>

      <div class="duration-selector">
        <h4>Длительность</h4>
        <div class="durations">
          <button
            v-for="(price, months) in selectedPlan.prices"
            :key="months"
            :class="['duration-btn', { active: selectedDuration === months }]"
            @click="selectDuration(months)"
          >
            <span class="months">{{ months }} мес</span>
            <span class="price">{{ price }}₽</span>
          </button>
        </div>
      </div>

      <div v-if="selectedDuration" class="total-price">
        <span class="label">Итого:</span>
        <span class="amount">{{ selectedPlan.prices[selectedDuration] }}₽</span>
      </div>

      <button class="btn1 buy-btn" @click="buyProduct">
        Купить сейчас
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selectedPlan: null,
      selectedDuration: null
    }
  },
  methods: {
    selectPlan(plan) {
      this.selectedPlan = plan
      this.selectedDuration = null
    },
    selectDuration(months) {
      this.selectedDuration = months
    },
    buyProduct() {
      if (!this.selectedPlan || !this.selectedDuration) {
        alert('Пожалуйста, выберите план и длительность')
        return
      }

      const message = `
        Товар: ${this.product.name}
        План: ${this.selectedPlan.name}
        Длительность: ${this.selectedDuration} мес.
        Цена: ${this.selectedPlan.prices[this.selectedDuration]}₽
      `
      alert(`Отлично! Товар добавлен в корзину:\n${message}`)
    }
  }
}
</script>
