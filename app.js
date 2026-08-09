// ===== CARRUSEL =====
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${(i - index) * 100}%)`;
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

// Auto-play
let autoPlay = setInterval(nextSlide, 4000);

// Dot click
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    clearInterval(autoPlay);
    currentSlide = index;
    showSlide(currentSlide);
    autoPlay = setInterval(nextSlide, 4000);
  });
});

// Touch swipe
let touchStartX = 0;
let touchEndX = 0;

document.querySelector('.carousel-container').addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

document.querySelector('.carousel-container').addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const diff = touchStartX - touchEndX;
  if (Math.abs(diff) > 50) {
    clearInterval(autoPlay);
    if (diff > 0) {
      currentSlide = (currentSlide + 1) % slides.length;
    } else {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    }
    showSlide(currentSlide);
    autoPlay = setInterval(nextSlide, 4000);
  }
}

// Inicializar
showSlide(0);

// ===== BOTÓN SUBIR =====
const scrollBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollBtn.classList.add('show');
  } else {
    scrollBtn.classList.remove('show');
  }
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== MODO OSCURO =====
const darkModeBtn = document.getElementById('darkModeToggle');
const html = document.documentElement;
const icon = darkModeBtn.querySelector('i');

// Verificar preferencia guardada
if (localStorage.getItem('theme') === 'dark') {
  html.setAttribute('data-theme', 'dark');
  icon.className = 'fas fa-sun';
}

darkModeBtn.addEventListener('click', () => {
  if (html.getAttribute('data-theme') === 'dark') {
    html.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
    icon.className = 'fas fa-moon';
  } else {
    html.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    icon.className = 'fas fa-sun';
  }
});

// ===== TOAST =====
const toast = document.getElementById('toast');

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

// ===== RESERVAS =====
document.getElementById('formCita').addEventListener('submit', (e) => {
  e.preventDefault();
  showToast('✅ ¡Cita agendada con éxito!');
  e.target.reset();
});

// ===== BOTONES RESERVAR =====
document.querySelectorAll('.btn-book').forEach(btn => {
  btn.addEventListener('click', () => {
    const service = btn.closest('.service-card').dataset.service;
    showToast(`📅 Reservaste: ${service}`);
    // Scroll al formulario
    document.querySelector('.booking-section').scrollIntoView({ behavior: 'smooth' });
  });
});

// ===== CONTADOR DE VISITAS =====
let visits = parseInt(localStorage.getItem('visits')) || 0;
visits++;
localStorage.setItem('visits', visits);
document.getElementById('visitCount').textContent = visits;

// ===== MENÚ TOGGLE =====
document.getElementById('menuToggle').addEventListener('click', () => {
  showToast('📋 Menú desplegado');
});

// ===== ANIMACIÓN AL CARGAR =====
document.addEventListener('DOMContentLoaded', () => {
  // Efecto de entrada para las tarjetas
  document.querySelectorAll('.service-card, .testimonial-card, .team-card').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    setTimeout(() => {
      el.style.transition = 'all 0.5s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 100 * i);
  });
});