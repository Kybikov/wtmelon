<template>
  <div class="legal-page section-padding">
    <div class="container">
      <div class="legal-content">
        <h1 v-if="currentLanguage === 'uk'">Політика конфіденційності</h1>
        <h1 v-else-if="currentLanguage === 'ru'">Политика конфиденциальности</h1>
        <h1 v-else-if="currentLanguage === 'en'">Privacy Policy</h1>
        <h1 v-else-if="currentLanguage === 'de'">Datenschutzrichtlinie</h1>

        <p class="updated" v-if="currentLanguage === 'uk'">Останнє оновлення: 31 грудня 2024</p>
        <p class="updated" v-else-if="currentLanguage === 'ru'">Последнее обновление: 30 декабря 2024</p>
        <p class="updated" v-else-if="currentLanguage === 'en'">Last updated: December 30, 2024</p>
        <p class="updated" v-else-if="currentLanguage === 'de'">Zuletzt aktualisiert: 30. Dezember 2024</p>

        <div v-if="currentLanguage === 'uk'">
          <section>
            <p style="text-align: center; margin-bottom: 30px;">
              <strong>ПОЛІТИКА КОНФІДЕНЦІЙНОСТІ</strong><br>
              <em>(Політика обробки персональних даних)</em>
            </p>
            <p>
              Ця Політика конфіденційності визначає порядок збору, зберігання, використання та захисту персональних даних користувачів інтернет-магазину «WaterMelon».
            </p>
            <p>
              Ми поважаємо вашу приватність. Оформлюючи замовлення, ви довіряєте нам свою інформацію, і ми гарантуємо, що вона буде використана виключно для надання послуг.
            </p>
          </section>

          <section>
            <h2>1. ЗАГАЛЬНІ ПОЛОЖЕННЯ</h2>
            <p><strong>1.1.</strong> Ця Політика розроблена відповідно до чинного законодавства України, зокрема Закону України «Про захист персональних даних».</p>
            <p><strong>1.2.</strong> Використовуючи сайт або бот магазину WaterMelon, а також оплачуючи замовлення, Користувач (Замовник) надає свою безумовну згоду на обробку персональних даних згідно з цією Політикою.</p>
            <p><strong>1.3.</strong> Власником та розпорядником персональних даних є ФОП Совга Євгенія Василівна.</p>
          </section>

          <section>
            <h2>2. ЯКІ ДАНІ МИ ЗБИРАЄМО</h2>
            <p>Ми збираємо лише той мінімум інформації, який необхідний для виконання замовлення та зворотного зв'язку:</p>
            <p><strong>2.1. Контактні дані:</strong> Ім'я, нікнейм у Telegram, номер телефону, адреса електронної пошти.</p>
            <p><strong>2.2. Дані для надання послуги:</strong> У випадках, коли активація підписки вимагає входу в акаунт (наприклад, Spotify, YouTube), ми можемо запитувати тимчасові дані для входу (логін/пароль).</p>
            <p><strong>2.3. Платіжні дані:</strong> Ми не збираємо і не зберігаємо повні дані ваших банківських карток (номер, CVV). Ви оплачуєте замовлення через банківський додаток або платіжний шлюз, а ми бачимо лише факт надходження коштів.</p>
            <p><strong>2.4. Технічні дані:</strong> IP-адреса, тип браузера та пристрою (збираються автоматично для коректної роботи сайту).</p>
          </section>

          <section>
            <h2>3. МЕТА ЗБОРУ ДАНИХ</h2>
            <p>Ми використовуємо ваші дані для:</p>
            <ul>
              <li>Обробки та виконання вашого замовлення (відправка ключів доступу, інвайтів).</li>
              <li>Зв'язку з вами через месенджери для технічної підтримки.</li>
              <li>Вирішення спірних ситуацій (повернення коштів, заміна товару).</li>
              <li>Інформування про статус підписки (нагадування про закінчення терміну дії).</li>
            </ul>
          </section>

          <section>
            <h2>4. БЕЗПЕКА ДАНИХ АКАУНТІВ (Важливо)</h2>
            <p><strong>4.1.</strong> Якщо для активації послуги ви передаєте нам логін та пароль від свого особистого акаунту:</p>
            <ul>
              <li>Ми використовуємо ці дані виключно в момент активації.</li>
              <li>Ми не зберігаємо ваші паролі в базах даних після завершення замовлення.</li>
              <li>Ми зобов'язуємося не змінювати ваші особисті дані та не передавати доступ третім особам.</li>
            </ul>
            <p><strong>4.2.</strong> Після виконання послуги (активації підписки) ми наполегливо рекомендуємо змінити пароль до вашого облікового запису.</p>
          </section>

          <section>
            <h2>5. ПЕРЕДАЧА ДАНИХ ТРЕТІМ ОСОБАМ</h2>
            <p>Ми не передаємо ваші персональні дані третім особам, крім таких випадків:</p>
            <ul>
              <li>Банківським установам (для проведення та підтвердження транзакцій).</li>
              <li>На обґрунтовану вимогу державних органів (відповідно до законодавства України).</li>
            </ul>
            <p>Ми категорично не продаємо бази клієнтів спамерам чи рекламним компаніям.</p>
          </section>

          <section>
            <h2>6. ЗАХИСТ ІНФОРМАЦІЇ</h2>
            <p><strong>6.1.</strong> Доступ до персональних даних мають лише уповноважені менеджери магазину WaterMelon, які підписали зобов'язання про нерозголошення.</p>
            <p><strong>6.2.</strong> Сайт використовує шифрування SSL для захисту передачі даних.</p>
          </section>

          <section>
            <h2>7. ПРАВА КОРИСТУВАЧА</h2>
            <p>Згідно зі ст. 8 Закону України «Про захист персональних даних», ви маєте право:</p>
            <ul>
              <li>Знати, які саме ваші дані ми обробляємо.</li>
              <li>Вимагати зміни або видалення своїх персональних даних з нашої бази (право на забуття).</li>
              <li>Відкликати згоду на обробку даних.</li>
            </ul>
            <p>Для реалізації цих прав зв'яжіться з нашою підтримкою.</p>
          </section>

          <section>
            <h2>8. КОНТАКТНА ІНФОРМАЦІЯ</h2>
            <p>Якщо у вас є питання щодо конфіденційності, будь ласка, зв'яжіться з нами:</p>
            <p>
              <strong>ФОП Совга Євгенія Василівна</strong><br>
              E-mail: support@wtmelon.store<br>
              Telegram: @WTmelon (або актуальний контакт підтримки)<br>
              Телефон: +380633084244<br>
              Адреса для листування: Україна, 90000, Закарпатська обл., Хустський р-н, селище Міжгір'я, вул. Незалежності, буд. 19
            </p>
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
  </div>
</template>

<script>
import { useLanguage } from '../composables/useLanguage'

export default {
  name: 'Privacy',
  setup() {
    const { currentLanguage } = useLanguage()
    return { currentLanguage }
  }
}
</script>
