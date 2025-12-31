<template>
  <div v-if="subscription" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">{{ t.payment.title }}</h2>
        <button @click="$emit('close')" class="close-button">✕</button>
      </div>

      <div v-if="!paymentSuccess" class="modal-body">
        <div class="subscription-info">
          <div class="service-icon">{{ subscription.icon }}</div>
          <div class="service-details">
            <h3 class="service-name">{{ subscription.serviceName }}</h3>
            <p class="service-plan">{{ getPlanLabel(subscription.planType) }}</p>
          </div>
        </div>

        <div class="plan-selection">
          <h3 class="section-title">{{ t.payment.selectDuration }}</h3>
          <div class="plans-grid">
            <div
              v-for="plan in pricingPlans"
              :key="plan.duration"
              @click="selectedPlan = plan"
              :class="['plan-card', { active: selectedPlan?.duration === plan.duration }]"
            >
              <div class="plan-duration">
                {{ plan.duration }} {{ plan.duration === 1 ? t.payment.month : t.payment.months }}
              </div>
              <div v-if="plan.discount > 0" class="plan-discount">
                -{{ plan.discount }}%
              </div>
              <div class="plan-price">
                {{ plan.price }} {{ subscription.currency }}
              </div>
              <div v-if="plan.discount > 0" class="plan-savings">
                {{ t.payment.save }} {{ calculateSavings(plan) }} {{ subscription.currency }}
              </div>
            </div>
          </div>
        </div>

        <div v-if="selectedPlan" class="payment-methods">
          <h3 class="section-title">{{ t.payment.paymentMethod }}</h3>
          <div class="methods-grid">
            <div
              v-for="method in paymentMethods"
              :key="method.id"
              @click="selectedPaymentMethod = method"
              :class="['method-card', { active: selectedPaymentMethod?.id === method.id }]"
            >
              <div class="method-icon">{{ method.icon }}</div>
              <div class="method-name">{{ method.name }}</div>
            </div>
          </div>
        </div>

        <div v-if="selectedPlan" class="payment-summary">
          <div class="summary-row">
            <span class="summary-label">{{ t.payment.duration }}:</span>
            <span class="summary-value">
              {{ selectedPlan.duration }} {{ selectedPlan.duration === 1 ? t.payment.month : t.payment.months }}
            </span>
          </div>
          <div v-if="selectedPlan.discount > 0" class="summary-row">
            <span class="summary-label">{{ t.payment.discount }}:</span>
            <span class="summary-value discount">-{{ selectedPlan.discount }}%</span>
          </div>
          <div class="summary-row total">
            <span class="summary-label">{{ t.payment.total }}:</span>
            <span class="summary-value">{{ selectedPlan.price }} {{ subscription.currency }}</span>
          </div>
        </div>
      </div>

      <div v-else class="success-message">
        <div class="success-icon">✓</div>
        <h3 class="success-title">{{ t.payment.successTitle }}</h3>
        <p class="success-text">{{ t.payment.successMessage }}</p>

        <div class="payment-details">
          <div class="detail-row">
            <span class="detail-label">{{ t.payment.service }}:</span>
            <span class="detail-value">{{ subscription.serviceName }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">{{ t.payment.duration }}:</span>
            <span class="detail-value">
              {{ selectedPlan.duration }} {{ selectedPlan.duration === 1 ? t.payment.month : t.payment.months }}
            </span>
          </div>
          <div class="detail-row">
            <span class="detail-label">{{ t.payment.amount }}:</span>
            <span class="detail-value">{{ selectedPlan.price }} {{ subscription.currency }}</span>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button v-if="!paymentSuccess" @click="$emit('close')" class="btn-secondary">
          {{ t.payment.cancel }}
        </button>
        <button
          v-if="!paymentSuccess"
          @click="processPayment"
          :disabled="!selectedPlan || !selectedPaymentMethod || processing"
          class="btn-primary"
        >
          <span v-if="processing">{{ t.payment.processing }}</span>
          <span v-else>{{ t.payment.confirm }}</span>
        </button>
        <button v-else @click="closeAndRefresh" class="btn-primary">
          {{ t.payment.close }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useLanguage } from '../composables/useLanguage'
import { useSubscriptions } from '../composables/useSubscriptions'

export default {
  name: 'PaymentModal',
  props: {
    subscription: {
      type: Object,
      required: true
    }
  },
  emits: ['close', 'success'],
  setup() {
    const { t } = useLanguage()
    const { getPricingPlans, renewSubscription } = useSubscriptions()

    return {
      t,
      getPricingPlans,
      renewSubscription
    }
  },
  data() {
    return {
      selectedPlan: null,
      selectedPaymentMethod: null,
      processing: false,
      paymentSuccess: false,
      paymentMethods: [
        { id: 'card', name: 'Банківська карта', icon: '💳' },
        { id: 'crypto', name: 'Криптовалюта', icon: '₿' },
        { id: 'paypal', name: 'PayPal', icon: '💰' }
      ]
    }
  },
  computed: {
    pricingPlans() {
      return this.getPricingPlans(this.subscription.serviceName)
    }
  },
  mounted() {
    document.body.style.overflow = 'hidden'
  },
  beforeUnmount() {
    document.body.style.overflow = ''
  },
  methods: {
    getPlanLabel(planType) {
      const labels = {
        individual: this.t.subscriptions.planIndividual,
        family: this.t.subscriptions.planFamily,
        student: this.t.subscriptions.planStudent,
        standard: this.t.subscriptions.planStandard,
        premium: this.t.subscriptions.planPremium
      }
      return labels[planType] || planType
    },
    calculateSavings(plan) {
      const fullPrice = (this.subscription.price * plan.duration)
      return Math.round(fullPrice - plan.price)
    },
    async processPayment() {
      this.processing = true

      try {
        await this.renewSubscription(
          this.subscription.id,
          this.selectedPlan.duration,
          this.selectedPlan.price
        )

        this.paymentSuccess = true
      } catch (error) {
        console.error('Payment error:', error)
      } finally {
        this.processing = false
      }
    },
    closeAndRefresh() {
      this.$emit('success')
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  overflow-y: auto;
}

.modal-content {
  background: var(--bg-primary);
  border-radius: 20px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  border-bottom: 1px solid var(--border-color);
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.close-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-button:hover {
  background: var(--border-color);
}

.modal-body {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.subscription-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--bg-secondary);
  border-radius: 12px;
}

.service-icon {
  font-size: 3rem;
}

.service-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.service-plan {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.plans-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
}

.plan-card {
  padding: 1.5rem 1rem;
  background: var(--bg-secondary);
  border: 2px solid var(--border-color);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  position: relative;
}

.plan-card:hover {
  border-color: var(--primary-color);
  transform: translateY(-3px);
}

.plan-card.active {
  border-color: var(--primary-color);
  background: rgba(88, 195, 34, 0.1);
}

.plan-discount {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ff3b30;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 700;
}

.plan-duration {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.plan-price {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.25rem;
}

.plan-savings {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.methods-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.method-card {
  padding: 1rem;
  background: var(--bg-secondary);
  border: 2px solid var(--border-color);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.method-card:hover {
  border-color: var(--primary-color);
}

.method-card.active {
  border-color: var(--primary-color);
  background: rgba(88, 195, 34, 0.1);
}

.method-icon {
  font-size: 2rem;
}

.method-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
}

.payment-summary {
  padding: 1.5rem;
  background: var(--bg-secondary);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.summary-row.total {
  padding-top: 1rem;
  border-top: 2px solid var(--border-color);
  font-size: 1.1rem;
}

.summary-label {
  color: var(--text-secondary);
}

.summary-value {
  font-weight: 600;
  color: var(--text-primary);
}

.summary-value.discount {
  color: #ff3b30;
}

.summary-row.total .summary-value {
  font-size: 1.5rem;
  color: var(--primary-color);
}

.success-message {
  padding: 3rem 2rem;
  text-align: center;
}

.success-icon {
  width: 80px;
  height: 80px;
  background: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  margin: 0 auto 1.5rem;
  animation: scaleIn 0.5s ease;
}

@keyframes scaleIn {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

.success-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.success-text {
  font-size: 1rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.payment-details {
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: left;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail-label {
  color: var(--text-secondary);
}

.detail-value {
  font-weight: 600;
  color: var(--text-primary);
}

.modal-footer {
  padding: 1.5rem 2rem;
  border-top: 1px solid var(--border-color);
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.btn-secondary {
  padding: 0.75rem 1.5rem;
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: 2px solid var(--border-color);
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: var(--border-color);
}

.btn-primary {
  padding: 0.75rem 1.5rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary:hover:not(:disabled) {
  background: var(--primary-hover);
  transform: translateY(-2px);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .modal-content {
    max-height: 95vh;
  }

  .plans-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .methods-grid {
    grid-template-columns: 1fr;
  }

  .modal-footer {
    flex-direction: column;
  }

  .btn-secondary,
  .btn-primary {
    width: 100%;
  }
}
</style>
