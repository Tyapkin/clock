# Настройка VLESS + SNI (Clock App)

Вы настроили систему так, что **Xray** слушает порт 443, обрабатывает VLESS-соединения, а обычный HTTPS-трафик перенаправляет на ваше приложение (Clock App).

## 1. Получение сертификатов (на VPS)

Вам нужны SSL сертификаты для вашего домена. Самый простой способ — использовать `certbot`.

1.  **Остановите всё, что занимает 80 порт** (если есть):
    ```bash
    docker-compose down
    ```
2.  **Установите certbot** (если нет):
    ```bash
    apt update && apt install certbot -y
    ```
3.  **Получите сертификат**:
    ```bash
    certbot certonly --standalone -d your-domain.com
    ```
    *(Замените `your-domain.com` на ваш домен)*

4.  **Скопируйте сертификаты в папку проекта**:
    Создайте папку `certs` в директории с `docker-compose.yml`:
    ```bash
    mkdir -p certs
    cp /etc/letsencrypt/live/your-domain.com/fullchain.pem ./certs/
    cp /etc/letsencrypt/live/your-domain.com/privkey.pem ./certs/
    ```
    *Важно: Docker должен иметь права на чтение этих файлов. Можно сделать `chmod 644 ./certs/*`.*

## 2. Запуск

```bash
docker-compose up -d --build
```

## 3. Настройка клиента (V2RayNG, Streisand, etc.)

Используйте следующие параметры:

*   **Protocol**: VLESS
*   **Address**: `your-domain.com`
*   **Port**: 443
*   **UUID**: `5D1A632C-F9B4-4ED5-AD5C-5C125DB992E2`
*   **Flow**: `xtls-rprx-vision`
*   **Encryption**: `none`
*   **Network**: `tcp`
*   **Security**: `tls`
*   **SNI**: `your-domain.com`
*   **Fingerprint**: `chrome`

Теперь, если вы откроете `https://your-domain.com` в браузере, вы увидите ваше приложение с часами. А если подключитесь через VPN-клиент — будете использовать прокси.
