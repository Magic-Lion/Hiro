// Настройки Telegram бота (ЗАМЕНИТЕ НА СВОИ)
  const BOT_TOKEN = '8781406021:AAElraGYEGkGGaA866Ntd12m5rT0boj7h60'; // Вставьте ваш токен
  const CHAT_ID = '1707020523'; // Вставьте ваш Chat ID

  document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Собираем данные из формы
    const name = document.getElementById('userName').value.trim();
    const phone = document.getElementById('userPhone').value.trim();
    const email = document.getElementById('userEmail').value.trim() || 'не указан';
    const message = document.getElementById('userMessage').value.trim() || 'не указано';

    // Формируем текст сообщения
    const text = `📩 *Новая заявка с сайта!*

👤 *Имя:* ${name}
📞 *Телефон:* ${phone}
✉️ *Email:* ${email}
📝 *Вопрос:* ${message}

🕐 Отправлено: ${new Date().toLocaleString('ru-RU')}`;

    // Отправляем в Telegram
    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        parse_mode: 'Markdown'
      })
    })
    .then(response => {
      if (response.ok) {
        // Скрываем форму и показываем сообщение об успехе
        document.getElementById('bookingForm').style.display = 'none';
        document.getElementById('successMessage').style.display = 'block';
      } else {
        alert('❌ Ошибка при отправке. Попробуйте ещё раз или напишите мне в Telegram.');
      }
    })
    .catch(error => {
      console.error('Ошибка:', error);
      alert('❌ Ошибка соединения. Проверьте интернет и попробуйте снова.');
    });
  });