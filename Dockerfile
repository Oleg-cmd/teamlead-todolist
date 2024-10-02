# Используем Node.js 18 на Alpine Linux
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Устанавливаем необходимые инструменты и зависимости
RUN apk add --no-cache python3 py3-pip make g++ git

# Устанавливаем setuptools через apk
RUN apk add --no-cache py3-setuptools

# Копируем package.json и package-lock.json
COPY package*.json ./

# Обновляем зависимоти
RUN npm upgrade

# Устанавливаем все зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Собираем приложение
RUN npm run build

# Открываем порт 3000
EXPOSE 3000

# Запускаем приложение
CMD ["node", "--es-module-specifier-resolution=node", "app.js"]