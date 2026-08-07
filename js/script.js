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

  // ===== ФОРМА ЗАЯВКИ (через Formspree) =====
document.getElementById('bookingForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const form = this;
  const submitBtn = form.querySelector('.btn-submit');
  const originalText = submitBtn.innerHTML;
  
  // Показываем загрузку
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
  submitBtn.disabled = true;
  
  // Собираем данные
  const formData = new FormData(form);
  
  fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      form.style.display = 'none';
      document.getElementById('formSuccess').style.display = 'block';
    } else {
      alert('❌ Ошибка при отправке. Попробуйте ещё раз.');
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  })
  .catch(error => {
    console.error('Ошибка:', error);
    alert('❌ Ошибка соединения. Проверьте интернет и попробуйте снова.');
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  });
});

// Сброс формы для новой заявки
function resetForm() {
  const form = document.getElementById('bookingForm');
  form.style.display = 'block';
  document.getElementById('formSuccess').style.display = 'none';
  form.reset();
  document.getElementById('booking').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
// ===== ЗВЁЗДЫ ДЛЯ ОЦЕНКИ =====
const stars = document.querySelectorAll('#ratingStars i');
const ratingInput = document.getElementById('reviewRating');

stars.forEach(star => {
  star.addEventListener('click', function() {
    const value = parseInt(this.dataset.value);
    ratingInput.value = value;
    stars.forEach((s, index) => {
      s.style.color = index < value ? '#d4af37' : '#555';
    });
  });
  star.addEventListener('mouseenter', function() {
    const value = parseInt(this.dataset.value);
    stars.forEach((s, index) => {
      s.style.color = index < value ? '#d4af37' : '#555';
      if (index < value) s.style.opacity = '0.7';
    });
  });
  star.addEventListener('mouseleave', function() {
    const currentValue = parseInt(ratingInput.value);
    stars.forEach((s, index) => {
      s.style.color = index < currentValue ? '#d4af37' : '#555';
      s.style.opacity = '1';
    });
  });
});

// ===== ФОРМА ОТЗЫВА (через Formspree) =====
document.getElementById('reviewFormSubmit').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const form = this;
  const submitBtn = form.querySelector('.btn-submit');
  const originalText = submitBtn.innerHTML;
  
  if (parseInt(document.getElementById('reviewRating').value) === 0) {
    alert('Пожалуйста, поставьте оценку (выберите звёздочки).');
    return;
  }
  
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
  submitBtn.disabled = true;
  
  const formData = new FormData(form);
  
  fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      form.style.display = 'none';
      document.getElementById('reviewSuccess').style.display = 'block';
    } else {
      alert('❌ Ошибка при отправке. Попробуйте ещё раз.');
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  })
  .catch(error => {
    console.error('Ошибка:', error);
    alert('❌ Ошибка соединения. Проверьте интернет и попробуйте снова.');
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  });
});

function resetReviewForm() {
  const form = document.getElementById('reviewFormSubmit');
  form.style.display = 'block';
  document.getElementById('reviewSuccess').style.display = 'none';
  form.reset();
  document.getElementById('reviewRating').value = '0';
  document.querySelectorAll('#ratingStars i').forEach(s => s.style.color = '#555');
  document.getElementById('reviewForm').scrollIntoView({ behavior: 'smooth', block: 'start' });
}