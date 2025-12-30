import { ref, computed } from 'vue'

const currentLanguage = ref(localStorage.getItem('language') || 'uk')

const translations = {
  uk: {
    nav: {
      home: 'Головна',
      services: 'Послуги',
      about: 'Про нас',
      contact: 'Контакти'
    },
    hero: {
      title: 'Послуги доступу до',
      subtitle: 'стримінгових сервісів',
      description: 'Вигідні пропозиції на Spotify, Deezer та інші популярні сервіси. Індивідуальні, сімейні та групові тарифи. Надійно, швидко, вигідно.',
      cta: 'Дивитись послуги'
    },
    services: {
      title: 'Наші послуги',
      subtitle: 'Оберіть підходящий варіант',
      viewDetails: 'Детальніше',
      from: 'Від'
    },
    modal: {
      close: 'Закрити',
      selectPlan: 'Оберіть план',
      duration: 'Тривалість',
      months: 'міс',
      features: 'Що входить',
      total: 'До сплати',
      order: 'Замовити',
      serviceAccess: 'Послуга надання доступу'
    },
    about: {
      title: 'Про Watermelon',
      subtitle: 'Надійні послуги для вас',
      description: 'Watermelon - це ваш надійний партнер у світі цифрових підписок. Ми пропонуємо вигідні ціни на популярні стримінгові сервіси, швидку активацію та цілодобову підтримку.',
      security: {
        title: 'Безпека',
        desc: 'Всі акаунти перевірені та захищені'
      },
      speed: {
        title: 'Швидка активація',
        desc: 'Отримайте доступ протягом 5 хвилин'
      },
      support: {
        title: 'Підтримка 24/7',
        desc: 'Завжди готові допомогти вам'
      },
      price: {
        title: 'Вигідні ціни',
        desc: 'Найкращі пропозиції на ринку'
      }
    },
    contact: {
      title: 'Контакти',
      subtitle: "Зв'яжіться з нами",
      info: 'З будь-яких питань та підтримки',
      workingHours: 'Час роботи',
      support247: '24/7 онлайн підтримка',
      form: {
        name: "Ваше ім'я",
        email: 'Ваш Email',
        phone: 'Ваш телефон',
        subject: 'Тема',
        message: 'Ваше повідомлення',
        send: 'Надіслати',
        success: 'Дякуємо за ваше повідомлення! Ми звʼяжемося з вами найближчим часом.'
      }
    },
    footer: {
      newsletter: 'Розсилка',
      newsletterDesc: 'Підпишіться на розсилку та отримуйте ексклюзивні пропозиції',
      email: 'Введіть ваш email',
      subscribe: 'Підписатися',
      subscribeSuccess: 'Дякуємо за підписку!',
      privacy: 'Політика конфіденційності',
      terms: 'Договір оферти',
      rights: 'Всі права захищені'
    },
    legal: {
      privacy: {
        title: 'Політика конфіденційності',
        updated: 'Останнє оновлення'
      },
      terms: {
        title: 'Договір оферти',
        updated: 'Останнє оновлення'
      }
    }
  },
  ru: {
    nav: {
      home: 'Главная',
      services: 'Услуги',
      about: 'О нас',
      contact: 'Контакты'
    },
    hero: {
      title: 'Услуги доступа к',
      subtitle: 'стриминговым сервисам',
      description: 'Выгодные предложения на Spotify, Deezer и другие популярные сервисы. Индивидуальные, семейные и групповые тарифы. Надежно, быстро, выгодно.',
      cta: 'Смотреть услуги'
    },
    services: {
      title: 'Наши услуги',
      subtitle: 'Выберите подходящий вариант',
      viewDetails: 'Подробнее',
      from: 'От'
    },
    modal: {
      close: 'Закрыть',
      selectPlan: 'Выберите план',
      duration: 'Длительность',
      months: 'мес',
      features: 'Что входит',
      total: 'К оплате',
      order: 'Заказать',
      serviceAccess: 'Услуга предоставления доступа'
    },
    about: {
      title: 'О Watermelon',
      subtitle: 'Надежные услуги для вас',
      description: 'Watermelon - это ваш надежный партнер в мире цифровых подписок. Мы предлагаем выгодные цены на популярные стриминговые сервисы, быструю активацию и круглосуточную поддержку.',
      security: {
        title: 'Безопасность',
        desc: 'Все аккаунты проверены и защищены'
      },
      speed: {
        title: 'Быстрая активация',
        desc: 'Получите доступ в течение 5 минут'
      },
      support: {
        title: 'Поддержка 24/7',
        desc: 'Всегда готовы помочь вам'
      },
      price: {
        title: 'Выгодные цены',
        desc: 'Лучшие предложения на рынке'
      }
    },
    contact: {
      title: 'Контакты',
      subtitle: 'Свяжитесь с нами',
      info: 'По любым вопросам и поддержке',
      workingHours: 'Время работы',
      support247: '24/7 онлайн поддержка',
      form: {
        name: 'Ваше имя',
        email: 'Ваш Email',
        phone: 'Ваш телефон',
        subject: 'Тема',
        message: 'Ваше сообщение',
        send: 'Отправить',
        success: 'Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.'
      }
    },
    footer: {
      newsletter: 'Рассылка',
      newsletterDesc: 'Подпишитесь на рассылку и получайте эксклюзивные предложения',
      email: 'Введите ваш email',
      subscribe: 'Подписаться',
      subscribeSuccess: 'Спасибо за подписку!',
      privacy: 'Политика конфиденциальности',
      terms: 'Договор оферты',
      rights: 'Все права защищены'
    },
    legal: {
      privacy: {
        title: 'Политика конфиденциальности',
        updated: 'Последнее обновление'
      },
      terms: {
        title: 'Договор оферты',
        updated: 'Последнее обновление'
      }
    }
  },
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      about: 'About',
      contact: 'Contact'
    },
    hero: {
      title: 'Access services to',
      subtitle: 'streaming platforms',
      description: 'Great deals on Spotify, Deezer and other popular services. Individual, family and group plans. Reliable, fast, affordable.',
      cta: 'View services'
    },
    services: {
      title: 'Our services',
      subtitle: 'Choose the right option',
      viewDetails: 'View details',
      from: 'From'
    },
    modal: {
      close: 'Close',
      selectPlan: 'Select plan',
      duration: 'Duration',
      months: 'mo',
      features: "What's included",
      total: 'Total',
      order: 'Order',
      serviceAccess: 'Access service'
    },
    about: {
      title: 'About Watermelon',
      subtitle: 'Reliable services for you',
      description: 'Watermelon is your reliable partner in the world of digital subscriptions. We offer great prices on popular streaming services, fast activation and 24/7 support.',
      security: {
        title: 'Security',
        desc: 'All accounts verified and protected'
      },
      speed: {
        title: 'Fast activation',
        desc: 'Get access within 5 minutes'
      },
      support: {
        title: '24/7 Support',
        desc: 'Always ready to help you'
      },
      price: {
        title: 'Great prices',
        desc: 'Best deals on the market'
      }
    },
    contact: {
      title: 'Contact',
      subtitle: 'Get in touch',
      info: 'For any questions and support',
      workingHours: 'Working hours',
      support247: '24/7 online support',
      form: {
        name: 'Your name',
        email: 'Your email',
        phone: 'Your phone',
        subject: 'Subject',
        message: 'Your message',
        send: 'Send',
        success: 'Thank you for your message! We will contact you soon.'
      }
    },
    footer: {
      newsletter: 'Newsletter',
      newsletterDesc: 'Subscribe to our newsletter and get exclusive offers',
      email: 'Enter your email',
      subscribe: 'Subscribe',
      subscribeSuccess: 'Thank you for subscribing!',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      rights: 'All rights reserved'
    },
    legal: {
      privacy: {
        title: 'Privacy Policy',
        updated: 'Last updated'
      },
      terms: {
        title: 'Terms of Service',
        updated: 'Last updated'
      }
    }
  }
}

export function useLanguage() {
  const setLanguage = (lang) => {
    currentLanguage.value = lang
    localStorage.setItem('language', lang)
  }

  const t = computed(() => translations[currentLanguage.value])

  return {
    currentLanguage,
    setLanguage,
    t
  }
}
