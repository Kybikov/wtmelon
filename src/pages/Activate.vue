<template>
  <main class="activation-page">
    <section class="activation-hero section-padding">
      <div class="container">
        <div class="activation-shell">
          <div class="activation-copy">
            <span class="activation-badge">{{ t('activation.badge') }}</span>
            <h1>{{ t('activation.title') }}</h1>
            <p class="activation-lead">{{ t('activation.lead') }}</p>

            <div class="activation-steps">
              <div class="activation-step">
                <div class="step-number">1</div>
                <div>
                  <strong>{{ t('activation.steps.step1.title') }}</strong>
                  <p>{{ t('activation.steps.step1.text') }}</p>
                </div>
              </div>
              <div class="activation-step">
                <div class="step-number">2</div>
                <div>
                  <strong>{{ t('activation.steps.step2.title') }}</strong>
                  <p>{{ t('activation.steps.step2.text') }}</p>
                </div>
              </div>
              <div class="activation-step">
                <div class="step-number">3</div>
                <div>
                  <strong>{{ t('activation.steps.step3.title') }}</strong>
                  <p>{{ t('activation.steps.step3.text') }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="activation-card">
            <div class="activation-card-header">
              <h2>{{ t('activation.form.title') }}</h2>
              <p>{{ t('activation.form.subtitle') }}</p>
            </div>

            <div class="activation-form">
              <label class="activation-field">
                <span>{{ t('activation.form.keyLabel') }}</span>
                <input
                  v-model="form.key"
                  type="text"
                  :placeholder="t('activation.form.keyPlaceholder')"
                  autocomplete="off"
                >
              </label>

              <div v-if="keyStatusLabel" class="status-chip" :class="statusClass">
                {{ keyStatusLabel }}
              </div>

              <button class="btn1 activation-action" :disabled="checking || !form.key.trim()" @click="handleCheck">
                {{ checking ? t('activation.form.checking') : t('activation.form.checkButton') }}
              </button>

              <label class="activation-field">
                <span>{{ t('activation.form.tokenLabel') }}</span>
                <textarea
                  v-model="form.userToken"
                  rows="5"
                  :placeholder="t('activation.form.tokenPlaceholder')"
                />
              </label>

              <div class="activation-help">
                <a href="https://chatgpt.com/" target="_blank" rel="noreferrer">{{ t('activation.form.openService') }}</a>
                <a href="https://chatgpt.com/api/auth/session" target="_blank" rel="noreferrer">{{ t('activation.form.openSession') }}</a>
              </div>

              <div class="activation-tip">
                {{ t('activation.form.tip') }}
              </div>

              <button
                class="btn1 activation-submit"
                :disabled="activating || !canActivate"
                @click="handleActivate"
              >
                {{ activating ? t('activation.form.activating') : t('activation.form.activateButton') }}
              </button>

              <div v-if="message.text" class="activation-message" :class="message.type">
                {{ message.text }}
              </div>

              <div v-if="detailRows.length" class="activation-details" :class="detailsClass">
                <h3>{{ copy('activation.form.detailsTitle', detailFallbacks.detailsTitle) }}</h3>
                <div class="activation-detail-list">
                  <div
                    v-for="detail in detailRows"
                    :key="detail.label"
                    class="activation-detail-item"
                  >
                    <span class="detail-label">{{ detail.label }}</span>
                    <span class="detail-value">{{ detail.value }}</span>
                  </div>
                </div>
              </div>

              <div v-if="resultSummary" class="activation-result">
                <h3>{{ t('activation.form.resultTitle') }}</h3>
                <p>{{ resultSummary }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="activation-notes">
          <div class="activation-note">
            <h3>{{ t('activation.notes.note1.title') }}</h3>
            <p>{{ t('activation.notes.note1.text') }}</p>
          </div>
          <div class="activation-note">
            <h3>{{ t('activation.notes.note2.title') }}</h3>
            <p>{{ t('activation.notes.note2.text') }}</p>
          </div>
          <div class="activation-note">
            <h3>{{ t('activation.notes.note3.title') }}</h3>
            <p>{{ t('activation.notes.note3.text') }}</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { computed, reactive, ref } from 'vue'
import { useLocale } from '../composables/useLocale'
import { activateKey, checkActivationKey } from '../services/activationService'

const detailFallbacks = {
  detailsTitle: {
    en: 'Key details',
    ru: 'Информация по ключу',
    uk: 'Інформація про ключ',
    de: 'Schluesseldetails'
  },
  activatedAt: {
    en: 'Activated',
    ru: 'Активирован',
    uk: 'Активовано',
    de: 'Aktiviert'
  },
  subscription: {
    en: 'Plan',
    ru: 'Тариф',
    uk: 'Тариф',
    de: 'Tarif'
  },
  product: {
    en: 'Service',
    ru: 'Сервис',
    uk: 'Сервіс',
    de: 'Dienst'
  },
  account: {
    en: 'Account',
    ru: 'Аккаунт',
    uk: 'Акаунт',
    de: 'Konto'
  },
  duration: {
    en: 'Duration',
    ru: 'Срок',
    uk: 'Термін',
    de: 'Dauer'
  },
  daysSuffix: {
    en: 'days',
    ru: 'дней',
    uk: 'днів',
    de: 'Tage'
  },
  monthDuration: {
    en: '1 month',
    ru: '1 месяц',
    uk: '1 місяць',
    de: '1 Monat'
  },
  yearDuration: {
    en: '1 year',
    ru: '1 год',
    uk: '1 рік',
    de: '1 Jahr'
  },
  unavailable: {
    en: '-',
    ru: '-',
    uk: '-',
    de: '-'
  }
}

export default {
  name: 'ActivatePage',
  setup() {
    const { locale, t } = useLocale()
    const form = reactive({
      key: '',
      userToken: ''
    })

    const checking = ref(false)
    const activating = ref(false)
    const keyStatus = ref(null)
    const activationResult = ref(null)
    const message = ref({ type: '', text: '' })

    const copy = (key, fallbackMap) => {
      const translated = t(key)
      if (translated !== key) {
        return translated
      }

      return fallbackMap?.[locale.value] || fallbackMap?.en || key
    }

    const keyStatusLabel = computed(() => {
      if (!keyStatus.value) return ''

      const status = keyStatus.value?.details?.status || keyStatus.value?.data?.status || keyStatus.value?.status || 'unknown'
      const labels = {
        available: t('activation.status.available'),
        used: t('activation.status.used'),
        expired: t('activation.status.expired'),
        invalid: copy('activation.status.invalid', {
          en: 'We could not find this key.',
          ru: 'Мы не нашли этот ключ.',
          uk: 'Ми не знайшли цей ключ.',
          de: 'Dieser Schluessel wurde nicht gefunden.'
        }),
        unknown: t('activation.status.unknown')
      }

      return labels[status] || `${t('activation.status.unknown')}: ${status}`
    })

    const statusClass = computed(() => {
      const status = keyStatus.value?.details?.status || keyStatus.value?.data?.status || keyStatus.value?.status
      if (status === 'available') return 'success'
      if (status === 'used') return 'info'
      if (status === 'expired' || status === 'invalid') return 'error'
      return 'neutral'
    })

    const detailsClass = computed(() => {
      const status = keyStatus.value?.details?.status
      if (status === 'available') return 'success'
      if (status === 'used') return 'info'
      return 'error'
    })

    const canActivate = computed(() => form.key.trim() && form.userToken.trim())

    const resultSummary = computed(() => {
      if (!activationResult.value) return ''

      return activationResult.value?.message
        || activationResult.value?.data?.message
        || t('activation.messages.activateSuccess')
    })

    const formatDuration = (days) => {
      if (!days) {
        return copy('activation.form.unavailable', detailFallbacks.unavailable)
      }

      if (days === 30) {
        return copy('activation.form.monthDuration', detailFallbacks.monthDuration)
      }

      if (days === 365) {
        return copy('activation.form.yearDuration', detailFallbacks.yearDuration)
      }

      return `${days} ${copy('activation.form.durationDaysSuffix', detailFallbacks.daysSuffix)}`
    }

    const detailRows = computed(() => {
      const details = keyStatus.value?.details
      if (!details) return []

      const empty = copy('activation.form.unavailable', detailFallbacks.unavailable)

      return [
        {
          label: copy('activation.form.activatedAtLabel', detailFallbacks.activatedAt),
          value: details.activatedAt || empty
        },
        {
          label: copy('activation.form.subscriptionLabel', detailFallbacks.subscription),
          value: details.subscription || empty
        },
        {
          label: copy('activation.form.accountLabel', detailFallbacks.account),
          value: details.account || empty
        },
        {
          label: copy('activation.form.durationLabel', detailFallbacks.duration),
          value: formatDuration(details.durationDays)
        }
      ]
    })

    const setMessage = (type, text) => {
      message.value = { type, text }
    }

    const handleCheck = async () => {
      checking.value = true
      activationResult.value = null
      setMessage('', '')

      try {
        keyStatus.value = await checkActivationKey(form.key.trim())
        const status = keyStatus.value?.details?.status

        if (status === 'used') {
          setMessage('success', copy('activation.messages.usedSuccess', {
            en: 'The key was found and is already activated.',
            ru: 'Ключ найден и уже активирован.',
            uk: 'Ключ знайдено та вже активовано.',
            de: 'Der Schluessel wurde gefunden und ist bereits aktiviert.'
          }))
        } else if (status === 'available') {
          setMessage('info', copy('activation.messages.availableSuccess', {
            en: 'The key was found and is ready to use.',
            ru: 'Ключ найден и готов к активации.',
            uk: 'Ключ знайдено та він готовий до активації.',
            de: 'Der Schluessel wurde gefunden und ist zur Aktivierung bereit.'
          }))
        } else {
          setMessage('error', copy('activation.messages.invalidError', {
            en: 'We could not find this key.',
            ru: 'Мы не нашли этот ключ.',
            uk: 'Ми не знайшли цей ключ.',
            de: 'Dieser Schluessel wurde nicht gefunden.'
          }))
        }
      } catch (error) {
        keyStatus.value = {
          details: {
            activatedAt: '',
            subscription: '',
            account: '',
            durationDays: null,
            status: 'invalid'
          }
        }
        setMessage('error', error.message || t('activation.messages.checkError'))
      } finally {
        checking.value = false
      }
    }

    const handleActivate = async () => {
      activating.value = true
      activationResult.value = null
      setMessage('', '')

      try {
        activationResult.value = await activateKey(form.key.trim(), form.userToken.trim())
        setMessage('success', t('activation.messages.activateSuccess'))
      } catch (error) {
        setMessage('error', error.message || t('activation.messages.activateError'))
      } finally {
        activating.value = false
      }
    }

    return {
      activating,
      canActivate,
      checking,
      copy,
      detailFallbacks,
      detailsClass,
      detailRows,
      form,
      formatDuration,
      handleActivate,
      handleCheck,
      keyStatusLabel,
      message,
      resultSummary,
      statusClass,
      t
    }
  }
}
</script>

<style scoped>
.activation-page {
  padding-top: 90px;
  background:
    radial-gradient(circle at top left, rgba(46, 213, 115, 0.16), transparent 28%),
    radial-gradient(circle at top right, rgba(255, 71, 87, 0.16), transparent 28%),
    linear-gradient(180deg, rgba(248, 249, 250, 0.96), rgba(255, 255, 255, 1));
}

.activation-shell {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 32px;
  align-items: start;
}

.activation-copy,
.activation-card,
.activation-note {
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 28px;
  box-shadow: var(--shadow-lg);
  backdrop-filter: blur(16px);
}

.activation-copy {
  padding: 40px;
}

.activation-card {
  padding: 32px;
  position: sticky;
  top: 120px;
}

.activation-badge {
  display: inline-flex;
  padding: 10px 16px;
  border-radius: 999px;
  background: rgba(255, 71, 87, 0.12);
  color: var(--primary-color);
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 18px;
}

.activation-copy h1 {
  font-size: 48px;
  line-height: 1.05;
  margin-bottom: 18px;
  color: var(--dark-color);
}

.activation-lead {
  font-size: 18px;
  line-height: 1.7;
  color: var(--text-color);
  opacity: 0.86;
  margin-bottom: 28px;
}

.activation-steps {
  display: grid;
  gap: 16px;
}

.activation-step {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 18px 20px;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(255, 71, 87, 0.08), rgba(46, 213, 115, 0.08));
  border: 1px solid rgba(255, 71, 87, 0.08);
}

.step-number {
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  color: #fff;
  font-weight: 700;
}

.activation-step strong {
  display: block;
  margin-bottom: 6px;
  font-size: 16px;
  color: var(--dark-color);
}

.activation-step p {
  margin: 0;
  color: var(--text-color);
  opacity: 0.82;
  line-height: 1.6;
}

.activation-card-header h2 {
  font-size: 28px;
  color: var(--dark-color);
  margin-bottom: 8px;
}

.activation-card-header p {
  color: var(--text-color);
  opacity: 0.7;
  margin-bottom: 24px;
}

.activation-form {
  display: grid;
  gap: 16px;
}

.activation-field {
  display: grid;
  gap: 8px;
}

.activation-field span {
  font-size: 14px;
  font-weight: 700;
  color: var(--dark-color);
}

.activation-field input,
.activation-field textarea {
  width: 100%;
  padding: 15px 16px;
  border-radius: 16px;
  border: 2px solid rgba(44, 62, 80, 0.1);
  background: rgba(255, 255, 255, 0.94);
  color: var(--text-color);
  font-family: inherit;
  font-size: 15px;
  transition: var(--transition);
}

.activation-field input:focus,
.activation-field textarea:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 4px rgba(255, 71, 87, 0.12);
}

.activation-action,
.activation-submit {
  width: 100%;
  justify-content: center;
}

.activation-action:disabled,
.activation-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.activation-help {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.activation-help a {
  color: var(--primary-color);
  font-weight: 600;
  text-decoration: none;
}

.activation-help a:hover {
  color: var(--primary-dark);
}

.activation-tip,
.status-chip,
.activation-message {
  padding: 12px 14px;
  border-radius: 14px;
  font-size: 14px;
  font-weight: 600;
}

.activation-tip {
  background: rgba(255, 165, 2, 0.14);
  color: #9a6500;
}

.status-chip.success,
.activation-message.success {
  background: rgba(46, 213, 115, 0.14);
  color: #138a4d;
}

.status-chip.info,
.activation-message.info {
  background: rgba(54, 123, 245, 0.14);
  color: #2f63d8;
}

.status-chip.error,
.activation-message.error {
  background: rgba(255, 71, 87, 0.14);
  color: #c83442;
}

.status-chip.neutral {
  background: rgba(255, 165, 2, 0.14);
  color: #b77700;
}

.activation-result {
  padding: 18px;
  border-radius: 20px;
  background: #1e272e;
  color: #f8f9fa;
}

.activation-details {
  padding: 18px;
  border-radius: 20px;
  border: 1px solid transparent;
}

.activation-details.success {
  background: rgba(46, 213, 115, 0.08);
  border-color: rgba(46, 213, 115, 0.16);
}

.activation-details.info {
  background: rgba(54, 123, 245, 0.08);
  border-color: rgba(54, 123, 245, 0.16);
}

.activation-details.error {
  background: rgba(255, 71, 87, 0.08);
  border-color: rgba(255, 71, 87, 0.16);
}

.activation-details h3 {
  margin-bottom: 12px;
  font-size: 16px;
  color: var(--dark-color);
}

.activation-detail-list {
  display: grid;
  gap: 10px;
}

.activation-detail-item {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 14px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.72);
}

.detail-label {
  color: var(--text-color);
  opacity: 0.75;
  font-size: 13px;
  font-weight: 700;
}

.detail-value {
  color: var(--dark-color);
  font-size: 14px;
  font-weight: 700;
  text-align: right;
  word-break: break-word;
}

.activation-result h3 {
  margin-bottom: 12px;
  font-size: 16px;
}

.activation-result p {
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
}

.activation-notes {
  margin-top: 28px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.activation-note {
  padding: 24px;
}

.activation-note h3 {
  margin-bottom: 10px;
  font-size: 18px;
  color: var(--dark-color);
}

.activation-note p {
  margin: 0;
  color: var(--text-color);
  opacity: 0.82;
  line-height: 1.7;
}

.dark-theme .activation-page {
  background:
    radial-gradient(circle at top left, rgba(46, 213, 115, 0.18), transparent 25%),
    radial-gradient(circle at top right, rgba(255, 71, 87, 0.18), transparent 25%),
    linear-gradient(180deg, #18191a, #242526);
}

.dark-theme .activation-copy,
.dark-theme .activation-card,
.dark-theme .activation-note {
  background: rgba(36, 37, 38, 0.92);
  border-color: rgba(255, 255, 255, 0.08);
}

.dark-theme .activation-field input,
.dark-theme .activation-field textarea {
  background: rgba(24, 25, 26, 0.95);
  border-color: rgba(255, 255, 255, 0.08);
}

.dark-theme .activation-details.success {
  background: rgba(46, 213, 115, 0.12);
  border-color: rgba(46, 213, 115, 0.16);
}

.dark-theme .activation-details.info {
  background: rgba(54, 123, 245, 0.14);
  border-color: rgba(54, 123, 245, 0.18);
}

.dark-theme .activation-details.error {
  background: rgba(255, 71, 87, 0.12);
  border-color: rgba(255, 71, 87, 0.16);
}

.dark-theme .activation-detail-item {
  background: rgba(24, 25, 26, 0.72);
}

@media (max-width: 991px) {
  .activation-shell,
  .activation-notes {
    grid-template-columns: 1fr;
  }

  .activation-card {
    position: static;
  }
}

@media (max-width: 767px) {
  .activation-copy,
  .activation-card,
  .activation-note {
    padding: 24px;
    border-radius: 24px;
  }

  .activation-copy h1 {
    font-size: 34px;
  }

  .activation-lead {
    font-size: 16px;
  }
}
</style>
