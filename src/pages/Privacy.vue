<template>
  <div class="legal-page section-padding">
    <div class="container">
      <div class="legal-content">
        <h1>{{ t('privacy.title') }}</h1>
        <p class="updated">{{ t('privacy.updated') }}</p>

        <section>
          <p style="text-align: center; margin-bottom: 30px;">
            <strong>{{ t('privacy.title').toUpperCase() }}</strong><br>
            <em>({{ t('privacy.subtitle') }})</em>
          </p>
          <p>{{ t('privacy.intro') }}</p>
        </section>

        <section>
          <h2>{{ t('privacy.section1.title') }}</h2>
          <p><strong>1.1.</strong> {{ t('privacy.section1.p1') }}</p>
          <p><strong>1.2.</strong> {{ t('privacy.section1.p2') }}</p>
          <p><strong>1.3.</strong> {{ t('privacy.section1.p3') }}</p>
        </section>

        <section>
          <h2>{{ t('privacy.section2.title') }}</h2>
          <p>{{ t('privacy.section2.intro') }}</p>
          <p><strong>2.1.</strong> {{ t('privacy.section2.contact') }}</p>
          <p><strong>2.2.</strong> {{ t('privacy.section2.service') }}</p>
          <p><strong>2.3.</strong> {{ t('privacy.section2.payment') }}</p>
          <p><strong>2.4.</strong> {{ t('privacy.section2.technical') }}</p>
        </section>

        <section>
          <h2>{{ t('privacy.section3.title') }}</h2>
          <p>{{ t('privacy.section3.intro') }}</p>
          <ul>
            <li>{{ t('privacy.section3.item1') }}</li>
            <li>{{ t('privacy.section3.item2') }}</li>
            <li>{{ t('privacy.section3.item3') }}</li>
            <li>{{ t('privacy.section3.item4') }}</li>
          </ul>
        </section>

        <section>
          <h2>{{ t('privacy.section4.title') }}</h2>
          <p><strong>4.1.</strong> {{ t('privacy.section4.p1') }}</p>
          <ul>
            <li>{{ t('privacy.section4.item1') }}</li>
            <li>{{ t('privacy.section4.item2') }}</li>
            <li>{{ t('privacy.section4.item3') }}</li>
          </ul>
          <p><strong>4.2.</strong> {{ t('privacy.section4.p2') }}</p>
        </section>

        <section>
          <h2>{{ t('privacy.section5.title') }}</h2>
          <p>{{ t('privacy.section5.intro') }}</p>
          <ul>
            <li>{{ t('privacy.section5.item1') }}</li>
            <li>{{ t('privacy.section5.item2') }}</li>
            <li>{{ t('privacy.section5.item3') }}</li>
          </ul>
          <p>{{ t('privacy.section5.note') }}</p>
        </section>

        <section>
          <h2>{{ t('privacy.section6.title') }}</h2>
          <p><strong>6.1.</strong> {{ t('privacy.section6.p1') }}</p>
          <p><strong>6.2.</strong> {{ t('privacy.section6.p2') }}</p>
          <p><strong>6.3.</strong> {{ t('privacy.section6.p3') }}</p>
        </section>

        <section>
          <h2>{{ t('privacy.section7.title') }}</h2>
          <p>{{ t('privacy.section7.intro') }}</p>
          <ul>
            <li>{{ t('privacy.section7.item1') }}</li>
            <li>{{ t('privacy.section7.item2') }}</li>
            <li>{{ t('privacy.section7.item3') }}</li>
          </ul>
          <p>{{ t('privacy.section7.note') }}</p>
        </section>

        <section>
          <h2>{{ t('privacy.section8.title') }}</h2>
          <p>{{ t('privacy.section8.intro') }}</p>
          <p>
            <strong>{{ t('privacy.section8.company') }}</strong><br>
            {{ t('privacy.section8.email') }}<br>
            {{ t('privacy.section8.phone') }}<br>
            {{ t('privacy.section8.address') }}<br>
            {{ t('privacy.section8.additional') }}
          </p>
        </section>

        <section>
          <h2>{{ t('privacy.section14.title') }}</h2>
          <p>
            <strong>{{ t('privacy.section14.company') }}</strong><br>
            {{ t('privacy.section14.code') }}<br>
            {{ t('privacy.section14.address') }}<br>
            {{ t('privacy.section14.email') }}<br>
            {{ t('privacy.section14.phone') }}<br>
            {{ t('privacy.section14.brand') }}
          </p>
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
  name: 'Privacy',
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
