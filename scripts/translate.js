import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function loadEnv() {
  try {
    const envPath = join(__dirname, '../.env');
    const envContent = readFileSync(envPath, 'utf-8');
    const lines = envContent.split('\n');

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith('#')) {
        const [key, ...valueParts] = trimmedLine.split('=');
        const value = valueParts.join('=');
        if (key && value) {
          process.env[key.trim()] = value.trim();
        }
      }
    }
  } catch (error) {
    console.error('Помилка читання .env файлу:', error.message);
  }
}

loadEnv();

const DEEPL_API_KEY = process.env.VITE_DEEPL_API_KEY;
const DEEPL_API_URL = 'https://api-free.deepl.com/v2/translate';

if (!DEEPL_API_KEY) {
  console.error('\x1b[31m%s\x1b[0m', 'Помилка: VITE_DEEPL_API_KEY не знайдено в .env файлі');
  console.log('Додайте ваш DeepL API ключ в .env файл:');
  console.log('VITE_DEEPL_API_KEY=your-api-key-here');
  process.exit(1);
}

async function translateText(text, targetLang) {
  try {
    const params = new URLSearchParams({
      auth_key: DEEPL_API_KEY,
      text: text,
      source_lang: 'UK',
      target_lang: targetLang
    });

    const response = await fetch(DEEPL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params
    });

    if (!response.ok) {
      throw new Error(`DeepL API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.translations[0].text;
  } catch (error) {
    console.error(`Помилка перекладу: ${error.message}`);
    return text;
  }
}

function extractTexts(obj, prefix = '') {
  const texts = [];

  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      texts.push({ path, text: value });
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (typeof item === 'string') {
          texts.push({ path: `${path}[${index}]`, text: item });
        }
      });
    } else if (typeof value === 'object' && value !== null) {
      texts.push(...extractTexts(value, path));
    }
  }

  return texts;
}

function setNestedValue(obj, path, value) {
  const arrayMatch = path.match(/^(.+)\[(\d+)\]$/);

  if (arrayMatch) {
    const [, arrayPath, index] = arrayMatch;
    const keys = arrayPath.split('.');
    let current = obj;

    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }

    const lastKey = keys[keys.length - 1];
    if (!Array.isArray(current[lastKey])) {
      current[lastKey] = [];
    }
    current[lastKey][parseInt(index)] = value;
  } else {
    const keys = path.split('.');
    let current = obj;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;
  }
}

async function translateLanguageFile() {
  console.log('\x1b[36m%s\x1b[0m', '🍉 Watermelon Translation Script');
  console.log('================================\n');

  const filePath = join(__dirname, '../src/composables/useLanguage.js');
  const backupPath = join(__dirname, '../src/composables/useLanguage.backup.js');

  console.log('📖 Читання файлу useLanguage.js...');
  const fileContent = readFileSync(filePath, 'utf-8');

  writeFileSync(backupPath, fileContent);
  console.log('\x1b[32m%s\x1b[0m', '✓ Backup створено: useLanguage.backup.js\n');

  const match = fileContent.match(/const translations = ({[\s\S]*?})\s*export function useLanguage/);
  if (!match) {
    console.error('Помилка: Не вдалося знайти об\'єкт translations');
    process.exit(1);
  }

  const translations = eval('(' + match[1] + ')');

  const ukTexts = extractTexts(translations.uk);
  console.log(`📝 Знайдено ${ukTexts.length} текстів для перекладу\n`);

  const ruTranslations = JSON.parse(JSON.stringify(translations.uk));
  const enTranslations = JSON.parse(JSON.stringify(translations.uk));
  const deTranslations = JSON.parse(JSON.stringify(translations.uk));

  let completed = 0;
  const totalTranslations = ukTexts.length * 3;

  console.log('🇷🇺 Переклад на російську...');
  for (const { path, text } of ukTexts) {
    const translated = await translateText(text, 'RU');
    setNestedValue(ruTranslations, path, translated);
    completed++;
    process.stdout.write(`\r   Прогрес: ${completed}/${totalTranslations} (${Math.round(completed / totalTranslations * 100)}%)`);
  }
  console.log('\n\x1b[32m%s\x1b[0m', '✓ Російська мова готова\n');

  console.log('🇬🇧 Переклад на англійську...');
  for (const { path, text } of ukTexts) {
    const translated = await translateText(text, 'EN-US');
    setNestedValue(enTranslations, path, translated);
    completed++;
    process.stdout.write(`\r   Прогрес: ${completed}/${totalTranslations} (${Math.round(completed / totalTranslations * 100)}%)`);
  }
  console.log('\n\x1b[32m%s\x1b[0m', '✓ Англійська мова готова\n');

  console.log('🇩🇪 Переклад на німецьку...');
  for (const { path, text } of ukTexts) {
    const translated = await translateText(text, 'DE');
    setNestedValue(deTranslations, path, translated);
    completed++;
    process.stdout.write(`\r   Прогрес: ${completed}/${totalTranslations} (${Math.round(completed / totalTranslations * 100)}%)`);
  }
  console.log('\n\x1b[32m%s\x1b[0m', '✓ Німецька мова готова\n');

  translations.ru = ruTranslations;
  translations.en = enTranslations;
  translations.de = deTranslations;

  const newContent = fileContent.replace(
    /const translations = {[\s\S]*?}/,
    `const translations = ${JSON.stringify(translations, null, 2)}`
  );

  writeFileSync(filePath, newContent);
  console.log('\x1b[32m%s\x1b[0m', '✓ Файл useLanguage.js оновлено\n');

  console.log('\x1b[36m%s\x1b[0m', '✨ Переклад завершено успішно!');
  console.log('================================\n');
}

translateLanguageFile().catch(error => {
  console.error('\x1b[31m%s\x1b[0m', `\n❌ Критична помилка: ${error.message}`);
  process.exit(1);
});
