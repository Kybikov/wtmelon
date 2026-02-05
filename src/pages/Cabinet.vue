<template>
  <div class="cabinet-page">
    <div class="cabinet-header">
      <div class="container">
        <div class="header-content">
          <h1>{{ $t('cabinet.title') }}</h1>
          <button @click="handleSignOut" class="btn-signout">
            {{ $t('cabinet.signout') }}
          </button>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="cabinet-content">
        <div class="user-info-card">
          <h2>{{ $t('cabinet.userInfo') }}</h2>
          <div class="info-row">
            <span class="label">{{ $t('cabinet.email') }}:</span>
            <span class="value">{{ user?.email }}</span>
          </div>
          <div class="info-row">
            <span class="label">{{ $t('cabinet.registered') }}:</span>
            <span class="value">{{ formatDate(user?.created_at) }}</span>
          </div>
        </div>

        <div class="orders-section">
          <div class="section-header">
            <h2>{{ $t('cabinet.orders') }}</h2>
            <button @click="loadOrders" class="btn-refresh" :disabled="isLoadingOrders">
              {{ isLoadingOrders ? $t('cabinet.loading') : $t('cabinet.refresh') }}
            </button>
          </div>

          <div v-if="isLoadingOrders" class="loading-state">
            <LoadingSpinner />
          </div>

          <div v-else-if="orders.length === 0" class="empty-state">
            <p>{{ $t('cabinet.noOrders') }}</p>
          </div>

          <div v-else class="orders-grid">
            <div
              v-for="order in orders"
              :key="order.id"
              class="order-card"
            >
              <div class="order-header">
                <h3>{{ $t('cabinet.orderNumber') }}: {{ order.order_id }}</h3>
                <span class="order-date">{{ formatDate(order.created_at) }}</span>
              </div>
              <div class="order-details">
                <pre>{{ JSON.stringify(order.order_data, null, 2) }}</pre>
              </div>
            </div>
          </div>
        </div>

        <div class="nethunt-section">
          <div class="section-header">
            <h2>{{ $t('cabinet.nethuntData') }}</h2>
            <button @click="loadNethuntData" class="btn-refresh" :disabled="isLoadingNethunt">
              {{ isLoadingNethunt ? $t('cabinet.loading') : $t('cabinet.refresh') }}
            </button>
          </div>

          <div v-if="isLoadingNethunt" class="loading-state">
            <LoadingSpinner />
          </div>

          <div v-else-if="!nethuntData" class="empty-state">
            <p>{{ $t('cabinet.noNethuntData') }}</p>
          </div>

          <div v-else class="data-card">
            <pre>{{ JSON.stringify(nethuntData, null, 2) }}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import { useLocale } from '../composables/useLocale';
import { supabase } from '../services/supabaseClient';
import { nethuntService } from '../services/nethuntService';
import LoadingSpinner from '../components/LoadingSpinner.vue';

const { t } = useLocale();
const router = useRouter();
const { user, signOut } = useAuth();

const orders = ref([]);
const nethuntData = ref(null);
const isLoadingOrders = ref(false);
const isLoadingNethunt = ref(false);

const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleString();
};

const handleSignOut = async () => {
  await signOut();
  router.push('/login');
};

const loadOrders = async () => {
  isLoadingOrders.value = true;
  try {
    const { data, error } = await supabase
      .from('customer_orders')
      .select('*')
      .eq('user_id', user.value.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    orders.value = data || [];
  } catch (error) {
    console.error('Error loading orders:', error);
  } finally {
    isLoadingOrders.value = false;
  }
};

const loadNethuntData = async () => {
  isLoadingNethunt.value = true;
  try {
    const data = await nethuntService.getCustomerData(user.value.email);
    nethuntData.value = data;
  } catch (error) {
    console.error('Error loading NetHunt data:', error);
  } finally {
    isLoadingNethunt.value = false;
  }
};

onMounted(() => {
  if (user.value) {
    loadOrders();
    loadNethuntData();
  }
});
</script>

<style scoped>
.cabinet-page {
  min-height: 100vh;
  background-color: #f7fafc;
}

.cabinet-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 32px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-content h1 {
  font-size: 32px;
  font-weight: 700;
  margin: 0;
}

.btn-signout {
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid white;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-signout:hover {
  background: white;
  color: #667eea;
}

.cabinet-content {
  padding: 32px 0;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.user-info-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.user-info-card h2 {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 20px 0;
  color: #1a202c;
}

.info-row {
  display: flex;
  padding: 12px 0;
  border-bottom: 1px solid #e2e8f0;
}

.info-row:last-child {
  border-bottom: none;
}

.info-row .label {
  font-weight: 600;
  color: #4a5568;
  min-width: 150px;
}

.info-row .value {
  color: #2d3748;
}

.orders-section,
.nethunt-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h2 {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  color: #1a202c;
}

.btn-refresh {
  padding: 8px 16px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-refresh:hover:not(:disabled) {
  background: #764ba2;
}

.btn-refresh:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading-state {
  display: flex;
  justify-content: center;
  padding: 40px;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #718096;
}

.orders-grid {
  display: grid;
  gap: 16px;
}

.order-card {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 20px;
  transition: box-shadow 0.2s;
}

.order-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e2e8f0;
}

.order-header h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: #2d3748;
}

.order-date {
  font-size: 14px;
  color: #718096;
}

.order-details pre {
  background: #f7fafc;
  padding: 16px;
  border-radius: 6px;
  font-size: 12px;
  overflow-x: auto;
  margin: 0;
}

.data-card pre {
  background: #f7fafc;
  padding: 20px;
  border-radius: 8px;
  font-size: 13px;
  overflow-x: auto;
  margin: 0;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }

  .header-content h1 {
    font-size: 24px;
  }

  .info-row {
    flex-direction: column;
    gap: 4px;
  }

  .info-row .label {
    min-width: auto;
  }

  .section-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
}
</style>
