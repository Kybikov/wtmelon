export const mockSubscriptions = [
  {
    id: 'sub-1',
    userId: '1',
    serviceName: 'Spotify Premium',
    serviceType: 'music',
    planType: 'individual',
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2025-01-15',
    price: 149,
    currency: 'UAH',
    autoRenew: true,
    icon: '🎵'
  },
  {
    id: 'sub-2',
    userId: '1',
    serviceName: 'Deezer Family',
    serviceType: 'music',
    planType: 'family',
    status: 'active',
    startDate: '2024-03-10',
    endDate: '2024-12-25',
    price: 199,
    currency: 'UAH',
    autoRenew: false,
    icon: '🎶'
  },
  {
    id: 'sub-3',
    userId: '1',
    serviceName: 'Netflix Standard',
    serviceType: 'video',
    planType: 'standard',
    status: 'expiring',
    startDate: '2024-02-01',
    endDate: '2025-01-05',
    price: 299,
    currency: 'UAH',
    autoRenew: false,
    icon: '🎬'
  },
  {
    id: 'sub-4',
    userId: '1',
    serviceName: 'YouTube Premium',
    serviceType: 'video',
    planType: 'individual',
    status: 'active',
    startDate: '2024-06-01',
    endDate: '2025-06-01',
    price: 179,
    currency: 'UAH',
    autoRenew: true,
    icon: '📺'
  },
  {
    id: 'sub-5',
    userId: '1',
    serviceName: 'Apple Music',
    serviceType: 'music',
    planType: 'student',
    status: 'expired',
    startDate: '2023-09-01',
    endDate: '2024-09-01',
    price: 79,
    currency: 'UAH',
    autoRenew: false,
    icon: '🍎'
  }
]

export const mockPayments = [
  {
    id: 'pay-1',
    subscriptionId: 'sub-1',
    userId: '1',
    serviceName: 'Spotify Premium',
    amount: 149,
    currency: 'UAH',
    status: 'completed',
    paymentMethod: 'card',
    date: '2024-01-15',
    receiptUrl: '#'
  },
  {
    id: 'pay-2',
    subscriptionId: 'sub-3',
    userId: '1',
    serviceName: 'Netflix Standard',
    amount: 299,
    currency: 'UAH',
    status: 'completed',
    paymentMethod: 'card',
    date: '2024-02-01',
    receiptUrl: '#'
  },
  {
    id: 'pay-3',
    subscriptionId: 'sub-2',
    userId: '1',
    serviceName: 'Deezer Family',
    amount: 199,
    currency: 'UAH',
    status: 'completed',
    paymentMethod: 'crypto',
    date: '2024-03-10',
    receiptUrl: '#'
  },
  {
    id: 'pay-4',
    subscriptionId: 'sub-4',
    userId: '1',
    serviceName: 'YouTube Premium',
    amount: 179,
    currency: 'UAH',
    status: 'completed',
    paymentMethod: 'card',
    date: '2024-06-01',
    receiptUrl: '#'
  },
  {
    id: 'pay-5',
    subscriptionId: 'sub-5',
    userId: '1',
    serviceName: 'Apple Music',
    amount: 79,
    currency: 'UAH',
    status: 'completed',
    paymentMethod: 'paypal',
    date: '2023-09-01',
    receiptUrl: '#'
  },
  {
    id: 'pay-6',
    subscriptionId: 'sub-1',
    userId: '1',
    serviceName: 'Spotify Premium',
    amount: 149,
    currency: 'UAH',
    status: 'pending',
    paymentMethod: 'card',
    date: '2024-12-15',
    receiptUrl: '#'
  }
]

export const pricingPlans = {
  'spotify': [
    { duration: 1, price: 149, discount: 0 },
    { duration: 3, price: 399, discount: 10 },
    { duration: 6, price: 749, discount: 15 },
    { duration: 12, price: 1399, discount: 20 }
  ],
  'deezer': [
    { duration: 1, price: 199, discount: 0 },
    { duration: 3, price: 549, discount: 8 },
    { duration: 6, price: 999, discount: 15 },
    { duration: 12, price: 1899, discount: 20 }
  ],
  'netflix': [
    { duration: 1, price: 299, discount: 0 },
    { duration: 3, price: 849, discount: 5 },
    { duration: 6, price: 1599, discount: 10 },
    { duration: 12, price: 2999, discount: 15 }
  ],
  'youtube': [
    { duration: 1, price: 179, discount: 0 },
    { duration: 3, price: 509, discount: 5 },
    { duration: 6, price: 959, discount: 10 },
    { duration: 12, price: 1799, discount: 15 }
  ]
}

export const getServiceKey = (serviceName) => {
  const name = serviceName.toLowerCase()
  if (name.includes('spotify')) return 'spotify'
  if (name.includes('deezer')) return 'deezer'
  if (name.includes('netflix')) return 'netflix'
  if (name.includes('youtube')) return 'youtube'
  return 'spotify'
}
