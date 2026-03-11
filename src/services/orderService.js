export async function sendOrder(orderData) {
  const apiUrl = '/.netlify/functions/send-order';

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to send order');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Order service error:', error);
    throw error;
  }
}

export async function checkPaymentStatus(invoiceId, notifyTelegram = false) {
  const url = new URL('/.netlify/functions/payment-status', window.location.origin)
  url.searchParams.set('invoiceId', invoiceId)

  if (notifyTelegram) {
    url.searchParams.set('notifyTelegram', 'true')
  }

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || 'Failed to check payment status')
  }

  return response.json()
}
