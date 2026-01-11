<template>
  <div class="order-form">
    <div class="form-header">
      <button @click="$emit('back')" class="back-button">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <h3>{{ t('order.title') }}</h3>
    </div>

    <div class="order-summary">
      <div class="summary-item">
        <span class="label">{{ t('order.product') }}:</span>
        <span class="value">{{ orderData.productName }}</span>
      </div>
      <div class="summary-item">
        <span class="label">{{ t('order.plan') }}:</span>
        <span class="value">{{ orderData.plan }}</span>
      </div>
      <div class="summary-item">
        <span class="label">{{ t('order.duration') }}:</span>
        <span class="value">{{ orderData.duration }}</span>
      </div>
      <div class="summary-item">
        <span class="label">{{ t('order.price') }}:</span>
        <span class="value price">{{ orderData.price }} {{ orderData.currency }}</span>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="contact-form">
      <div class="form-group" :class="{ error: errors.customerName }">
        <label>{{ t('order.form.name') }} <span class="required">*</span></label>
        <input
          v-model="formData.customerName"
          type="text"
          :placeholder="t('order.form.namePlaceholder')"
          @blur="validateField('customerName')"
        />
        <span v-if="errors.customerName" class="error-message">{{ errors.customerName }}</span>
      </div>

      <div class="form-group" :class="{ error: errors.telegram }">
        <label>{{ t('order.form.telegram') }}</label>
        <input
          v-model="formData.telegram"
          type="text"
          :placeholder="t('order.form.telegramPlaceholder')"
          @blur="validateField('telegram')"
        />
        <span v-if="errors.telegram" class="error-message">{{ errors.telegram }}</span>
      </div>

      <div class="form-group" :class="{ error: errors.phone }">
        <label>{{ t('order.form.phone') }}</label>
        <input
          v-model="formData.phone"
          type="tel"
          :placeholder="t('order.form.phonePlaceholder')"
          @blur="validateField('phone')"
        />
        <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
      </div>

      <div class="form-group" :class="{ error: errors.email }">
        <label>{{ t('order.form.email') }} <span class="required">*</span></label>
        <input
          v-model="formData.email"
          type="email"
          :placeholder="t('order.form.emailPlaceholder')"
          @blur="validateField('email')"
        />
        <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
      </div>

      <div class="form-group">
        <label>{{ t('order.form.comment') }}</label>
        <textarea
          v-model="formData.comment"
          :placeholder="t('order.form.commentPlaceholder')"
          rows="3"
        ></textarea>
      </div>

      <p class="contact-note">{{ t('order.form.contactNote') }}</p>

      <div class="terms-agreement" :class="{ error: errors.termsAgreed }">
        <label class="checkbox-label">
          <input
            type="checkbox"
            v-model="formData.termsAgreed"
            @change="validateField('termsAgreed')"
          />
          <span class="checkbox-text">
            {{ t('order.form.agreement.prefix') }}
            <router-link :to="termsPath" target="_blank" class="agreement-link">{{ t('order.form.agreement.terms') }}</router-link>,
            <router-link :to="privacyPath" target="_blank" class="agreement-link">{{ t('order.form.agreement.privacy') }}</router-link>
            {{ t('order.form.agreement.and') }}
            <router-link :to="refundPath" target="_blank" class="agreement-link">{{ t('order.form.agreement.refund') }}</router-link>
          </span>
        </label>
        <span v-if="errors.termsAgreed" class="error-message">{{ errors.termsAgreed }}</span>
      </div>

      <div class="immediate-start-agreement">
        <label class="checkbox-label">
          <input
            type="checkbox"
            v-model="formData.immediateStart"
          />
          <span class="checkbox-text">
            {{ t('order.form.immediateStart.label') }}
            <button
              type="button"
              class="info-icon"
              @click="toggleTooltip"
              @mouseenter="showTooltip = true"
              @mouseleave="showTooltip = false"
            >
              i
            </button>
          </span>
        </label>
        <div v-if="showTooltip" class="tooltip">
          {{ t('order.form.immediateStart.fullText') }}
        </div>
      </div>

      <div v-if="submitError" class="submit-error">
        {{ submitError }}
      </div>

      <button type="submit" class="submit-button" :disabled="loading || !formData.termsAgreed">
        <span v-if="!loading">{{ t('order.form.submit') }}</span>
        <span v-else class="loading-spinner"></span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useLocale } from '../composables/useLocale';
import { sendOrder } from '../services/orderService';

const { t, locale } = useLocale();

const getLocalePath = (path) => {
  if (locale.value === 'en') {
    return path;
  }
  return `/${locale.value}${path}`;
};

const termsPath = computed(() => getLocalePath('/terms'));
const privacyPath = computed(() => getLocalePath('/privacy'));
const refundPath = computed(() => getLocalePath('/refund'));

const props = defineProps({
  orderData: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['back', 'success']);

const formData = reactive({
  customerName: '',
  telegram: '',
  phone: '',
  email: '',
  comment: '',
  termsAgreed: false,
  immediateStart: false
});

const errors = reactive({
  customerName: '',
  telegram: '',
  phone: '',
  email: '',
  termsAgreed: ''
});

const loading = ref(false);
const submitError = ref('');
const showTooltip = ref(false);

const toggleTooltip = () => {
  showTooltip.value = !showTooltip.value;
};

const validateField = (field) => {
  errors[field] = '';

  if (field === 'customerName' && !formData.customerName.trim()) {
    errors.customerName = t('order.errors.nameRequired');
    return false;
  }

  if (field === 'email') {
    if (!formData.email.trim()) {
      errors.email = t('order.errors.emailRequired');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = t('order.errors.emailInvalid');
      return false;
    }
  }

  if (field === 'telegram' && formData.telegram) {
    const telegramRegex = /^@?[a-zA-Z0-9_]{5,32}$/;
    if (!telegramRegex.test(formData.telegram)) {
      errors.telegram = t('order.errors.telegramInvalid');
      return false;
    }
  }

  if (field === 'termsAgreed' && !formData.termsAgreed) {
    errors.termsAgreed = t('order.errors.termsRequired');
    return false;
  }

  return true;
};

const validateForm = () => {
  let isValid = true;

  if (!formData.customerName.trim()) {
    errors.customerName = t('order.errors.nameRequired');
    isValid = false;
  }

  if (!formData.email.trim()) {
    errors.email = t('order.errors.emailRequired');
    isValid = false;
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = t('order.errors.emailInvalid');
      isValid = false;
    }
  }

  if (!formData.telegram && !formData.phone) {
    submitError.value = t('order.errors.telegramOrPhoneRequired');
    isValid = false;
  } else {
    submitError.value = '';
  }

  if (formData.telegram) {
    const telegramRegex = /^@?[a-zA-Z0-9_]{5,32}$/;
    if (!telegramRegex.test(formData.telegram)) {
      errors.telegram = t('order.errors.telegramInvalid');
      isValid = false;
    }
  }

  if (!formData.termsAgreed) {
    errors.termsAgreed = t('order.errors.termsRequired');
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }

  loading.value = true;
  submitError.value = '';

  try {
    const orderPayload = {
      ...props.orderData,
      ...formData
    };

    const result = await sendOrder(orderPayload);
    emit('success', result);
  } catch (error) {
    console.error('Order submission error:', error);
    submitError.value = t('order.errors.submitFailed');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.order-form {
  width: 100%;
}

.form-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.back-button {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.2s;
}

.back-button:hover {
  background: #f5f5f5;
  color: #333;
}

.form-header h3 {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.order-summary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 24px;
  border-radius: 12px;
  margin-bottom: 28px;
  color: white;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  gap: 16px;
}

.summary-item:last-child {
  margin-bottom: 0;
  margin-top: 8px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
}

.summary-item .label {
  font-size: 14px;
  opacity: 0.95;
  white-space: nowrap;
}

.summary-item .value {
  font-weight: 600;
  font-size: 15px;
  text-align: right;
}

.summary-item .value.price {
  font-size: 22px;
  font-weight: 700;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 2px;
}

.required {
  color: #e53e3e;
}

.form-group input,
.form-group textarea {
  padding: 14px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 15px;
  transition: all 0.2s;
  font-family: inherit;
  background: #fff;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-group.error input,
.form-group.error textarea {
  border-color: #e53e3e;
}

.error-message {
  font-size: 13px;
  color: #e53e3e;
  margin-top: -2px;
}

.contact-note {
  font-size: 13px;
  color: #666;
  margin: 0;
  padding: 14px 16px;
  background: #f7fafc;
  border-radius: 10px;
  border-left: 4px solid #667eea;
  line-height: 1.5;
}

.terms-agreement,
.immediate-start-agreement {
  margin: 8px 0;
  position: relative;
}

.terms-agreement.error .checkbox-text {
  color: #e53e3e;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
  user-select: none;
}

.checkbox-label input[type="checkbox"] {
  margin-top: 3px;
  width: 18px;
  height: 18px;
  cursor: pointer;
  flex-shrink: 0;
  accent-color: #667eea;
}

.checkbox-text {
  font-size: 14px;
  color: #333;
  line-height: 1.5;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
}

.agreement-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.agreement-link:hover {
  color: #764ba2;
  text-decoration: underline;
}

.info-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #667eea;
  color: white;
  border: none;
  font-size: 12px;
  font-weight: bold;
  font-style: italic;
  cursor: help;
  transition: all 0.2s;
  padding: 0;
  flex-shrink: 0;
}

.info-icon:hover {
  background: #764ba2;
  transform: scale(1.1);
}

.tooltip {
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  background: #2d3748;
  color: white;
  padding: 12px 14px;
  border-radius: 8px;
  font-size: 13px;
  line-height: 1.5;
  margin-bottom: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 10;
  animation: fadeIn 0.2s ease-in-out;
}

.tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 20px;
  border: 6px solid transparent;
  border-top-color: #2d3748;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.submit-error {
  padding: 14px 16px;
  background: #fed7d7;
  color: #c53030;
  border-radius: 10px;
  font-size: 14px;
  text-align: center;
}

.submit-button {
  padding: 16px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 54px;
  margin-top: 4px;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .form-header {
    margin-bottom: 20px;
  }

  .form-header h3 {
    font-size: 20px;
  }

  .order-summary {
    padding: 20px;
    margin-bottom: 24px;
  }

  .summary-item {
    margin-bottom: 10px;
  }

  .summary-item .label {
    font-size: 13px;
  }

  .summary-item .value {
    font-size: 14px;
  }

  .summary-item .value.price {
    font-size: 20px;
  }

  .contact-form {
    gap: 18px;
  }

  .form-group input,
  .form-group textarea {
    padding: 12px 14px;
    font-size: 16px;
  }

  .submit-button {
    padding: 14px 20px;
    font-size: 15px;
  }
}
</style>

<style>
.dark-theme .checkbox-text {
  color: #e2e8f0 !important;
}

.dark-theme .agreement-link {
  color: #a5b4fc !important;
}

.dark-theme .agreement-link:hover {
  color: #c4b5fd !important;
}

.dark-theme .terms-agreement.error .checkbox-text {
  color: #fc8181 !important;
}

.dark-theme .form-group label {
  color: #e2e8f0 !important;
}

.dark-theme .form-group label .required {
  color: #fc8181 !important;
}
</style>
