// ===== БУРГЕР-МЕНЮ =====
const burgerBtn = document.getElementById('burgerBtn');
const navMenu = document.getElementById('navMenu');

burgerBtn.addEventListener('click', function() {
  this.classList.toggle('active');
  navMenu.classList.toggle('open');
});

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

// ===== ТАЙМЕР АКЦИИ =====
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
    
    document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));
    
    if (!isActive) {
      item.classList.add('active');
    }
  });
});

// ===== ЗВЁЗДЫ ДЛЯ ОЦЕНКИ =====
const stars = document.querySelectorAll('#ratingStars i');
const ratingInput = document.getElementById('reviewRating');

if (stars.length > 0 && ratingInput) {
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
}