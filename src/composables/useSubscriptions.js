import { ref, computed } from 'vue'
import { mockSubscriptions, mockPayments, pricingPlans, getServiceKey } from '../data/mockData'

const subscriptions = ref([...mockSubscriptions])
const payments = ref([...mockPayments])

export function useSubscriptions() {
  const getUserSubscriptions = (userId) => {
    return subscriptions.value.filter(sub => sub.userId === userId)
  }

  const getUserPayments = (userId) => {
    return payments.value
      .filter(pay => pay.userId === userId)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  }

  const getActiveSubscriptions = (userId) => {
    return getUserSubscriptions(userId).filter(sub =>
      sub.status === 'active' || sub.status === 'expiring'
    )
  }

  const getExpiredSubscriptions = (userId) => {
    return getUserSubscriptions(userId).filter(sub => sub.status === 'expired')
  }

  const getDaysUntilExpiry = (endDate) => {
    const today = new Date()
    const end = new Date(endDate)
    const diffTime = end - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getSubscriptionStatus = (subscription) => {
    const daysLeft = getDaysUntilExpiry(subscription.endDate)

    if (daysLeft < 0) {
      return { status: 'expired', variant: 'danger', daysLeft: 0 }
    } else if (daysLeft <= 7) {
      return { status: 'expiring', variant: 'warning', daysLeft }
    } else {
      return { status: 'active', variant: 'success', daysLeft }
    }
  }

  const renewSubscription = async (subscriptionId, duration, price) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const subIndex = subscriptions.value.findIndex(s => s.id === subscriptionId)

        if (subIndex !== -1) {
          const subscription = subscriptions.value[subIndex]
          const currentEndDate = new Date(subscription.endDate)
          const today = new Date()

          const startDate = currentEndDate > today ? currentEndDate : today
          const newEndDate = new Date(startDate)
          newEndDate.setMonth(newEndDate.getMonth() + duration)

          subscriptions.value[subIndex] = {
            ...subscription,
            endDate: newEndDate.toISOString().split('T')[0],
            status: 'active'
          }

          const newPayment = {
            id: 'pay-' + Date.now(),
            subscriptionId: subscriptionId,
            userId: subscription.userId,
            serviceName: subscription.serviceName,
            amount: price,
            currency: subscription.currency,
            status: 'completed',
            paymentMethod: 'card',
            date: new Date().toISOString().split('T')[0],
            receiptUrl: '#'
          }

          payments.value.unshift(newPayment)

          resolve({
            subscription: subscriptions.value[subIndex],
            payment: newPayment
          })
        }
      }, 1000)
    })
  }

  const getPricingPlans = (serviceName) => {
    const serviceKey = getServiceKey(serviceName)
    return pricingPlans[serviceKey] || pricingPlans.spotify
  }

  const getTotalMonthlySpent = (userId) => {
    const activeSubs = getActiveSubscriptions(userId)
    return activeSubs.reduce((total, sub) => total + sub.price, 0)
  }

  const getUpcomingRenewals = (userId) => {
    const subs = getActiveSubscriptions(userId)
    return subs
      .map(sub => ({
        ...sub,
        daysLeft: getDaysUntilExpiry(sub.endDate)
      }))
      .filter(sub => sub.daysLeft <= 30 && sub.daysLeft > 0)
      .sort((a, b) => a.daysLeft - b.daysLeft)
  }

  return {
    subscriptions: computed(() => subscriptions.value),
    payments: computed(() => payments.value),
    getUserSubscriptions,
    getUserPayments,
    getActiveSubscriptions,
    getExpiredSubscriptions,
    getDaysUntilExpiry,
    getSubscriptionStatus,
    renewSubscription,
    getPricingPlans,
    getTotalMonthlySpent,
    getUpcomingRenewals
  }
}
