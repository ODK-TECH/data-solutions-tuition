/* =========================================================
   ODK SOLUTIONS HUB — MAIN SCRIPT
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ===============================
     MOBILE MENU TOGGLE
     =============================== */
  const menuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden');
      menuButton.setAttribute('aria-expanded', String(!isOpen));
    });
  }

  function closeMobileMenu() {
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');

      if (menuButton) {
        menuButton.setAttribute('aria-expanded', 'false');
      }
    }
  }

  /* ===============================
     SMOOTH SCROLLING
     =============================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const offset = 90; // height of fixed navbar
      const top = target.offsetTop - offset;

      window.scrollTo({
        top,
        behavior: 'smooth'
      });

      closeMobileMenu();
    });
  });

  /* ===============================
     FAQ ACCORDION
     =============================== */
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.closest('.faq-item');
      if (!item) return;

      item.classList.toggle('active');
    });
  });

  /* ===============================
     SCROLL ANIMATIONS
     =============================== */
  const animatedElements = document.querySelectorAll(
    '.service-card, .tuition-card, .pricing-card'
  );

  if ('IntersectionObserver' in window && animatedElements.length > 0) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-6');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    animatedElements.forEach(el => {
      el.classList.add(
        'opacity-0',
        'translate-y-6',
        'transition-all',
        'duration-700',
        'ease-out'
      );
      observer.observe(el);
    });
  }

  /* ===============================
     FLOATING WHATSAPP CTA
     =============================== */
  if (!document.querySelector('[aria-label="Chat on WhatsApp"]')) {
    const whatsappBtn = document.createElement('a');

    whatsappBtn.href =
      'https://wa.me/233245051371?text=Hello%20ODK%20Solutions%20Hub,%20I%20would%20like%20to%20inquire.';
    whatsappBtn.target = '_blank';
    whatsappBtn.setAttribute('aria-label', 'Chat on WhatsApp');
    whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';

    whatsappBtn.style.position = 'fixed';
    whatsappBtn.style.bottom = '20px';
    whatsappBtn.style.right = '20px';
    whatsappBtn.style.width = '56px';
    whatsappBtn.style.height = '56px';
    whatsappBtn.style.background = '#25D366';
    whatsappBtn.style.color = '#fff';
    whatsappBtn.style.display = 'flex';
    whatsappBtn.style.alignItems = 'center';
    whatsappBtn.style.justifyContent = 'center';
    whatsappBtn.style.borderRadius = '50%';
    whatsappBtn.style.fontSize = '28px';
    whatsappBtn.style.boxShadow = '0 8px 20px rgba(0,0,0,0.25)';
    whatsappBtn.style.zIndex = '1000';

    document.body.appendChild(whatsappBtn);
  }

});
