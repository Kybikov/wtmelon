<template>
  <div class="legal-page section-padding">
    <div class="container">
      <div class="legal-content">
        <h1 v-if="currentLanguage === 'uk'">Договір оферти</h1>
        <h1 v-else-if="currentLanguage === 'ru'">Договор оферты</h1>
        <h1 v-else-if="currentLanguage === 'en'">Terms of Service</h1>
        <h1 v-else-if="currentLanguage === 'de'">Nutzungsbedingungen</h1>

        <p class="updated" v-if="currentLanguage === 'uk'">Останнє оновлення: 1 січня 2025</p>
        <p class="updated" v-else-if="currentLanguage === 'ru'">Последнее обновление: 1 января 2025</p>
        <p class="updated" v-else-if="currentLanguage === 'en'">Last updated: January 1, 2025</p>
        <p class="updated" v-else-if="currentLanguage === 'de'">Zuletzt aktualisiert: 1. Januar 2025</p>

        <div v-if="currentLanguage === 'uk'">
          <section>
            <p style="text-align: center; margin-bottom: 30px;">
              <strong>ДОГОВІР ПУБЛІЧНОЇ ОФЕРТИ</strong><br>
              <em>(Угода про надання послуг та цифрового контенту)</em>
            </p>
            <p>
              Цей Договір є офіційною публічною пропозицією (Офертою) Інтернет-магазину «WaterMelon», в особі ФОП Совга Євгенія Василівна (надалі – «Виконавець»), що діє на підставі запису в Єдиному державному реєстрі юридичних осіб, фізичних осіб-підприємців та громадських формувань, адресованою будь-якій фізичній особі (надалі – «Замовник»), укласти договір на викладених нижче умовах.
            </p>
          </section>

          <section>
            <h2>1. ВИЗНАЧЕННЯ ТЕРМІНІВ</h2>
            <p><strong>1.1. Оферта</strong> – публічна пропозиція Виконавця, розміщена на веб-сайті або в офіційних каналах магазину WaterMelon, про надання цифрових послуг.</p>
            <p><strong>1.2. Акцепт</strong> – повне та безумовне прийняття Замовником умов цієї Оферти шляхом здійснення оплати послуг або початку фактичного використання послуг (у разі активації до оплати).</p>
            <p><strong>1.3. Послуга / Цифровий товар</strong> – надання Замовнику доступу до платних функцій сторонніх сервісів (Spotify, Canva, YouTube, Netflix тощо) шляхом передачі кодів, посилань або налаштування облікового запису.</p>
          </section>

          <section>
            <h2>2. ПРЕДМЕТ ДОГОВОРУ</h2>
            <p><strong>2.1.</strong> Виконавець зобов'язується надати Замовнику Послугу з активації доступу до обраного сервісу, а Замовник зобов'язується прийняти та оплатити її.</p>
            <p><strong>2.2. Специфіка послуг:</strong> Виконавець не є власником, розробником або офіційним представником платформ (Canva, Spotify тощо). Виконавець надає послуги посередництва та технічної допомоги в організації доступу (наприклад, включення до "сімейної групи", надання передплаченого акаунту тощо).</p>
          </section>

          <section>
            <h2>3. ПОРЯДОК ОФОРМЛЕННЯ ЗАМОВЛЕННЯ ТА АКТИВАЦІЇ</h2>
            <p><strong>3.1.</strong> Замовлення оформлюється через інтерфейс сайту або шляхом звернення до менеджера через месенджери (Telegram, Viber, Instagram).</p>
            <p><strong>3.2. Способи надання послуги (доставки):</strong> Залежно від типу придбаної підписки, Виконавець може надати доступ одним із наступних способів:</p>
            <ul>
              <li>Відправка Замовнику логіна та пароля від активованого облікового запису;</li>
              <li>Відправка посилання-запрошення (invite) для приєднання власного акаунту Замовника до передплати;</li>
              <li>Ручна активація менеджером: вхід в обліковий запис Замовника (за наданими ним даними) та здійснення оплати/налаштування передплати.</li>
            </ul>
            <p><strong>3.3. Термін виконання:</strong> Послуга надається менеджером WaterMelon у робочий час після підтвердження замовлення. Стандартний час виконання – від 15 хвилин до 24 годин.</p>
            <p><strong>3.4.</strong> Виконавець залишає за собою право на власний розсуд активувати підписку Замовнику до моменту оплати (пост-оплата). У такому разі Замовник зобов'язується здійснити оплату протягом обумовленого терміну. У разі несплати доступ буде анульовано.</p>
          </section>

          <section>
            <h2>4. ОПЛАТА ПОСЛУГ</h2>
            <p><strong>4.1.</strong> Ціни на послуги вказані на сайті або в каталозі магазину WaterMelon.</p>
            <p><strong>4.2.</strong> Оплата здійснюється у національній валюті України (гривня).</p>
            <p><strong>4.3. Спосіб оплати:</strong> Оплата здійснюється шляхом переказу коштів на банківський рахунок Виконавця (IBAN), реквізити якого надаються менеджером при оформленні замовлення або вказані на сайті. У разі підключення еквайрингу, оплата може здійснюватися банківською карткою безпосередньо на сайті.</p>
            <p><strong>4.4.</strong> Договір вважається оплаченим у момент зарахування коштів на рахунок Виконавця.</p>
          </section>

          <section>
            <h2>5. ГАРАНТІЇ ТА ПОВЕРНЕННЯ КОШТІВ</h2>
            <p><strong>5.1. Гарантійний термін:</strong> Виконавець гарантує працездатність наданої послуги (підписки) протягом усього сплаченого періоду (наприклад, 1, 3, 6 або 12 місяців).</p>
            <p><strong>5.2. Умови заміни:</strong> Якщо доступ до сервісу припинився до закінчення сплаченого терміну не з вини Замовника (технічний збій, "зліт" преміуму), Виконавець зобов'язується відновити доступ або надати заміну (інший акаунт/посилання) протягом 24 годин з моменту звернення Замовника.</p>
            <p><strong>5.3. Повернення коштів:</strong></p>
            <ul>
              <li>Повернення коштів можливе у випадку, якщо послуга виявилася неробочою і Виконавець не зміг надати заміну або відновити роботу протягом 24 годин.</li>
              <li>Кошти не повертаються, якщо Замовник передумав після отримання робочого доступу, оскільки цифровий товар вважається спожитим у момент надання доступу (згідно із Законом України «Про цифровий контент та цифрові послуги»).</li>
            </ul>
          </section>

          <section>
            <h2>6. ПРАВИЛА ВИКОРИСТАННЯ ТА ОБМЕЖЕННЯ ВІДПОВІДАЛЬНОСТІ</h2>
            <p><strong>6.1. Заборона на зміну даних:</strong> Замовнику заборонено змінювати критичні налаштування наданих облікових записів (логін, email, пароль, платіжний профіль) без попередньої згоди Виконавця.</p>
            <p><strong>6.2. Анулювання гарантії:</strong> У разі порушення п. 6.1 (самовільна зміна даних), гарантія на товар анулюється, і Виконавець не несе відповідальності за подальшу роботу акаунту. Кошти в такому випадку не повертаються.</p>
            <p><strong>6.3.</strong> Виконавець не несе відповідальності за:</p>
            <ul>
              <li>Глобальні технічні збої в роботі сервісів (наприклад, якщо сервери Spotify не працюють у всьому світі);</li>
              <li>Блокування акаунту адміністрацією сервісу через порушення Замовником правил спільноти (спам, використання забороненого ПЗ тощо).</li>
            </ul>
          </section>

          <section>
            <h2>7. ПЕРСОНАЛЬНІ ДАНІ</h2>
            <p><strong>7.1.</strong> Замовник дає згоду на обробку своїх персональних даних (ПІБ, телефон, дані облікових записів) виключно з метою виконання замовлення та надання технічної підтримки.</p>
            <p><strong>7.2.</strong> У разі, якщо для активації підписки Замовник передає Виконавцю дані для входу в свій особистий акаунт, Виконавець зобов'язується не використовувати ці дані в інших цілях, не змінювати їх і не передавати третім особам. Після активації підписки Виконавець рекомендує Замовнику змінити тимчасовий пароль.</p>
          </section>

          <section>
            <h2>8. ФОРС-МАЖОР</h2>
            <p><strong>8.1.</strong> Сторони звільняються від відповідальності за часткове або повне невиконання зобов'язань за цим Договором, якщо воно стало наслідком обставин непереборної сили (воєнний стан, блекаути, кібератаки на банківську систему тощо).</p>
          </section>

          <section>
            <h2>9. РЕКВІЗИТИ ВИКОНАВЦЯ</h2>
            <p>
              <strong>ФОП Совга Євгенія Василівна</strong><br>
              РНОКПП: 3053915382<br>
              Адреса: Україна, 90000, Закарпатська обл., Хустський р-н, селище Міжгір'я, вул. Незалежності, будинок 19<br>
              E-mail: support@wtmelon.store<br>
              Телефон: +380633084244
            </p>
          </section>
        </div>

        <div v-else-if="currentLanguage === 'ru'">
          <section>
            <h2>1. Общие положения</h2>
            <p>
              Настоящий Договор-оферта (далее - "Договор") является официальным предложением
              Watermelon (далее - "Продавец") заключить договор купли-продажи цифровых товаров
              и услуг на изложенных ниже условиях.
            </p>
            <p>
              Акцептом настоящей оферты считается факт оплаты Покупателем заказа на условиях
              настоящего Договора, в порядке, предусмотренном на сайте Продавца.
            </p>
          </section>

          <section>
            <h2>2. Предмет договора</h2>
            <p>
              Продавец обязуется передать Покупателю доступ к подпискам на стриминговые сервисы
              (Spotify, Deezer и другие), а Покупатель обязуется принять и оплатить услуги на
              условиях настоящего Договора.
            </p>
          </section>

          <section>
            <h2>3. Порядок оформления заказа</h2>
            <ul>
              <li>Покупатель выбирает интересующий товар/услугу на сайте</li>
              <li>Выбирает необходимый план подписки и срок</li>
              <li>Оформляет заказ, указывая контактные данные</li>
              <li>Производит оплату выбранным способом</li>
              <li>Получает доступ к подписке на указанный email</li>
            </ul>
          </section>

          <section>
            <h2>4. Цена и оплата</h2>
            <p>
              Цены на товары и услуги указаны на сайте в рублях РФ. Продавец оставляет за собой
              право изменять цены на товары, представленные на сайте. При этом цена на заказанный
              и оплаченный Покупателем товар изменению не подлежит.
            </p>
            <p>
              Оплата производится через доступные платежные системы. После подтверждения оплаты
              Покупатель получает доступ к приобретенной подписке.
            </p>
          </section>

          <section>
            <h2>5. Доставка товара</h2>
            <p>
              Доставка осуществляется в электронном виде на email, указанный при оформлении
              заказа, в течение 5-60 минут после подтверждения оплаты. В случае задержки
              свыше указанного срока, Покупатель может обратиться в службу поддержки.
            </p>
          </section>

          <section>
            <h2>6. Гарантии</h2>
            <p>
              Продавец гарантирует работоспособность предоставленного доступа на весь
              оплаченный период. В случае прекращения работы подписки не по вине Покупателя,
              Продавец обязуется заменить доступ или вернуть средства пропорционально
              неиспользованному периоду.
            </p>
          </section>

          <section>
            <h2>7. Возврат и обмен</h2>
            <p>Возврат денежных средств возможен в следующих случаях:</p>
            <ul>
              <li>Продавец не может предоставить оплаченную услугу</li>
              <li>Технические проблемы на стороне Продавца</li>
              <li>Подписка перестала работать не по вине Покупателя</li>
            </ul>
            <p>
              Возврат не производится, если Покупатель нарушил правила использования подписки
              или передал данные доступа третьим лицам.
            </p>
          </section>

          <section>
            <h2>8. Ответственность сторон</h2>
            <p>Продавец не несет ответственности за:</p>
            <ul>
              <li>Неправильное использование подписки Покупателем</li>
              <li>Передачу данных доступа третьим лицам</li>
              <li>Изменения в политике сервисов-правообладателей</li>
              <li>Блокировку аккаунта по вине Покупателя</li>
            </ul>
          </section>

          <section>
            <h2>9. Конфиденциальность</h2>
            <p>
              Продавец обязуется не разглашать персональные данные Покупателя третьим лицам.
              Подробнее о защите данных читайте в
              <router-link to="/privacy">Политике конфиденциальности</router-link>.
            </p>
          </section>

          <section>
            <h2>10. Разрешение споров</h2>
            <p>
              Все споры и разногласия решаются путем переговоров. При невозможности достижения
              соглашения, спор передается на рассмотрение в соответствии с законодательством РФ.
            </p>
          </section>

          <section>
            <h2>11. Контакты</h2>
            <p>По всем вопросам обращайтесь:</p>
            <ul>
              <li>Email: privacy@wtmelon.store</li>
              <li>Telegram: @WTmelon</li>
            </ul>
          </section>
        </div>

        <div v-else-if="currentLanguage === 'en'">
          <section>
            <h2>1. General Provisions</h2>
            <p>
              This Terms of Service agreement (hereinafter - "Agreement") is an official offer from
              Watermelon (hereinafter - "Seller") to enter into a purchase agreement for digital goods
              and services on the terms outlined below.
            </p>
            <p>
              Acceptance of this offer is considered the fact of payment by the Buyer for an order under
              the terms of this Agreement, in the manner provided on the Seller's website.
            </p>
          </section>

          <section>
            <h2>2. Subject of Agreement</h2>
            <p>
              The Seller undertakes to provide the Buyer with access to streaming service subscriptions
              (Spotify, Deezer and others), and the Buyer undertakes to accept and pay for services
              under the terms of this Agreement.
            </p>
          </section>

          <section>
            <h2>3. Order Placement Procedure</h2>
            <ul>
              <li>Buyer selects the desired product/service on the website</li>
              <li>Selects the required subscription plan and term</li>
              <li>Places an order, providing contact details</li>
              <li>Makes payment using the selected method</li>
              <li>Receives access to the subscription at the specified email</li>
            </ul>
          </section>

          <section>
            <h2>4. Price and Payment</h2>
            <p>
              Prices for goods and services are indicated on the website in USD. The Seller reserves the right
              to change prices for products presented on the website. However, the price for an ordered
              and paid item by the Buyer is not subject to change.
            </p>
            <p>
              Payment is made through available payment systems. After payment confirmation,
              the Buyer receives access to the purchased subscription.
            </p>
          </section>

          <section>
            <h2>5. Product Delivery</h2>
            <p>
              Delivery is carried out electronically to the email specified during order placement,
              within 5-60 minutes after payment confirmation. In case of delay beyond the specified period,
              the Buyer may contact the support service.
            </p>
          </section>

          <section>
            <h2>6. Warranties</h2>
            <p>
              The Seller guarantees the functionality of the provided access for the entire paid period.
              In case of subscription termination not due to the Buyer's fault, the Seller undertakes to
              replace access or refund proportionally to the unused period.
            </p>
          </section>

          <section>
            <h2>7. Returns and Exchanges</h2>
            <p>Refunds are possible in the following cases:</p>
            <ul>
              <li>The Seller cannot provide the paid service</li>
              <li>Technical problems on the Seller's side</li>
              <li>Subscription stopped working not due to the Buyer's fault</li>
            </ul>
            <p>
              No refund is made if the Buyer violated the subscription usage rules
              or shared access credentials with third parties.
            </p>
          </section>

          <section>
            <h2>8. Liability of Parties</h2>
            <p>The Seller is not responsible for:</p>
            <ul>
              <li>Improper use of subscription by the Buyer</li>
              <li>Sharing access credentials with third parties</li>
              <li>Changes in the policies of rights holder services</li>
              <li>Account blocking due to the Buyer's fault</li>
            </ul>
          </section>

          <section>
            <h2>9. Confidentiality</h2>
            <p>
              The Seller undertakes not to disclose the Buyer's personal data to third parties.
              Learn more about data protection in our
              <router-link to="/privacy">Privacy Policy</router-link>.
            </p>
          </section>

          <section>
            <h2>10. Dispute Resolution</h2>
            <p>
              All disputes and disagreements are resolved through negotiations. If an agreement cannot be reached,
              the dispute is referred for consideration in accordance with applicable law.
            </p>
          </section>

          <section>
            <h2>11. Contact</h2>
            <p>For all questions, contact:</p>
            <ul>
              <li>Email: privacy@wtmelon.store</li>
              <li>Telegram: @WTmelon</li>
            </ul>
          </section>
        </div>

        <div v-else-if="currentLanguage === 'de'">
          <section>
            <h2>1. Allgemeine Bestimmungen</h2>
            <p>
              Diese Nutzungsbedingungen (nachfolgend - "Vertrag") sind ein offizielles Angebot von
              Watermelon (nachfolgend - "Verkäufer"), einen Kaufvertrag für digitale Waren
              und Dienstleistungen zu den unten aufgeführten Bedingungen abzuschließen.
            </p>
            <p>
              Die Annahme dieses Angebots gilt als die Tatsache der Zahlung durch den Käufer für eine Bestellung gemäß
              den Bedingungen dieses Vertrags, in der auf der Website des Verkäufers vorgesehenen Weise.
            </p>
          </section>

          <section>
            <h2>2. Vertragsgegenstand</h2>
            <p>
              Der Verkäufer verpflichtet sich, dem Käufer Zugang zu Streaming-Abonnements
              (Spotify, Deezer und andere) zu gewähren, und der Käufer verpflichtet sich, Dienstleistungen
              gemäß den Bedingungen dieses Vertrags anzunehmen und zu bezahlen.
            </p>
          </section>

          <section>
            <h2>3. Bestellverfahren</h2>
            <ul>
              <li>Der Käufer wählt das gewünschte Produkt/die gewünschte Dienstleistung auf der Website aus</li>
              <li>Wählt den erforderlichen Abonnementplan und die Laufzeit aus</li>
              <li>Gibt eine Bestellung auf und gibt Kontaktdaten an</li>
              <li>Führt die Zahlung mit der ausgewählten Methode durch</li>
              <li>Erhält Zugang zum Abonnement an die angegebene E-Mail</li>
            </ul>
          </section>

          <section>
            <h2>4. Preis und Zahlung</h2>
            <p>
              Die Preise für Waren und Dienstleistungen sind auf der Website in Euro angegeben. Der Verkäufer behält sich das Recht vor,
              die Preise für auf der Website präsentierte Produkte zu ändern. Der Preis für einen bestellten
              und bezahlten Artikel durch den Käufer unterliegt jedoch keiner Änderung.
            </p>
            <p>
              Die Zahlung erfolgt über verfügbare Zahlungssysteme. Nach Zahlungsbestätigung
              erhält der Käufer Zugang zum gekauften Abonnement.
            </p>
          </section>

          <section>
            <h2>5. Produktlieferung</h2>
            <p>
              Die Lieferung erfolgt elektronisch an die bei der Bestellaufgabe angegebene E-Mail,
              innerhalb von 5-60 Minuten nach Zahlungsbestätigung. Bei Verzögerung über den angegebenen Zeitraum hinaus
              kann sich der Käufer an den Support-Service wenden.
            </p>
          </section>

          <section>
            <h2>6. Garantien</h2>
            <p>
              Der Verkäufer garantiert die Funktionalität des bereitgestellten Zugangs für den gesamten bezahlten Zeitraum.
              Im Falle einer Abonnementkündigung nicht aufgrund eines Verschuldens des Käufers verpflichtet sich der Verkäufer,
              den Zugang zu ersetzen oder anteilig für den ungenutzten Zeitraum zu erstatten.
            </p>
          </section>

          <section>
            <h2>7. Rückgabe und Umtausch</h2>
            <p>Rückerstattungen sind in folgenden Fällen möglich:</p>
            <ul>
              <li>Der Verkäufer kann die bezahlte Dienstleistung nicht erbringen</li>
              <li>Technische Probleme auf Seiten des Verkäufers</li>
              <li>Das Abonnement funktioniert nicht aufgrund eines Verschuldens des Käufers</li>
            </ul>
            <p>
              Es erfolgt keine Rückerstattung, wenn der Käufer die Abonnement-Nutzungsregeln verletzt hat
              oder Zugangsdaten an Dritte weitergegeben hat.
            </p>
          </section>

          <section>
            <h2>8. Haftung der Parteien</h2>
            <p>Der Verkäufer ist nicht verantwortlich für:</p>
            <ul>
              <li>Unsachgemäße Nutzung des Abonnements durch den Käufer</li>
              <li>Weitergabe von Zugangsdaten an Dritte</li>
              <li>Änderungen in den Richtlinien der Rechteinhaber-Services</li>
              <li>Kontosperrung aufgrund eines Verschuldens des Käufers</li>
            </ul>
          </section>

          <section>
            <h2>9. Vertraulichkeit</h2>
            <p>
              Der Verkäufer verpflichtet sich, die persönlichen Daten des Käufers nicht an Dritte weiterzugeben.
              Erfahren Sie mehr über Datenschutz in unserer
              <router-link to="/privacy">Datenschutzrichtlinie</router-link>.
            </p>
          </section>

          <section>
            <h2>10. Streitbeilegung</h2>
            <p>
              Alle Streitigkeiten und Meinungsverschiedenheiten werden durch Verhandlungen beigelegt. Wenn keine Einigung erzielt werden kann,
              wird der Streit gemäß geltendem Recht zur Prüfung vorgelegt.
            </p>
          </section>

          <section>
            <h2>11. Kontakt</h2>
            <p>Für alle Fragen kontaktieren Sie:</p>
            <ul>
              <li>Email: privacy@wtmelon.store</li>
              <li>Telegram: @WTmelon</li>
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
  name: 'Terms',
  setup() {
    const { currentLanguage } = useLanguage()
    return { currentLanguage }
  }
}
</script>
