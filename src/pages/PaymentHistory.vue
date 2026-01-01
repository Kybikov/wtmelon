<template>
  <div class="payment-history-page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">{{ t.payments.title }}</h1>
        <p class="page-subtitle">{{ t.payments.subtitle }}</p>
      </div>

      <div v-if="payments.length === 0" class="empty-state">
        <div class="empty-icon">📄</div>
        <h3 class="empty-title">{{ t.payments.noPayments }}</h3>
        <p class="empty-desc">{{ t.payments.noPaymentsDesc }}</p>
      </div>

      <div v-else class="payments-container">
        <div class="payments-table">
          <div class="table-header">
            <div class="header-cell date">{{ t.payments.date }}</div>
            <div class="header-cell service">{{ t.payments.service }}</div>
            <div class="header-cell method">{{ t.payments.method }}</div>
            <div class="header-cell amount">{{ t.payments.amount }}</div>
            <div class="header-cell status">{{ t.payments.status }}</div>
            <div class="header-cell actions"></div>
          </div>

          <div class="table-body">
            <div
              v-for="payment in payments"
              :key="payment.id"
              class="table-row"
            >
              <div class="table-cell date">
                {{ formatDate(payment.date) }}
              </div>
              <div class="table-cell service">
                <span class="service-name">{{ payment.serviceName }}</span>
              </div>
              <div class="table-cell method">
                <span class="payment-method">{{ getMethodLabel(payment.paymentMethod) }}</span>
              </div>
              <div class="table-cell amount">
                <span class="amount-value">{{ payment.amount }} {{ payment.currency }}</span>
              </div>
              <div class="table-cell status">
                <span :class="['status-badge', payment.status]">
                  {{ getStatusLabel(payment.status) }}
                </span>
              </div>
              <div class="table-cell actions">
                <button @click="viewReceipt(payment)" class="btn-action">
                  {{ t.payments.viewReceipt }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="mobile-payments">
          <div
            v-for="payment in payments"
            :key="payment.id"
            class="payment-card"
          >
            <div class="card-header">
              <span :class="['status-badge', payment.status]">
                {{ getStatusLabel(payment.status) }}
              </span>
              <span class="payment-date">{{ formatDate(payment.date) }}</span>
            </div>

            <div class="card-body">
              <div class="info-row">
                <span class="info-label">{{ t.payments.service }}:</span>
                <span class="info-value">{{ payment.serviceName }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">{{ t.payments.method }}:</span>
                <span class="info-value">{{ getMethodLabel(payment.paymentMethod) }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">{{ t.payments.amount }}:</span>
                <span class="info-value amount">{{ payment.amount }} {{ payment.currency }}</span>
              </div>
            </div>

            <div class="card-footer">
              <button @click="viewReceipt(payment)" class="btn-action">
                {{ t.payments.viewReceipt }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuth } from '../composables/useAuth'
import { useSubscriptions } from '../composables/useSubscriptions'
import { useLanguage } from '../composables/useLanguage'

export default {
  name: 'PaymentHistory',
  setup() {
    const { currentUser } = useAuth()
    const { getUserPayments } = useSubscriptions()
    const { t } = useLanguage()

    return {
      currentUser,
      getUserPayments,
      t
    }
  },
  computed: {
    payments() {
      return this.getUserPayments(this.currentUser?.id)
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('uk-UA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    getMethodLabel(method) {
      const labels = {
        card: this.t.payments.methodCard,
        crypto: this.t.payments.methodCard,
        paypal: this.t.payments.methodPayPal
      }
      return labels[method] || method
    },
    getStatusLabel(status) {
      const labels = {
        completed: this.t.payments.statusCompleted,
        pending: this.t.payments.statusPending,
        failed: this.t.payments.statusFailed
      }
      return labels[status] || status
    },
    viewReceipt(payment) {
      alert(`${this.t.payments.receiptFor} ${payment.serviceName}\n${this.t.payments.amount}: ${payment.amount} ${payment.currency}\n${this.t.payments.date}: ${this.formatDate(payment.date)}`)
    }
  }
}
</script>

<style scoped>
.payment-history-page {
  min-height: calc(100vh - 80px);
  padding: 3rem 0;
  background: var(--bg-secondary);
}

.page-header {
  margin-bottom: 2rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.page-subtitle {
  font-size: 1.1rem;
  color: var(--text-secondary);
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: var(--bg-primary);
  border-radius: 15px;
}

.empty-icon {
  font-size: 5rem;
  margin-bottom: 1rem;
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.empty-desc {
  font-size: 1rem;
  color: var(--text-secondary);
}

.payments-container {
  background: var(--bg-primary);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.payments-table {
  display: none;
}

.table-header {
  display: grid;
  grid-template-columns: 150px 1fr 150px 120px 120px 120px;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--bg-secondary);
  border-bottom: 2px solid var(--border-color);
}

.header-cell {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
}

.table-body {
  display: flex;
  flex-direction: column;
}

.table-row {
  display: grid;
  grid-template-columns: 150px 1fr 150px 120px 120px 120px;
  gap: 1rem;
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
  transition: background 0.3s ease;
}

.table-row:hover {
  background: var(--bg-secondary);
}

.table-cell {
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  color: var(--text-primary);
}

.service-name {
  font-weight: 600;
}

.payment-method {
  padding: 0.25rem 0.75rem;
  background: var(--bg-secondary);
  border-radius: 20px;
  font-size: 0.85rem;
}

.amount-value {
  font-weight: 700;
  color: var(--primary-color);
}

.status-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.status-badge.completed {
  background: rgba(52, 199, 89, 0.1);
  color: #34c759;
}

.status-badge.pending {
  background: rgba(255, 149, 0, 0.1);
  color: #ff9500;
}

.status-badge.failed {
  background: rgba(255, 59, 48, 0.1);
  color: #ff3b30;
}

.btn-action {
  padding: 0.5rem 1rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-action:hover {
  background: var(--primary-hover);
  transform: translateY(-2px);
}

.mobile-payments {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.payment-card {
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.payment-card .card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.payment-date {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.payment-card .card-body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-label {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.info-value {
  font-size: 0.95rem;
  color: var(--text-primary);
  font-weight: 500;
}

.info-value.amount {
  font-weight: 700;
  color: var(--primary-color);
}

.payment-card .card-footer {
  display: flex;
  justify-content: flex-end;
}

.payment-card .btn-action {
  width: 100%;
}

@media (min-width: 1024px) {
  .payments-table {
    display: block;
  }

  .mobile-payments {
    display: none;
  }
}

@media (max-width: 768px) {
  .payment-history-page {
    padding: 2rem 0;
  }

  .page-title {
    font-size: 1.8rem;
  }
}
</style>
