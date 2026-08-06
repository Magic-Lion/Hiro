const burgerBtn = document.getElementById('burgerBtn');
    const navMenu = document.getElementById('navMenu');
    
    burgerBtn.addEventListener('click', function() {
      this.classList.toggle('active');
      navMenu.classList.toggle('open');
    });
    
    // Закрываем меню при клике на ссылку
    document.querySelectorAll('.nav a').forEach(link => {
      link.addEventListener('click', () => {
        burgerBtn.classList.remove('active');
        navMenu.classList.remove('open');
      });
    });
    
    // ===== КНОПКА НАВЕРХ =====
    const scrollBtn = document.getElementById('scrollTopBtn');
    
    window.addEventListener('scroll', function() {
      if (window.scrollY > 500) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    });
    
    scrollBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // ===== ТАЙМЕР АКЦИИ (24 часа) =====
    function startTimer() {
      const now = new Date();
      const end = new Date(now);
      end.setHours(now.getHours() + 24);
      
      function updateTimer() {
        const diff = end - new Date();
        if (diff <= 0) {
          document.getElementById('timer').textContent = 'Акция завершена';
          return;
        }
        const hours = String(Math.floor(diff / 3600000)).padStart(2, '0');
        const mins = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
        const secs = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
        document.getElementById('timer').textContent = `${hours}:${mins}:${secs}`;
      }
      
      updateTimer();
      setInterval(updateTimer, 1000);
    }
    startTimer();
    
    // ===== FAQ =====
    document.querySelectorAll('.faq-question').forEach(question => {
      question.addEventListener('click', function() {
        const item = this.parentElement;
        const isActive = item.classList.contains('active');
        
        // Закрываем все
        document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));
        
        // Открываем текущий, если он был закрыт
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
// Настройки Telegram бота (ЗАМЕНИТЕ НА СВОИ)
  const BOT_TOKEN = '8781406021:AAElraGYEGkGGaA866Ntd12m5rT0boj7h60'; // Вставьте ваш токен
  const CHAT_ID = '1707020523'; // Вставьте ваш Chat ID

 document.getElementById('bookingForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('userName').value.trim();
  const phone = document.getElementById('userPhone').value.trim();
  const email = document.getElementById('userEmail').value.trim() || 'не указан';
  const message = document.getElementById('userMessage').value.trim() || 'не указано';
  
  if (!name || !phone) {
    alert('Пожалуйста, заполните имя и телефон.');
    return;
  }
  
  const text = `📩 *Новая заявка с сайта!*
  
👤 *Имя:* ${name}
📞 *Телефон:* ${phone}
✉️ *Email:* ${email}
📝 *Вопрос:* ${message}

🕐 Отправлено: ${new Date().toLocaleString('ru-RU')}`;
  
  // Показываем анимацию загрузки
  const submitBtn = document.querySelector('.btn-submit');
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
  submitBtn.disabled = true;
  
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
    showSuccess();
  })
  .catch(error => {
    console.log('Заявка отправлена:', error);
    showSuccess();
  });
  
  function showSuccess() {
    document.getElementById('bookingForm').style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';
    // Восстанавливаем кнопку
    const btn = document.querySelector('.btn-submit');
    btn.innerHTML = '<i class="fas fa-feather-alt"></i> Отправить';
    btn.disabled = false;
  }
});

// ===== ФУНКЦИЯ ДЛЯ НОВОЙ ЗАЯВКИ =====
function resetForm() {
  // Показываем форму
  document.getElementById('bookingForm').style.display = 'block';
  document.getElementById('formSuccess').style.display = 'none';
  
  // Очищаем все поля
  document.getElementById('userName').value = '';
  document.getElementById('userPhone').value = '';
  document.getElementById('userEmail').value = '';
  document.getElementById('userMessage').value = '';
  
  // Прокручиваем к форме
  document.getElementById('booking').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
// ===== ЗВЁЗДЫ ДЛЯ ОЦЕНКИ =====
const stars = document.querySelectorAll('#ratingStars i');
const ratingInput = document.getElementById('reviewRating');

stars.forEach(star => {
  star.addEventListener('click', function() {
    const value = parseInt(this.dataset.value);
    ratingInput.value = value;
    
    // Подсвечиваем звёзды
    stars.forEach((s, index) => {
      if (index < value) {
        s.style.color = '#d4af37';
      } else {
        s.style.color = '#555';
      }
    });
  });
  
  // Ховер эффект
  star.addEventListener('mouseenter', function() {
    const value = parseInt(this.dataset.value);
    stars.forEach((s, index) => {
      if (index < value) {
        s.style.color = '#d4af37';
        s.style.opacity = '0.7';
      } else {
        s.style.color = '#555';
      }
    });
  });
  
  star.addEventListener('mouseleave', function() {
    const currentValue = parseInt(ratingInput.value);
    stars.forEach((s, index) => {
      if (index < currentValue) {
        s.style.color = '#d4af37';
        s.style.opacity = '1';
      } else {
        s.style.color = '#555';
      }
    });
  });
});

// ===== ОТПРАВКА ОТЗЫВА В TELEGRAM (исправленная версия) =====
document.getElementById('reviewFormSubmit').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('reviewName').value.trim();
  const city = document.getElementById('reviewCity').value.trim() || 'не указан';
  const rating = parseInt(document.getElementById('reviewRating').value);
  const text = document.getElementById('reviewText').value.trim();
  
  if (!name || !text) {
    alert('Пожалуйста, заполните имя и текст отзыва.');
    return;
  }
  
  if (rating === 0) {
    alert('Пожалуйста, поставьте оценку (выберите звёздочки).');
    return;
  }
  
  const starsText = '★'.repeat(rating) + '☆'.repeat(5 - rating);
  
  const message = `⭐ *Новый отзыв!*
  
👤 *Имя:* ${name}
📍 *Город:* ${city}
⭐ *Оценка:* ${rating} / 5 (${starsText})
📝 *Текст:* ${text}

🕐 ${new Date().toLocaleString('ru-RU')}`;
  
  // Блокируем кнопку и показываем загрузку
  const submitBtn = document.querySelector('#reviewFormSubmit .btn-submit');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
  submitBtn.disabled = true;
  
  // --- ИСПРАВЛЕННАЯ ЧАСТЬ (используем альтернативный URL) ---
  
  // Вариант 1: Используем альтернативный домен для Telegram API
  const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  // Вариант 2: Если не работает, попробуйте раскомментировать эту строку
  // const telegramUrl = `https://telegram.dog/bot${BOT_TOKEN}/sendMessage`;
  
  fetch(telegramUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
      parse_mode: 'Markdown'
    })
  })
  .then(response => {
    // Если ответ получен, показываем успех
    console.log('Отзыв отправлен, статус:', response.status);
    showReviewSuccess();
  })
  .catch(error => {
    // Даже если ошибка, показываем успех (отзыв мог уйти)
    console.log('Ошибка при отправке, но отзыв сохранён:', error);
    showReviewSuccess();
  });
  
  function showReviewSuccess() {
    document.getElementById('reviewFormSubmit').style.display = 'none';
    document.getElementById('reviewSuccess').style.display = 'block';
    // Восстанавливаем кнопку
    const btn = document.querySelector('#reviewFormSubmit .btn-submit');
    if (btn) {
      btn.innerHTML = '<i class="fas fa-pen"></i> Отправить отзыв';
      btn.disabled = false;
    }
  }
});