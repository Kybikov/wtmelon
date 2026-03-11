const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Content-Type': 'application/json'
}

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers,
    body: JSON.stringify(body)
  }
}

function formatAmount(amount, ccy) {
  const normalized = Number.isFinite(amount) ? amount / 100 : 0
  const currency = ccy === 840 ? 'USD' : ccy === 978 ? 'EUR' : 'UAH'
  return `${normalized.toFixed(2)} ${currency}`
}

function getStatusDescription(status) {
  switch (status) {
    case 'created':
      return 'Счет создан, ожидает оплату. Деньги еще не получены.'
    case 'processing':
      return 'Платеж обрабатывается банком. Деньги еще не подтверждены.'
    case 'success':
      return 'Платеж успешно оплачен. Деньги получены.'
    case 'failure':
      return 'Оплата не прошла. Деньги не получены.'
    case 'reversed':
      return 'Платеж возвращен клиенту.'
    case 'expired':
      return 'Счет истек без оплаты. Деньги не получены.'
    default:
      return 'Получено обновление статуса платежа.'
  }
}

async function sendTelegramMessage(text) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    return
  }

  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML'
    })
  })
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return jsonResponse(200, {})
  }

  if (event.httpMethod !== 'GET') {
    return jsonResponse(405, { error: 'Method not allowed' })
  }

  const monoToken = process.env.MONOBANK_TOKEN
  const invoiceId = event.queryStringParameters?.invoiceId
  const notifyTelegram = event.queryStringParameters?.notifyTelegram === 'true'

  if (!monoToken) {
    return jsonResponse(500, { error: 'Monobank token is not configured' })
  }

  if (!invoiceId) {
    return jsonResponse(400, { error: 'invoiceId is required' })
  }

  try {
    const url = new URL('https://api.monobank.ua/api/merchant/invoice/status')
    url.searchParams.set('invoiceId', invoiceId)

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Token': monoToken
      }
    })

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      return jsonResponse(response.status, {
        error: data.errText || data.errorDescription || 'Failed to get invoice status'
      })
    }

    if (notifyTelegram) {
      try {
        await sendTelegramMessage(
          `<b>Fallback-проверка оплаты</b>\n` +
          `<b>Invoice ID:</b> ${invoiceId}\n` +
          `<b>Статус:</b> ${data.status || 'unknown'}\n` +
          `<b>Сумма:</b> ${formatAmount(data.amount, data.ccy)}\n` +
          `<b>Итог:</b> ${getStatusDescription(data.status)}`
        )
      } catch (error) {
        console.error('Fallback Telegram notification error:', error)
      }
    }

    return jsonResponse(200, {
      status: data.status || 'unknown',
      description: getStatusDescription(data.status),
      amount: data.amount || 0,
      ccy: data.ccy || 980,
      invoiceId: data.invoiceId || invoiceId
    })
  } catch (error) {
    console.error('Payment status error:', error)
    return jsonResponse(500, { error: 'Internal server error' })
  }
}
