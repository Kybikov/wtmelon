const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json'
}

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers,
    body: JSON.stringify(body)
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function decodeMetadata(rawValue) {
  if (!rawValue) {
    return {}
  }

  try {
    return JSON.parse(Buffer.from(rawValue, 'base64url').toString('utf8'))
  } catch {
    return {}
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

function buildStatusMessage(payload, meta, source = 'webhook') {
  const reference = payload?.merchantPaymInfo?.reference || meta.orderId || payload?.invoiceId || 'UNKNOWN'
  const destination = payload?.merchantPaymInfo?.destination || [meta.productName, meta.plan, meta.duration].filter(Boolean).join(' • ') || 'Заказ'
  const status = payload?.status || 'unknown'
  const lines = [
    `<b>Обновление оплаты Monobank</b>`,
    `<b>Источник:</b> ${escapeHtml(source)}`,
    `<b>Заказ:</b> ${escapeHtml(reference)}`,
    `<b>Invoice ID:</b> ${escapeHtml(payload?.invoiceId || 'n/a')}`,
    `<b>Товар:</b> ${escapeHtml(destination)}`,
    `<b>Статус:</b> ${escapeHtml(status)}`,
    `<b>Сумма:</b> ${escapeHtml(formatAmount(payload?.amount, payload?.ccy))}`,
    `<b>Итог:</b> ${escapeHtml(getStatusDescription(status))}`
  ]

  if (meta.email) {
    lines.push(`<b>Email клиента:</b> ${escapeHtml(meta.email)}`)
  }

  return lines.join('\n')
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

async function sendReceipt(invoiceId, email) {
  const monoToken = process.env.MONOBANK_TOKEN

  if (!monoToken || !invoiceId || !email) {
    return { skipped: true }
  }

  const url = new URL('https://api.monobank.ua/api/merchant/invoice/receipt')
  url.searchParams.set('invoiceId', invoiceId)
  url.searchParams.set('email', email)

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-Token': monoToken
    }
  })

  const data = await response.json().catch(() => ({}))

  return {
    ok: response.ok,
    status: response.status,
    data
  }
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return jsonResponse(200, {})
  }

  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { error: 'Method not allowed' })
  }

  const webhookSecret = process.env.MONOBANK_WEBHOOK_SECRET
  const incomingSecret = event.queryStringParameters?.secret
  const meta = decodeMetadata(event.queryStringParameters?.meta)

  if (webhookSecret && incomingSecret !== webhookSecret) {
    return jsonResponse(401, { error: 'Invalid webhook secret' })
  }

  let payload

  try {
    payload = JSON.parse(event.body || '{}')
  } catch {
    return jsonResponse(400, { error: 'Invalid request body' })
  }

  try {
    await sendTelegramMessage(buildStatusMessage(payload, meta, 'webhook'))
  } catch (error) {
    console.error('Webhook notification error:', error)
  }

  if (payload?.status === 'success' && payload?.invoiceId && meta.email) {
    try {
      const receiptResult = await sendReceipt(payload.invoiceId, meta.email)

      if (!receiptResult.ok && !receiptResult.skipped) {
        console.error('Receipt sending error:', receiptResult)
      }
    } catch (error) {
      console.error('Receipt request error:', error)
    }
  }

  return jsonResponse(200, { received: true })
}
