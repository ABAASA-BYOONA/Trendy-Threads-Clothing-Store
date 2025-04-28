
    // Hide loading screen after 2 seconds
    setTimeout(() => {
      document.getElementById('loading').style.display = 'none';
    }, 2000);

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        themeToggle.textContent = 'Toggle Dark Mode';
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.textContent = 'Toggle Light Mode';
      }
    });

   // Burger menu toggle
const burger = document.querySelector('.burger');
const mobileMenu = document.querySelector('.mobile-menu');
if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        burger.classList.toggle('active');
    });
}


    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });

    // Simulate form submission
    document.querySelector('.contact-form button').addEventListener('click', () => {
      alert('Message sent!');
    });

    // Simulate payment
    document.querySelector('.payment-form button').addEventListener('click', () => {
      alert('Payment processed!');
      // Optionally clear cart after payment
      cart = [];
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCart();
    });

    document.addEventListener('DOMContentLoaded', function() {
      const productCards = document.querySelectorAll('.product-card');
      const fullscreenImageContainer = document.createElement('div');
      fullscreenImageContainer.classList.add('fullscreen-image-container');
      document.body.appendChild(fullscreenImageContainer);
  
      productCards.forEach(card => {
          card.addEventListener('click', function() {
              const imgSrc = card.querySelector('img').src;
              const imgAlt = card.querySelector('img').alt;
              fullscreenImageContainer.innerHTML = `<img src="${imgSrc}" alt="${imgAlt}">`;
              fullscreenImageContainer.style.display = 'flex';
          });
      });
  
      fullscreenImageContainer.addEventListener('click', function() {
          fullscreenImageContainer.style.display = 'none';
          fullscreenImageContainer.innerHTML = ''; // Clear the image
      });
  });
