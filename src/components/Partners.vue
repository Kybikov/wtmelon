<template>
  <section class="partners-section section-padding" id="partners">
    <div class="container">
      <div class="section-title">
        <h2 class="title">{{ t('partners.title') }}</h2>
        <p class="subtitle">{{ t('partners.subtitle') }}</p>
      </div>
      <div class="partners-grid">
        <div class="partner-card">
          <div class="partner-logo">
            <img src="https://4cd6555acz.ucarecd.net/9bd83bd9-1ef4-4e7f-9c40-53e0f6fcd99a/rozetka.svg" alt="Rozetka">
          </div>
          <h3>Rozetka</h3>
        </div>
        <div class="partner-card">
          <div class="partner-logo">
            <img src="https://4cd6555acz.ucarecd.net/75766c92-72a1-4d8e-aad4-dd8e07bef87e/sweettv.svg" alt="Sweet TV">
          </div>
          <h3>Sweet TV</h3>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useLocale } from '../composables/useLocale'

export default {
  name: 'Partners',
  setup() {
    const { t } = useLocale()
    return { t }
  }
}
</script>
