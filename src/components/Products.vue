<template>
  <section class="product-items section-padding" id="products">
    <div class="container">
      <div class="row">
        <div class="section-title">
          <h1 class="title">{{ t.services.title }}</h1>
          <h2 class="subtitle">{{ t.services.subtitle }}</h2>
        </div>
      </div>

      <div v-if="loading" class="products-loading">
        <div class="loading-spinner"></div>
        <p>{{ t.services.loading || 'Loading...' }}</p>
      </div>

      <div v-else-if="error" class="products-error">
        <i class="fa-solid fa-circle-exclamation"></i>
        <p>{{ t.services.error || 'Error loading products' }}</p>
      </div>

      <div v-else class="products-grid">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          @click="openModal(product)"
        />
      </div>
    </div>

    <ProductModal
      :show="showModal"
      :product="selectedProduct"
      @close="closeModal"
    />
  </section>
</template>

<script>
import ProductCard from './ProductCard.vue'
import ProductModal from './ProductModal.vue'
import { useLanguage } from '../composables/useLanguage'

export default {
  name: 'Products',
  components: {
    ProductCard,
    ProductModal
  },
  setup() {
    const { currentLanguage, t } = useLanguage()
    return { currentLanguage, t }
  },
  data() {
    return {
      products: [],
      loading: true,
      error: false,
      showModal: false,
      selectedProduct: null
    }
  },
  async mounted() {
    await this.loadProducts()
  },
  watch: {
    currentLanguage() {
      this.loadProducts()
    }
  },
  methods: {
    async loadProducts() {
      this.loading = true
      this.error = false

      try {
        const response = await fetch(`/products-${this.currentLanguage}.json`)

        if (!response.ok) {
          const fallback = await fetch('/products-uk.json')
          if (!fallback.ok) {
            throw new Error('Failed to load products')
          }
          this.products = await fallback.json()
        } else {
          this.products = await response.json()
        }
      } catch (error) {
        console.error('Error loading products:', error)
        this.error = true
        this.products = []
      } finally {
        this.loading = false
      }
    },
    openModal(product) {
      this.selectedProduct = product
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    }
  }
}
</script>
