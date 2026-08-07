# Nova International AI School 🚀

Современный и функциональный веб-сайт для частной школы с фокусом на академические традиции и IT-технологии (AI). Проект включает в себя интерактивный фронтенд с 3D-моделями и полноценный бэкенд с панелью администратора и интеграцией Telegram-бота.

## ✨ Ключевые возможности

- 🌍 **Двуязычность (I18n)**: Полная поддержка русского и узбекского языков без перезагрузки страницы.
- 🎨 **Современный UI/UX**: Красивый дизайн, микро-анимации, параллакс-скроллинг и отзывчивая верстка.
- 👕 **3D Интерактив**: Возможность рассматривать школьную форму в 3D (используя Three.js и React Three Fiber).
- 📱 **Telegram-бот**: Мгновенные уведомления о новых заявках прямо в закрытую группу менеджеров. Возможность менять статус заявки (Отказ, Думают, Согласны) прямо из Telegram через инлайн-кнопки.
- 🔐 **Панель Администратора**: Безопасная админка для управления новостями (встроенный Rich Text Editor), преподавателями, галереей и заявками.
- 📦 **Автоматические бэкапы**: Ежедневное резервное копирование базы данных PostgreSQL с автоматической отправкой `.sql` архива в Telegram (в 03:00 ночи).
- 🚀 **SEO Оптимизация**: Настроенные мета-теги, OpenGraph для соцсетей, `sitemap.xml`, `robots.txt` и WebP-сжатие графики.

## 🛠 Технологический стек

**Frontend:**
- [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/) (Стилизация)
- [React i18next](https://react.i18next.com/) (Локализация)
- [Three.js](https://threejs.org/) & [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) (3D Графика)
- [Framer Motion](https://www.framer.com/motion/) (Анимации)

**Backend:**
- [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api)

---

## ⚙️ Установка и запуск (Для разработчиков)

### 1. Предварительные требования
Убедитесь, что у вас установлены:
- Node.js (v18+)
- PostgreSQL (с запущенным сервером)
- Утилита `pg_dump` (необходима для работы автоматических бэкапов)

### 2. Клонирование репозитория
```bash
git clone https://github.com/XayrulloWeb/nova.git
cd nova
```

### 3. Настройка и запуск Backend-сервера
Перейдите в папку бэкенда:
```bash
cd nova-backend
```
Установите зависимости:
```bash
npm install
```
Создайте файл `.env` в папке `nova-backend` и заполните его по шаблону:
```env
# Подключение к БД
DATABASE_URL="postgresql://postgres:ВАШ_ПАРОЛЬ@localhost:5432/postgres?schema=public"

# Секретный ключ для авторизации администратора
JWT_SECRET="любой_сложный_секретный_ключ"

# Настройки Telegram-бота (для заявок и бэкапов)
TELEGRAM_BOT_TOKEN="токен_вашего_бота_из_botfather"
TELEGRAM_CHAT_ID="-id_вашей_группы_с_минусом"
```

Синхронизируйте базу данных Prisma:
```bash
npx prisma db push
```

Запустите сервер:
```bash
npm run dev
# или
node src/index.js
```
*Бэкенд по умолчанию запустится на порту `5000`.*

### 4. Настройка и запуск Frontend
Откройте новый терминал и вернитесь в корень проекта (папка `nova`).
Установите зависимости:
```bash
# Используйте --legacy-peer-deps из-за конфликта react-quill и React 19
npm install --legacy-peer-deps
```

Запустите Vite dev-сервер:
```bash
npm run dev
```
*Фронтенд будет доступен по адресу `http://localhost:5173`.*

---

## 🔑 Доступы по умолчанию
Для входа в панель администратора по умолчанию логин и пароль задаются при первом создании или через сид. 
- **Страница входа:** `http://localhost:5173/admin`

## 📝 Лицензия
Private / Собственность Nova International AI School.
