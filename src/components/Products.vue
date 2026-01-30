<template>
  <section class="product-items section-padding" id="products">
    <div class="container">
      <div class="row">
        <div class="section-title">
          <h1 class="title">{{ t('products.title') }}</h1>
          <h2 class="subtitle">{{ t('products.subtitle') }}</h2>
        </div>
      </div>

      <div v-if="loading" class="products-loading">
        <div class="loading-spinner"></div>
        <p>Loading...</p>
      </div>

      <div v-else-if="error" class="products-error">
        <i class="fa-solid fa-circle-exclamation"></i>
        <p>Error loading products</p>
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
import { useLocale } from '../composables/useLocale'

export default {
  name: 'Products',
  components: {
    ProductCard,
    ProductModal
  },
  setup() {
    const { locale, t } = useLocale()
    return { currentLanguage: locale, t }
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
        const lang = this.currentLanguage || 'en'
        const response = await fetch(`/.netlify/functions/catalog?lang=${encodeURIComponent(lang)}`)

        if (!response.ok) {
          throw new Error(`Failed to load products: HTTP ${response.status}`)
        }

        this.products = await response.json()
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
