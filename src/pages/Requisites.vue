<template>
  <div class="legal-page section-padding">
    <div class="container">
      <div class="legal-content">
        <h1>{{ t('requisites.title') }}</h1>
        <p class="updated">{{ t('requisites.updated') }}</p>

        <section>
          <h2>{{ t('requisites.section1.title') }}</h2>
          <p><strong>{{ t('requisites.section1.company') }}</strong> {{ t('requisites.section1.companyName') }}</p>
          <p><strong>{{ t('requisites.section1.registration') }}</strong> {{ t('requisites.section1.registrationNumber') }}</p>
          <p><strong>{{ t('requisites.section1.vat') }}</strong> {{ t('requisites.section1.vatNumber') }}</p>
        </section>

        <section>
          <h2>{{ t('requisites.section2.title') }}</h2>
          <p><strong>{{ t('requisites.section2.legal') }}</strong> {{ t('requisites.section2.legalAddress') }}</p>
          <p><strong>{{ t('requisites.section2.physical') }}</strong> {{ t('requisites.section2.physicalAddress') }}</p>
        </section>

        <section>
          <h2>{{ t('requisites.section3.title') }}</h2>
          <p><strong>{{ t('requisites.section3.email') }}</strong> wtmelon.ua@gmail.com</p>
          <p><strong>{{ t('requisites.section3.phone') }}</strong> +380 63 308 42 44</p>
          <p><strong>{{ t('requisites.section3.telegram') }}</strong> @WTmelon</p>
          <p><strong>{{ t('requisites.section3.website') }}</strong> wtmelon.site</p>
        </section>

        <section>
          <h2>{{ t('requisites.section4.title') }}</h2>
          <p><strong>{{ t('requisites.section4.bank') }}</strong> {{ t('requisites.section4.bankName') }}</p>
          <p><strong>{{ t('requisites.section4.iban') }}</strong> {{ t('requisites.section4.ibanNumber') }}</p>
          <p><strong>{{ t('requisites.section4.swift') }}</strong> {{ t('requisites.section4.swiftCode') }}</p>
        </section>

        <section>
          <h2>{{ t('requisites.section5.title') }}</h2>
          <p><strong>{{ t('requisites.section5.director') }}</strong> {{ t('requisites.section5.directorName') }}</p>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useLocale } from '../composables/useLocale'

export default {
  name: 'Requisites',
  setup() {
    const route = useRoute()
    const { locale, initLocale, t } = useLocale()

    onMounted(() => {
      initLocale(route.params.locale)
    })

    return { currentLanguage: locale, t }
  }
}
</script>
