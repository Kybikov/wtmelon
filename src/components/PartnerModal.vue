<template>
  <Transition name="modal">
    <div v-if="modelValue" class="modal-overlay" @click="closeModal">
      <div class="modal-container partner-modal" @click.stop>
        <button class="modal-close" @click="closeModal">
          <i class="fas fa-times"></i>
        </button>

        <div class="modal-header">
          <div class="partner-logo-large">
            <img :src="partner.logo" :alt="partner.name">
          </div>
          <div>
            <h2>{{ t(`partners.${partner.id}.name`) }}</h2>
          </div>
        </div>

        <div class="modal-body">
          <div class="partner-description">
            <p>{{ t(`partners.${partner.id}.description`) }}</p>
          </div>

          <div class="partnership-section">
            <h4><i class="fas fa-handshake"></i> {{ t('partners.partnershipTitle') }}</h4>
            <p>{{ t(`partners.${partner.id}.partnership`) }}</p>
          </div>

          <div class="benefits-section">
            <h4><i class="fas fa-star"></i> {{ t('partners.benefitsTitle') }}</h4>
            <ul class="benefits-list">
              <li v-for="(benefit, index) in t(`partners.${partner.id}.benefits`)" :key="index">
                <i class="fas fa-check-circle"></i>
                <span>{{ benefit }}</span>
              </li>
            </ul>
          </div>

          <div class="modal-footer">
            <a
              :href="t(`partners.${partner.id}.website`)"
              target="_blank"
              rel="noopener noreferrer"
              class="btn1 visit-btn"
            >
              <i class="fas fa-external-link-alt"></i>
              {{ t('partners.visitWebsite') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import { useLocale } from '../composables/useLocale'

export default {
  name: 'PartnerModal',
  props: {
    modelValue: {
      type: Boolean,
      required: true
    },
    partner: {
      type: Object,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { t } = useLocale()

    const closeModal = () => {
      emit('update:modelValue', false)
    }

    return {
      t,
      closeModal
    }
  }
}
</script>
