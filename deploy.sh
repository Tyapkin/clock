#!/bin/bash

# Настройки
SERVER_USER="root" # Замените на вашего пользователя
SERVER_IP="YOUR_VPS_IP" # Замените на IP вашего сервера
REMOTE_DIR="/opt/clock-app"

echo "🚀 Начинаем деплой на $SERVER_IP..."

# 1. Создаем папку на сервере
ssh $SERVER_USER@$SERVER_IP "mkdir -p $REMOTE_DIR"

# 2. Копируем файлы (исключая node_modules и dist локально, если они есть, но лучше использовать rsync)
echo "📦 Копируем файлы..."
rsync -avz --exclude 'node_modules' --exclude 'dist' --exclude '.git' ./ $SERVER_USER@$SERVER_IP:$REMOTE_DIR

# 3. Запускаем Docker Compose на сервере
echo "🐳 Запускаем контейнеры..."
ssh $SERVER_USER@$SERVER_IP "cd $REMOTE_DIR && docker-compose up -d --build"

echo "✅ Деплой завершен! Приложение доступно по адресу: http://$SERVER_IP:8080"
