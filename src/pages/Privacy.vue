<template>
  <div class="legal-page section-padding">
    <Navbar />
    <div class="container">
      <div class="legal-content">
        <h1 v-if="currentLanguage === 'uk'">Політика конфіденційності</h1>
        <h1 v-else-if="currentLanguage === 'ru'">Политика конфиденциальности</h1>
        <h1 v-else-if="currentLanguage === 'en'">Privacy Policy</h1>
        <h1 v-else-if="currentLanguage === 'de'">Datenschutzrichtlinie</h1>

        <p class="updated" v-if="currentLanguage === 'uk'">Останнє оновлення: 30 грудня 2024</p>
        <p class="updated" v-else-if="currentLanguage === 'ru'">Последнее обновление: 30 декабря 2024</p>
        <p class="updated" v-else-if="currentLanguage === 'en'">Last updated: December 30, 2024</p>
        <p class="updated" v-else-if="currentLanguage === 'de'">Zuletzt aktualisiert: 30. Dezember 2024</p>

        <div v-if="currentLanguage === 'uk'">
          <section>
            <h2>1. Загальні положення</h2>
            <p>
              Ця Політика конфіденційності визначає порядок обробки та захисту персональних даних користувачів сервісу Watermelon (далі - "Сервіс").
              Використовуючи наш Сервіс, ви погоджуєтесь з умовами цієї Політики.
            </p>
          </section>

          <section>
            <h2>2. Збір інформації</h2>
            <p>Ми збираємо наступні типи інформації:</p>
            <ul>
              <li>Особиста інформація (ім'я, email, телефон), надана при реєстрації</li>
              <li>Інформація про замовлення та транзакції</li>
              <li>Технічна інформація (IP-адреса, тип браузера, операційна система)</li>
              <li>Інформація про використання сервісу</li>
            </ul>
          </section>

          <section>
            <h2>3. Використання інформації</h2>
            <p>Зібрана інформація використовується для:</p>
            <ul>
              <li>Обробки замовлень та надання послуг</li>
              <li>Зв'язку з користувачами з питань підтримки</li>
              <li>Покращення якості сервісу</li>
              <li>Відправки інформаційних та маркетингових матеріалів (з вашої згоди)</li>
              <li>Дотримання законодавства та захисту наших прав</li>
            </ul>
          </section>

          <section>
            <h2>4. Захист даних</h2>
            <p>
              Ми застосовуємо сучасні технічні та організаційні заходи для захисту ваших персональних даних від несанкціонованого доступу,
              зміни, розкриття або знищення. Всі дані передаються захищеними каналами зв'язку.
            </p>
          </section>

          <section>
            <h2>5. Передача даних третім особам</h2>
            <p>
              Ми не продаємо і не передаємо ваші персональні дані третім особам, за винятком випадків, необхідних для надання послуг
              (платіжні системи, служби доставки) або вимагаємих законодавством.
            </p>
          </section>

          <section>
            <h2>6. Cookies</h2>
            <p>
              Наш сайт використовує cookies для покращення користувацького досвіду. Ви можете налаштувати свій браузер для відхилення cookies,
              проте це може обмежити функціональність сервісу.
            </p>
          </section>

          <section>
            <h2>7. Ваші права</h2>
            <p>Ви маєте право:</p>
            <ul>
              <li>Запросити доступ до своїх персональних даних</li>
              <li>Виправити неточні дані</li>
              <li>Видалити свої дані</li>
              <li>Відкликати згоду на обробку даних</li>
              <li>Обмежити обробку даних</li>
            </ul>
          </section>

          <section>
            <h2>8. Зміни в Політиці</h2>
            <p>
              Ми залишаємо за собою право вносити зміни до цієї Політики конфіденційності. Актуальна версія завжди доступна на нашому сайті.
              Суттєві зміни будуть повідомлені користувачам по email.
            </p>
          </section>

          <section>
            <h2>9. Контакти</h2>
            <p>З питань, пов'язаних з обробкою персональних даних, звертайтесь:</p>
            <ul>
              <li>Email: privacy@watermelon.ua</li>
              <li>Telegram: @watermelon_support</li>
            </ul>
          </section>
        </div>

        <div v-else-if="currentLanguage === 'ru'">
          <section>
            <h2>1. Общие положения</h2>
            <p>
              Настоящая Политика конфиденциальности определяет порядок обработки и защиты
              персональных данных пользователей сервиса Watermelon (далее - "Сервис").
              Используя наш Сервис, вы соглашаетесь с условиями данной Политики.
            </p>
          </section>

          <section>
            <h2>2. Сбор информации</h2>
            <p>Мы собираем следующие типы информации:</p>
            <ul>
              <li>Личная информация (имя, email, телефон), предоставленная при регистрации</li>
              <li>Информация о заказах и транзакциях</li>
              <li>Техническая информация (IP-адрес, тип браузера, операционная система)</li>
              <li>Информация об использовании сервиса</li>
            </ul>
          </section>

          <section>
            <h2>3. Использование информации</h2>
            <p>Собранная информация используется для:</p>
            <ul>
              <li>Обработки заказов и предоставления услуг</li>
              <li>Связи с пользователями по вопросам поддержки</li>
              <li>Улучшения качества сервиса</li>
              <li>Отправки информационных и маркетинговых материалов (с вашего согласия)</li>
              <li>Соблюдения законодательства и защиты наших прав</li>
            </ul>
          </section>

          <section>
            <h2>4. Защита данных</h2>
            <p>
              Мы применяем современные технические и организационные меры для защиты ваших
              персональных данных от несанкционированного доступа, изменения, раскрытия или
              уничтожения. Все данные передаются по защищенным каналам связи.
            </p>
          </section>

          <section>
            <h2>5. Передача данных третьим лицам</h2>
            <p>
              Мы не продаем и не передаем ваши персональные данные третьим лицам, за исключением
              случаев, необходимых для оказания услуг (платежные системы, службы доставки) или
              требуемых законодательством.
            </p>
          </section>

          <section>
            <h2>6. Cookies</h2>
            <p>
              Наш сайт использует cookies для улучшения пользовательского опыта. Вы можете
              настроить свой браузер для отклонения cookies, однако это может ограничить
              функциональность сервиса.
            </p>
          </section>

          <section>
            <h2>7. Ваши права</h2>
            <p>Вы имеете право:</p>
            <ul>
              <li>Запросить доступ к своим персональным данным</li>
              <li>Исправить неточные данные</li>
              <li>Удалить свои данные</li>
              <li>Отозвать согласие на обработку данных</li>
              <li>Ограничить обработку данных</li>
            </ul>
          </section>

          <section>
            <h2>8. Изменения в Политике</h2>
            <p>
              Мы оставляем за собой право вносить изменения в настоящую Политику
              конфиденциальности. Актуальная версия всегда доступна на нашем сайте.
              Существенные изменения будут сообщены пользователям по email.
            </p>
          </section>

          <section>
            <h2>9. Контакты</h2>
            <p>
              По вопросам, связанным с обработкой персональных данных, обращайтесь:
            </p>
            <ul>
              <li>Email: privacy@watermelon.ru</li>
              <li>Telegram: @watermelon_support</li>
            </ul>
          </section>
        </div>

        <div v-else-if="currentLanguage === 'en'">
          <section>
            <h2>1. General Provisions</h2>
            <p>
              This Privacy Policy defines the procedure for processing and protecting personal data of Watermelon service users (hereinafter - "Service").
              By using our Service, you agree to the terms of this Policy.
            </p>
          </section>

          <section>
            <h2>2. Information Collection</h2>
            <p>We collect the following types of information:</p>
            <ul>
              <li>Personal information (name, email, phone) provided during registration</li>
              <li>Information about orders and transactions</li>
              <li>Technical information (IP address, browser type, operating system)</li>
              <li>Service usage information</li>
            </ul>
          </section>

          <section>
            <h2>3. Use of Information</h2>
            <p>Collected information is used for:</p>
            <ul>
              <li>Processing orders and providing services</li>
              <li>Communicating with users regarding support</li>
              <li>Improving service quality</li>
              <li>Sending informational and marketing materials (with your consent)</li>
              <li>Complying with legislation and protecting our rights</li>
            </ul>
          </section>

          <section>
            <h2>4. Data Protection</h2>
            <p>
              We apply modern technical and organizational measures to protect your personal data from unauthorized access,
              modification, disclosure, or destruction. All data is transmitted through secure communication channels.
            </p>
          </section>

          <section>
            <h2>5. Third-Party Data Transfer</h2>
            <p>
              We do not sell or transfer your personal data to third parties, except in cases necessary for providing services
              (payment systems, delivery services) or required by law.
            </p>
          </section>

          <section>
            <h2>6. Cookies</h2>
            <p>
              Our website uses cookies to improve user experience. You can configure your browser to reject cookies,
              however this may limit the functionality of the service.
            </p>
          </section>

          <section>
            <h2>7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Request access to your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Delete your data</li>
              <li>Withdraw consent to data processing</li>
              <li>Restrict data processing</li>
            </ul>
          </section>

          <section>
            <h2>8. Policy Changes</h2>
            <p>
              We reserve the right to make changes to this Privacy Policy. The current version is always available on our website.
              Significant changes will be communicated to users via email.
            </p>
          </section>

          <section>
            <h2>9. Contact</h2>
            <p>For questions related to personal data processing, contact:</p>
            <ul>
              <li>Email: privacy@watermelon.com</li>
              <li>Telegram: @watermelon_support</li>
            </ul>
          </section>
        </div>

        <div v-else-if="currentLanguage === 'de'">
          <section>
            <h2>1. Allgemeine Bestimmungen</h2>
            <p>
              Diese Datenschutzrichtlinie definiert das Verfahren zur Verarbeitung und zum Schutz personenbezogener Daten der Nutzer des Watermelon-Dienstes (nachfolgend - "Dienst").
              Durch die Nutzung unseres Dienstes stimmen Sie den Bedingungen dieser Richtlinie zu.
            </p>
          </section>

          <section>
            <h2>2. Informationssammlung</h2>
            <p>Wir sammeln folgende Arten von Informationen:</p>
            <ul>
              <li>Persönliche Informationen (Name, E-Mail, Telefon), die bei der Registrierung angegeben wurden</li>
              <li>Informationen über Bestellungen und Transaktionen</li>
              <li>Technische Informationen (IP-Adresse, Browsertyp, Betriebssystem)</li>
              <li>Informationen zur Dienstnutzung</li>
            </ul>
          </section>

          <section>
            <h2>3. Verwendung von Informationen</h2>
            <p>Gesammelte Informationen werden verwendet für:</p>
            <ul>
              <li>Bearbeitung von Bestellungen und Bereitstellung von Dienstleistungen</li>
              <li>Kommunikation mit Nutzern bezüglich Support</li>
              <li>Verbesserung der Servicequalität</li>
              <li>Versand von Informations- und Marketingmaterialien (mit Ihrer Zustimmung)</li>
              <li>Einhaltung der Gesetzgebung und Schutz unserer Rechte</li>
            </ul>
          </section>

          <section>
            <h2>4. Datenschutz</h2>
            <p>
              Wir wenden moderne technische und organisatorische Maßnahmen an, um Ihre personenbezogenen Daten vor unbefugtem Zugriff,
              Änderung, Offenlegung oder Zerstörung zu schützen. Alle Daten werden über sichere Kommunikationskanäle übertragen.
            </p>
          </section>

          <section>
            <h2>5. Datenweitergabe an Dritte</h2>
            <p>
              Wir verkaufen oder übertragen Ihre personenbezogenen Daten nicht an Dritte, außer in Fällen, die für die Erbringung von Dienstleistungen
              (Zahlungssysteme, Lieferdienste) erforderlich sind oder gesetzlich vorgeschrieben sind.
            </p>
          </section>

          <section>
            <h2>6. Cookies</h2>
            <p>
              Unsere Website verwendet Cookies, um das Nutzererlebnis zu verbessern. Sie können Ihren Browser so konfigurieren, dass er Cookies ablehnt,
              dies kann jedoch die Funktionalität des Dienstes einschränken.
            </p>
          </section>

          <section>
            <h2>7. Ihre Rechte</h2>
            <p>Sie haben das Recht:</p>
            <ul>
              <li>Zugriff auf Ihre personenbezogenen Daten anzufordern</li>
              <li>Unrichtige Daten zu korrigieren</li>
              <li>Ihre Daten zu löschen</li>
              <li>Die Einwilligung zur Datenverarbeitung zu widerrufen</li>
              <li>Die Datenverarbeitung einzuschränken</li>
            </ul>
          </section>

          <section>
            <h2>8. Richtlinienänderungen</h2>
            <p>
              Wir behalten uns das Recht vor, Änderungen an dieser Datenschutzrichtlinie vorzunehmen. Die aktuelle Version ist immer auf unserer Website verfügbar.
              Wesentliche Änderungen werden den Nutzern per E-Mail mitgeteilt.
            </p>
          </section>

          <section>
            <h2>9. Kontakt</h2>
            <p>Bei Fragen zur Verarbeitung personenbezogener Daten wenden Sie sich an:</p>
            <ul>
              <li>E-Mail: privacy@watermelon.de</li>
              <li>Telegram: @watermelon_support</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { useLanguage } from '../composables/useLanguage'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'Privacy',
  components: {
    Navbar,
    Footer
  },
  setup() {
    const { currentLanguage } = useLanguage()
    return { currentLanguage }
  }
}
</script>
