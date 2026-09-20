document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. KODE FAQ ACCORDION (KODE LAMA ANDA)
  // ==========================================
  const faqButtons = document.querySelectorAll('.faq-question');

  faqButtons.forEach(button => {
    button.addEventListener('click', () => {
      const faqItem = button.parentElement;
      const arrow = button.querySelector('.arrow');

      // Toggle kelas active
      faqItem.classList.toggle('active');

      // Ubah panah
      if (faqItem.classList.contains('active')) {
        if (arrow) arrow.textContent = '↑';
      } else {
        if (arrow) arrow.textContent = '↓';
      }
    });
  });


  // ==========================================
  // 2. KODE MENU NAVIGASI MOBILE (KODE BARU)
  // ==========================================
  const openMenuBtn = document.getElementById('openMenuBtn');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

  // Buka Menu saat tombol Hamburger (☰) diklik
  if (openMenuBtn && mobileMenu) {
    openMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.add('active');
    });
  }

  // Tutup Menu saat tombol Silang (✕) diklik
  if (closeMenuBtn && mobileMenu) {
    closeMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
    });
  }

  // Toggle Submenu (Profil, PMB, Pesantren, dll)
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const parentItem = toggle.parentElement;
      parentItem.classList.toggle('open');
    });
  });

  // ==========================================
  // FITUR HERO BANNER SLIDER (OTOMATIS GANTI BACKGROUND)
  // ==========================================
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  if (slides.length > 0) {
    let currentSlide = 0;
    const slideInterval = 5000; // Berganti setiap 5 detik

    function showSlide(index) {
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));

      currentSlide = (index + slides.length) % slides.length;
      slides[currentSlide].classList.add('active');
      if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => showSlide(index));
    });

    // Jalankan berganti otomatis
    setInterval(() => {
      showSlide(currentSlide + 1);
    }, slideInterval);
  }
  // ==========================================
  // FITUR ANIMASI COUNTER STATISTIK
  // ==========================================
  const statNumbers = document.querySelectorAll('.stat-number');
  let started = false;

  function startCounter() {
    statNumbers.forEach(num => {
      const target = +num.getAttribute('data-target');
      const count = +num.innerText;
      const speed = 200; // Kecepatan animasi
      const inc = target / speed;

      const updateCount = () => {
        const current = +num.innerText;
        if (current < target) {
          num.innerText = Math.ceil(current + inc);
          setTimeout(updateCount, 40);
        } else {
          num.innerText = target;
        }
      };

      updateCount();
    });
  }

  // Jalankan animasi saat section terlihat di layar
  window.addEventListener('scroll', () => {
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
      const sectionPos = statsSection.getBoundingClientRect().top;
      const screenPos = window.innerHeight / 1.2;

      if (sectionPos < screenPos && !started) {
        startCounter();
        started = true;
      }
    }
  });
});