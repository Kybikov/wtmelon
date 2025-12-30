<template>
  <section class="product-items section-padding" id="products">
    <div class="container">
      <div class="row">
        <div class="section-title">
          <h1 class="title">Наши подписки</h1>
          <h2 class="subtitle">Выберите подходящий вариант</h2>
        </div>
      </div>

      <div class="products-grid">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </section>
</template>

<script>
import ProductCard from './ProductCard.vue'

export default {
  name: 'Products',
  components: {
    ProductCard
  },
  data() {
    return {
      products: []
    }
  },
  async mounted() {
    try {
      const response = await fetch('/products.json')
      this.products = await response.json()
    } catch (error) {
      console.error('Ошибка загрузки товаров:', error)
    }
  }
}
</script>
