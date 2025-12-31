<template>
  <div class="subscription-card" :class="statusInfo.variant">
    <div class="card-header">
      <div class="service-info">
        <div class="service-icon">{{ subscription.icon }}</div>
        <div class="service-details">
          <h3 class="service-name">{{ subscription.serviceName }}</h3>
          <span class="service-plan">{{ getPlanLabel(subscription.planType) }}</span>
        </div>
      </div>
      <div class="status-badge" :class="statusInfo.variant">
        {{ getStatusLabel(statusInfo.status) }}
      </div>
    </div>

    <div class="card-body">
      <div class="info-row">
        <span class="info-label">{{ t.subscriptions.startDate }}:</span>
        <span class="info-value">{{ formatDate(subscription.startDate) }}</span>
      </div>
      <div class="info-row">
        <span class="info-label">{{ t.subscriptions.endDate }}:</span>
        <span class="info-value">{{ formatDate(subscription.endDate) }}</span>
      </div>
      <div class="info-row">
        <span class="info-label">{{ t.subscriptions.price }}:</span>
        <span class="info-value price">{{ subscription.price }} {{ subscription.currency }}</span>
      </div>
    </div>

    <div class="card-footer">
      <div v-if="statusInfo.daysLeft > 0" class="days-remaining" :class="statusInfo.variant">
        <span class="days-icon">⏱️</span>
        <span class="days-text">
          {{ statusInfo.daysLeft }} {{ getDaysLabel(statusInfo.daysLeft) }} {{ t.subscriptions.remaining }}
        </span>
      </div>
      <div v-else class="days-remaining danger">
        <span class="days-icon">❌</span>
        <span class="days-text">{{ t.subscriptions.expired }}</span>
      </div>

      <button
        v-if="statusInfo.status !== 'expired'"
        @click="$emit('renew', subscription)"
        class="btn-renew"
      >
        {{ t.subscriptions.renewButton }}
      </button>
      <button
        v-else
        @click="$emit('renew', subscription)"
        class="btn-renew"
      >
        {{ t.subscriptions.reactivateButton }}
      </button>
    </div>
  </div>
</template>

<script>
import { useLanguage } from '../composables/useLanguage'
import { useSubscriptions } from '../composables/useSubscriptions'

export default {
  name: 'SubscriptionCard',
  props: {
    subscription: {
      type: Object,
      required: true
    }
  },
  emits: ['renew'],
  setup() {
    const { t } = useLanguage()
    const { getSubscriptionStatus } = useSubscriptions()

    return {
      t,
      getSubscriptionStatus
    }
  },
  computed: {
    statusInfo() {
      return this.getSubscriptionStatus(this.subscription)
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
    getStatusLabel(status) {
      const labels = {
        active: this.t.subscriptions.statusActive,
        expiring: this.t.subscriptions.statusExpiring,
        expired: this.t.subscriptions.statusExpired
      }
      return labels[status] || status
    },
    getDaysLabel(days) {
      if (days === 1) {
        return this.t.dashboard.day
      } else if (days >= 2 && days <= 4) {
        return this.t.dashboard.days2to4
      } else {
        return this.t.dashboard.days
      }
    }
  }
}
</script>

<style scoped>
.subscription-card {
  background: var(--bg-primary);
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
}

.subscription-card.success {
  border-left-color: #34c759;
}

.subscription-card.warning {
  border-left-color: #ff9500;
}

.subscription-card.danger {
  border-left-color: #ff3b30;
}

.subscription-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  gap: 1rem;
}

.service-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.service-icon {
  font-size: 2.5rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-secondary);
  border-radius: 12px;
}

.service-details {
  flex: 1;
}

.service-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.service-plan {
  font-size: 0.85rem;
  color: var(--text-secondary);
  background: var(--bg-secondary);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
}

.status-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
}

.status-badge.success {
  background: rgba(52, 199, 89, 0.1);
  color: #34c759;
}

.status-badge.warning {
  background: rgba(255, 149, 0, 0.1);
  color: #ff9500;
}

.status-badge.danger {
  background: rgba(255, 59, 48, 0.1);
  color: #ff3b30;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--bg-secondary);
  border-radius: 10px;
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

.info-value.price {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--primary-color);
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.days-remaining {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  flex: 1;
}

.days-remaining.success {
  background: rgba(52, 199, 89, 0.1);
  color: #34c759;
}

.days-remaining.warning {
  background: rgba(255, 149, 0, 0.1);
  color: #ff9500;
}

.days-remaining.danger {
  background: rgba(255, 59, 48, 0.1);
  color: #ff3b30;
}

.days-icon {
  font-size: 1.2rem;
}

.btn-renew {
  padding: 0.75rem 1.5rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.btn-renew:hover {
  background: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(88, 195, 34, 0.3);
}

@media (max-width: 768px) {
  .card-header {
    flex-direction: column;
  }

  .status-badge {
    align-self: flex-start;
  }

  .card-footer {
    flex-direction: column;
    align-items: stretch;
  }

  .btn-renew {
    width: 100%;
  }
}
</style>
