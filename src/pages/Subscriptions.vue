<template>
  <div class="subscriptions-page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">{{ t.subscriptions.title }}</h1>
        <p class="page-subtitle">{{ t.subscriptions.subtitle }}</p>
      </div>

      <div class="filter-tabs">
        <button
          @click="activeFilter = 'all'"
          :class="['filter-tab', { active: activeFilter === 'all' }]"
        >
          {{ t.subscriptions.filterAll }} ({{ allSubscriptions.length }})
        </button>
        <button
          @click="activeFilter = 'active'"
          :class="['filter-tab', { active: activeFilter === 'active' }]"
        >
          {{ t.subscriptions.filterActive }} ({{ activeSubscriptions.length }})
        </button>
        <button
          @click="activeFilter = 'expired'"
          :class="['filter-tab', { active: activeFilter === 'expired' }]"
        >
          {{ t.subscriptions.filterExpired }} ({{ expiredSubscriptions.length }})
        </button>
      </div>

      <div v-if="filteredSubscriptions.length === 0" class="empty-state">
        <div class="empty-icon">📭</div>
        <h3 class="empty-title">{{ t.subscriptions.noSubscriptions }}</h3>
        <p class="empty-desc">{{ t.subscriptions.noSubscriptionsDesc }}</p>
        <router-link to="/#products" class="btn-primary">
          {{ t.subscriptions.browseServices }}
        </router-link>
      </div>

      <div v-else class="subscriptions-grid">
        <SubscriptionCard
          v-for="subscription in filteredSubscriptions"
          :key="subscription.id"
          :subscription="subscription"
          @renew="openPaymentModal"
        />
      </div>
    </div>

    <PaymentModal
      v-if="showPaymentModal"
      :subscription="selectedSubscription"
      @close="closePaymentModal"
      @success="handlePaymentSuccess"
    />
  </div>
</template>

<script>
import SubscriptionCard from '../components/SubscriptionCard.vue'
import PaymentModal from '../components/PaymentModal.vue'
import { useAuth } from '../composables/useAuth'
import { useSubscriptions } from '../composables/useSubscriptions'
import { useLanguage } from '../composables/useLanguage'

export default {
  name: 'Subscriptions',
  components: {
    SubscriptionCard,
    PaymentModal
  },
  setup() {
    const { currentUser } = useAuth()
    const {
      getUserSubscriptions,
      getActiveSubscriptions,
      getExpiredSubscriptions
    } = useSubscriptions()
    const { t } = useLanguage()

    return {
      currentUser,
      getUserSubscriptions,
      getActiveSubscriptions,
      getExpiredSubscriptions,
      t
    }
  },
  data() {
    return {
      activeFilter: 'all',
      showPaymentModal: false,
      selectedSubscription: null
    }
  },
  computed: {
    allSubscriptions() {
      return this.getUserSubscriptions(this.currentUser?.id)
    },
    activeSubscriptions() {
      return this.getActiveSubscriptions(this.currentUser?.id)
    },
    expiredSubscriptions() {
      return this.getExpiredSubscriptions(this.currentUser?.id)
    },
    filteredSubscriptions() {
      if (this.activeFilter === 'active') {
        return this.activeSubscriptions
      } else if (this.activeFilter === 'expired') {
        return this.expiredSubscriptions
      }
      return this.allSubscriptions
    }
  },
  methods: {
    openPaymentModal(subscription) {
      this.selectedSubscription = subscription
      this.showPaymentModal = true
    },
    closePaymentModal() {
      this.showPaymentModal = false
      this.selectedSubscription = null
    },
    handlePaymentSuccess() {
      this.closePaymentModal()
    }
  }
}
</script>

<style scoped>
.subscriptions-page {
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

.filter-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid var(--border-color);
  overflow-x: auto;
}

.filter-tab {
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 3px solid transparent;
  margin-bottom: -2px;
  white-space: nowrap;
}

.filter-tab:hover {
  color: var(--text-primary);
}

.filter-tab.active {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
}

.subscriptions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
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
  margin-bottom: 2rem;
}

.btn-primary {
  display: inline-block;
  padding: 1rem 2rem;
  background: var(--primary-color);
  color: white;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(88, 195, 34, 0.3);
}

@media (max-width: 768px) {
  .subscriptions-page {
    padding: 2rem 0;
  }

  .page-title {
    font-size: 1.8rem;
  }

  .filter-tabs {
    gap: 0.5rem;
  }

  .filter-tab {
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
  }

  .subscriptions-grid {
    grid-template-columns: 1fr;
  }
}
</style>
