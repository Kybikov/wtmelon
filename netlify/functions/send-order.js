const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json'
}

const CURRENCY_NUMERIC_CODES = {
  UAH: 980,
  USD: 840,
  EUR: 978
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

function getOrigin(event) {
  const proto = event.headers['x-forwarded-proto'] || 'https'
  const host = event.headers.host || ''
  const requestOrigin = host ? `${proto}://${host}` : ''
  const isLocalHost = /(^localhost\b)|(^127\.0\.0\.1\b)|(^::1$)/i.test(host)
  const explicitOrigin = process.env.FRONTEND_ORIGIN

  if (isLocalHost && requestOrigin) {
    return requestOrigin
  }

  if (explicitOrigin) {
    return explicitOrigin.replace(/\/$/, '')
  }

  return requestOrigin
}

function normalizeAmount(price) {
  const parsed = typeof price === 'number' ? price : Number.parseFloat(String(price).replace(',', '.'))

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return null
  }

  return Math.round(parsed * 100)
}

function getCurrencyNumericCode(currencyCode) {
  return CURRENCY_NUMERIC_CODES[String(currencyCode || '').toUpperCase()] || 980
}

function encodeMetadata(value) {
  return Buffer.from(JSON.stringify(value), 'utf8').toString('base64url')
}

function buildTelegramMessage(order) {
  const timestamp = new Date().toLocaleString('ru-RU', {
    timeZone: 'Europe/Kyiv',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })

  const lines = [
    `<b>Создан новый заказ #${escapeHtml(order.orderId)}</b>`,
    '',
    `<b>Товар:</b> ${escapeHtml(order.productName)}`,
    `<b>Тариф:</b> ${escapeHtml(order.plan)}`,
    `<b>Срок:</b> ${escapeHtml(order.duration)}`,
    `<b>Сумма:</b> ${escapeHtml(`${order.price} ${order.currencyCode}`)}`,
    '',
    `<b>Клиент:</b> ${escapeHtml(order.customerName)}`,
    `<b>Email:</b> ${escapeHtml(order.email)}`,
    `<b>Статус:</b> Счет создан, ожидает оплату. Деньги еще не получены.`
  ]

  if (order.telegram) {
    lines.push(`<b>Telegram:</b> ${escapeHtml(order.telegram.startsWith('@') ? order.telegram : `@${order.telegram}`)}`)
  }

  if (order.phone) {
    lines.push(`<b>Телефон:</b> ${escapeHtml(order.phone)}`)
  }

  if (order.comment) {
    lines.push('', `<b>Комментарий:</b> ${escapeHtml(order.comment)}`)
  }

  if (order.immediateStart) {
    lines.push('', '<b>Клиент согласился на немедленное начало оказания услуги.</b>')
  }

  lines.push('', `<b>Время:</b> ${escapeHtml(timestamp)}`)

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

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return jsonResponse(200, {})
  }

  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { error: 'Method not allowed' })
  }

  let body

  try {
    body = JSON.parse(event.body || '{}')
  } catch {
    return jsonResponse(400, { error: 'Invalid request body' })
  }

  const {
    productName,
    productIcon,
    plan,
    duration,
    price,
    currencyCode,
    currency,
    customerName,
    telegram,
    phone,
    email,
    comment,
    immediateStart,
    locale
  } = body

  if (!productName || !plan || !duration || !customerName || !email || (!telegram && !phone)) {
    return jsonResponse(400, { error: 'Missing required fields' })
  }

  const amount = normalizeAmount(price)

  if (!amount) {
    return jsonResponse(400, { error: 'Invalid price value' })
  }

  const monoToken = process.env.MONOBANK_TOKEN

  if (!monoToken) {
    return jsonResponse(500, { error: 'Monobank token is not configured' })
  }

  const orderId = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`.toUpperCase()
  const origin = getOrigin(event)
  const webhookSecret = process.env.MONOBANK_WEBHOOK_SECRET
  const numericCurrencyCode = getCurrencyNumericCode(currencyCode)
  const metadata = encodeMetadata({
    orderId,
    email,
    locale: locale || 'ru',
    productName,
    plan,
    duration,
    productIcon: productIcon || ''
  })

  const webhookUrl = new URL(`${origin}/.netlify/functions/monobank-webhook`)

  if (webhookSecret) {
    webhookUrl.searchParams.set('secret', webhookSecret)
  }

  webhookUrl.searchParams.set('meta', metadata)

  const invoicePayload = {
    amount,
    ccy: numericCurrencyCode,
    paymentType: 'debit',
    redirectUrl: `${origin}/?payment=return&orderId=${encodeURIComponent(orderId)}`,
    webHookUrl: webhookUrl.toString(),
    merchantPaymInfo: {
      reference: orderId,
      destination: `${productName} • ${plan} • ${duration}`,
      comment: `Customer: ${customerName}; Email: ${email}`,
      customerEmails: [email],
      basketOrder: [
        {
          name: `${productName} (${plan}, ${duration})`,
          qty: 1,
          sum: amount,
          code: orderId,
          icon: productIcon || undefined
        }
      ]
    }
  }

  try {
    const response = await fetch('https://api.monobank.ua/api/merchant/invoice/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': monoToken,
        'X-Cms': 'wtmelon',
        'X-Cms-Version': '1.0.0'
      },
      body: JSON.stringify(invoicePayload)
    })

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      console.error('Monobank invoice create error:', data)
      return jsonResponse(response.status, {
        error: data.errText || data.errorDescription || 'Failed to create Monobank invoice'
      })
    }

    if (!data.pageUrl) {
      console.error('Monobank response without pageUrl:', data)
      return jsonResponse(502, { error: 'Payment URL is missing in Monobank response' })
    }

    try {
      await sendTelegramMessage(buildTelegramMessage({
        orderId,
        productName,
        plan,
        duration,
        price,
        currencyCode: currencyCode || currency || 'UAH',
        customerName,
        telegram,
        phone,
        email,
        comment,
        immediateStart
      }))
    } catch (notificationError) {
      console.error('Telegram notification error:', notificationError)
    }

    return jsonResponse(200, {
      success: true,
      orderId,
      invoiceId: data.invoiceId,
      paymentUrl: data.pageUrl
    })
  } catch (error) {
    console.error('Error processing order:', error)
    return jsonResponse(500, { error: 'Internal server error' })
  }
}
