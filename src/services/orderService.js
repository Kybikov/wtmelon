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
