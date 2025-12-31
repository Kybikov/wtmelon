<template>
  <div class="dashboard-page">
    <div class="container">
      <div class="dashboard-header">
        <div class="welcome-section">
          <h1 class="dashboard-title">{{ t.dashboard.welcome }}, {{ currentUser?.name?.split(' ')[0] }}!</h1>
          <p class="dashboard-subtitle">{{ t.dashboard.subtitle }}</p>
        </div>

        <div class="quick-stats">
          <div class="stat-card">
            <div class="stat-icon">📊</div>
            <div class="stat-content">
              <div class="stat-value">{{ activeSubscriptions.length }}</div>
              <div class="stat-label">{{ t.dashboard.activeSubscriptions }}</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">💰</div>
            <div class="stat-content">
              <div class="stat-value">{{ totalMonthlySpent }} {{ t.dashboard.currency }}</div>
              <div class="stat-label">{{ t.dashboard.monthlySpending }}</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">⚠️</div>
            <div class="stat-content">
              <div class="stat-value">{{ upcomingRenewals.length }}</div>
              <div class="stat-label">{{ t.dashboard.upcomingRenewals }}</div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="upcomingRenewals.length > 0" class="notifications-section">
        <h2 class="section-title">{{ t.dashboard.notifications }}</h2>
        <div class="notification-list">
          <div v-for="renewal in upcomingRenewals" :key="renewal.id" class="notification-card warning">
            <div class="notification-icon">⏰</div>
            <div class="notification-content">
              <p class="notification-text">
                {{ t.dashboard.expiringNotification }}
                <strong>{{ renewal.serviceName }}</strong>
                {{ t.dashboard.expiringIn }}
                <strong>{{ renewal.daysLeft }} {{ getDaysLabel(renewal.daysLeft) }}</strong>
              </p>
            </div>
            <router-link to="/dashboard/subscriptions" class="notification-action">
              {{ t.dashboard.viewDetails }}
            </router-link>
          </div>
        </div>
      </div>

      <div class="dashboard-nav">
        <router-link to="/dashboard/subscriptions" class="nav-card">
          <div class="nav-card-icon">📦</div>
          <h3 class="nav-card-title">{{ t.dashboard.mySubscriptions }}</h3>
          <p class="nav-card-desc">{{ t.dashboard.mySubscriptionsDesc }}</p>
          <div class="nav-card-arrow">→</div>
        </router-link>

        <router-link to="/dashboard/payments" class="nav-card">
          <div class="nav-card-icon">💳</div>
          <h3 class="nav-card-title">{{ t.dashboard.paymentHistory }}</h3>
          <p class="nav-card-desc">{{ t.dashboard.paymentHistoryDesc }}</p>
          <div class="nav-card-arrow">→</div>
        </router-link>

        <router-link to="/dashboard/settings" class="nav-card">
          <div class="nav-card-icon">⚙️</div>
          <h3 class="nav-card-title">{{ t.dashboard.settings }}</h3>
          <p class="nav-card-desc">{{ t.dashboard.settingsDesc }}</p>
          <div class="nav-card-arrow">→</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuth } from '../composables/useAuth'
import { useSubscriptions } from '../composables/useSubscriptions'
import { useLanguage } from '../composables/useLanguage'

export default {
  name: 'Dashboard',
  setup() {
    const { currentUser } = useAuth()
    const {
      getActiveSubscriptions,
      getTotalMonthlySpent,
      getUpcomingRenewals
    } = useSubscriptions()
    const { t } = useLanguage()

    return {
      currentUser,
      getActiveSubscriptions,
      getTotalMonthlySpent,
      getUpcomingRenewals,
      t
    }
  },
  computed: {
    activeSubscriptions() {
      return this.getActiveSubscriptions(this.currentUser?.id)
    },
    totalMonthlySpent() {
      return this.getTotalMonthlySpent(this.currentUser?.id)
    },
    upcomingRenewals() {
      return this.getUpcomingRenewals(this.currentUser?.id)
    }
  },
  methods: {
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
.dashboard-page {
  min-height: calc(100vh - 80px);
  padding: 3rem 0;
  background: var(--bg-secondary);
}

.dashboard-header {
  margin-bottom: 3rem;
}

.welcome-section {
  margin-bottom: 2rem;
}

.dashboard-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.dashboard-subtitle {
  font-size: 1.1rem;
  color: var(--text-secondary);
}

.quick-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.stat-card {
  background: var(--bg-primary);
  border-radius: 15px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  font-size: 2.5rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-secondary);
  border-radius: 12px;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.notifications-section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.notification-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.notification-card {
  background: var(--bg-primary);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.notification-card.warning {
  border-left: 4px solid #ff9500;
}

.notification-icon {
  font-size: 1.5rem;
}

.notification-content {
  flex: 1;
}

.notification-text {
  color: var(--text-primary);
  line-height: 1.5;
}

.notification-action {
  padding: 0.5rem 1rem;
  background: var(--primary-color);
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.notification-action:hover {
  background: var(--primary-hover);
  transform: translateX(5px);
}

.dashboard-nav {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.nav-card {
  background: var(--bg-primary);
  border-radius: 15px;
  padding: 2rem;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.nav-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--primary-color);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.nav-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.nav-card:hover::before {
  transform: scaleX(1);
}

.nav-card-icon {
  font-size: 3rem;
}

.nav-card-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
}

.nav-card-desc {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.nav-card-arrow {
  font-size: 1.5rem;
  color: var(--primary-color);
  align-self: flex-end;
  transition: transform 0.3s ease;
}

.nav-card:hover .nav-card-arrow {
  transform: translateX(5px);
}

@media (max-width: 768px) {
  .dashboard-page {
    padding: 2rem 0;
  }

  .dashboard-title {
    font-size: 1.8rem;
  }

  .quick-stats {
    grid-template-columns: 1fr;
  }

  .notification-card {
    flex-direction: column;
    text-align: center;
  }

  .notification-action {
    width: 100%;
  }

  .dashboard-nav {
    grid-template-columns: 1fr;
  }
}
</style>
