<template>
  <section class="partners-section section-padding" id="partners">
    <div class="container">
      <div class="section-title">
        <h2 class="title">{{ t('partners.title') }}</h2>
        <p class="subtitle">{{ t('partners.subtitle') }}</p>
      </div>
      <div class="partners-grid">
        <div
          v-for="partner in partners"
          :key="partner.id"
          class="partner-card"
          @click="openPartnerModal(partner)"
        >
          <div class="partner-logo">
            <img :src="partner.logo" :alt="partner.name">
          </div>
          <h3>{{ partner.name }}</h3>
          <button class="btn-partner-details">
            {{ t('partners.learnMore') }}
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>

    <PartnerModal
      v-model="showModal"
      :partner="selectedPartner"
    />
  </section>
</template>

<script>
import { ref } from 'vue'
import { useLocale } from '../composables/useLocale'
import PartnerModal from './PartnerModal.vue'

export default {
  name: 'Partners',
  components: {
    PartnerModal
  },
  setup() {
    const { t } = useLocale()
    const showModal = ref(false)
    const selectedPartner = ref({})

    const partners = [
      {
        id: 'rozetka',
        name: 'Rozetka',
        logo: 'https://res.cloudinary.com/dtvh4rws0/image/upload/v1767861324/rozetka_gvyhg8.png'
      },
      {
        id: 'sweettv',
        name: 'Sweet TV',
        logo: 'https://res.cloudinary.com/dtvh4rws0/image/upload/v1767721612/sweet_mkz1x0.png'
      }
    ]

    const openPartnerModal = (partner) => {
      selectedPartner.value = partner
      showModal.value = true
    }

    return {
      t,
      partners,
      showModal,
      selectedPartner,
      openPartnerModal
    }
  }
}
</script>
