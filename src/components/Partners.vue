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
        logo: 'https://4cd6555acz.ucarecd.net/9bd83bd9-1ef4-4e7f-9c40-53e0f6fcd99a/rozetka.svg'
      },
      {
        id: 'sweettv',
        name: 'Sweet TV',
        logo: 'https://4cd6555acz.ucarecd.net/75766c92-72a1-4d8e-aad4-dd8e07bef87e/sweettv.svg'
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
