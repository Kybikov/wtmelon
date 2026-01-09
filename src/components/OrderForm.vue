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
        <label>{{ t('order.form.email') }}</label>
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

      <div v-if="submitError" class="submit-error">
        {{ submitError }}
      </div>

      <button type="submit" class="submit-button" :disabled="loading">
        <span v-if="!loading">{{ t('order.form.submit') }}</span>
        <span v-else class="loading-spinner"></span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useLocale } from '../composables/useLocale';
import { sendOrder } from '../services/orderService';

const { t } = useLocale();

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
  comment: ''
});

const errors = reactive({
  customerName: '',
  telegram: '',
  phone: '',
  email: ''
});

const loading = ref(false);
const submitError = ref('');

const validateField = (field) => {
  errors[field] = '';

  if (field === 'customerName' && !formData.customerName.trim()) {
    errors.customerName = t('order.errors.nameRequired');
    return false;
  }

  if (field === 'email' && formData.email) {
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

  return true;
};

const validateForm = () => {
  let isValid = true;

  if (!formData.customerName.trim()) {
    errors.customerName = t('order.errors.nameRequired');
    isValid = false;
  }

  if (!formData.telegram && !formData.phone && !formData.email) {
    submitError.value = t('order.errors.contactRequired');
    isValid = false;
  } else {
    submitError.value = '';
  }

  if (formData.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = t('order.errors.emailInvalid');
      isValid = false;
    }
  }

  if (formData.telegram) {
    const telegramRegex = /^@?[a-zA-Z0-9_]{5,32}$/;
    if (!telegramRegex.test(formData.telegram)) {
      errors.telegram = t('order.errors.telegramInvalid');
      isValid = false;
    }
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
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 24px;
  color: white;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.summary-item:last-child {
  margin-bottom: 0;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.summary-item .label {
  font-size: 14px;
  opacity: 0.9;
}

.summary-item .value {
  font-weight: 600;
  font-size: 15px;
}

.summary-item .value.price {
  font-size: 20px;
  font-weight: 700;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.required {
  color: #e53e3e;
}

.form-group input,
.form-group textarea {
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.2s;
  font-family: inherit;
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
  padding: 12px;
  background: #f7fafc;
  border-radius: 8px;
  border-left: 3px solid #667eea;
}

.submit-error {
  padding: 12px;
  background: #fed7d7;
  color: #c53030;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
}

.submit-button {
  padding: 14px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
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
  .form-header h3 {
    font-size: 20px;
  }

  .order-summary {
    padding: 16px;
  }

  .summary-item .value.price {
    font-size: 18px;
  }
}
</style>
