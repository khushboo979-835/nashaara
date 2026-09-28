/**
 * Nasha Mukti Kendra Ara - JavaScript Functionality
 * Affiliated with Kaushalya Samay Hospital, Ara, Bihar
 * Helpline: +91 8539057013
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation Header
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 2. Mobile Hamburger Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      }
    });
  }

  // 3. Mobile Dropdown Toggle
  const navDropdowns = document.querySelectorAll('.nav-dropdown');
  navDropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('.nav-link');
    if (link && window.innerWidth <= 768) {
      link.addEventListener('click', (e) => {
        // If clicking on services on mobile, toggle dropdown
        if (window.innerWidth <= 768) {
          e.preventDefault();
          dropdown.classList.toggle('active');
        }
      });
    }
  });

  // 4. FAQ Accordion Functionality
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other items
        faqItems.forEach(faq => faq.classList.remove('active'));
        
        // Toggle clicked item
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 5. Testimonials Carousel / Slider
  const testimonials = [
    {
      text: "“Bringing my brother to Nasha Mukti Kendra Ara at Kaushalya Samay Hospital was the best decision our family made. The doctors and counselors gave him a second life. He is now 1.5 years sober and happily employed.”",
      author: "Rameshwar Singh",
      location: "Ara, Bhojpur",
      rating: 5
    },
    {
      text: "“The compassionate care and psychiatric counseling here are unmatched in Bihar. They treated my son with utmost dignity and 100% confidentiality. Today our household is filled with peace once again.”",
      author: "Sunita Devi",
      location: "Jagdishpur, Bhojpur",
      rating: 5
    },
    {
      text: "“I was trapped in severe alcohol addiction for 8 years. The medical detox program here made withdrawal safe and painless. The daily yoga, nutritious food, and family therapy changed my entire mindset.”",
      author: "Amit Kumar",
      location: "Buxar / Ara",
      rating: 5
    }
  ];

  const testimonialCard = document.querySelector('.testimonial-card');
  const dotsContainer = document.querySelector('.testimonial-nav');

  if (testimonialCard && dotsContainer) {
    let currentIdx = 0;

    function renderTestimonial(index) {
      const item = testimonials[index];
      testimonialCard.innerHTML = `
        <div class="star-rating">
          ${'<i class="fa-solid fa-star"></i>'.repeat(item.rating)}
        </div>
        <i class="fa-solid fa-quote-left quote-icon"></i>
        <p class="testimonial-text">${item.text}</p>
        <div class="testimonial-author">
          <div class="author-avatar">${item.author.charAt(0)}</div>
          <div class="author-info text-left">
            <h5>${item.author}</h5>
            <span>${item.location} • Verified Family Review</span>
          </div>
        </div>
      `;

      // Update dots
      document.querySelectorAll('.nav-dot').forEach((dot, dIdx) => {
        dot.classList.toggle('active', dIdx === index);
      });
    }

    // Build dots
    dotsContainer.innerHTML = '';
    testimonials.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = `nav-dot ${i === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Testimonial slide ${i + 1}`);
      dot.addEventListener('click', () => {
        currentIdx = i;
        renderTestimonial(currentIdx);
      });
      dotsContainer.appendChild(dot);
    });

    renderTestimonial(0);

    // Auto rotate every 6 seconds
    setInterval(() => {
      currentIdx = (currentIdx + 1) % testimonials.length;
      renderTestimonial(currentIdx);
    }, 6000);
  }

  // 6. Gallery Filter & Lightbox
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');
        galleryItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });

    // Lightbox open
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img && lightbox && lightboxImg) {
          lightboxImg.src = img.src;
          lightbox.classList.add('active');
        }
      });
    });

    // Lightbox close
    if (lightboxClose && lightbox) {
      lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
      });

      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
          lightbox.classList.remove('active');
        }
      });
    }
  }

  // 7. Toast Notification Handler
  function showToast(message, type = 'success') {
    let toast = document.querySelector('.toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-notification';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `
      <i class="fa-solid ${type === 'success' ? 'fa-circle-check text-secondary' : 'fa-circle-exclamation text-accent'} fa-xl"></i>
      <div>
        <strong style="display:block; font-size: 0.95rem;">${type === 'success' ? 'Success' : 'Notice'}</strong>
        <span style="font-size: 0.88rem;">${message}</span>
      </div>
    `;

    toast.classList.add('active');
    setTimeout(() => {
      toast.classList.remove('active');
    }, 4500);
  }

  // 8. Contact & Appointment Forms Submission
  const forms = document.querySelectorAll('form.ajax-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const phoneInput = form.querySelector('input[type="tel"]');
      const nameInput = form.querySelector('input[name="name"]');

      if (phoneInput && phoneInput.value.trim().length < 10) {
        showToast('Please enter a valid 10-digit phone number.', 'error');
        phoneInput.focus();
        return;
      }

      // Simulate successful submission
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : '';
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
      }

      setTimeout(() => {
        showToast('Thank you! Our medical counselor will call you within 15 minutes.');
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      }, 1200);
    });
  });

  // 9. Consultation Modal
  const consultationModal = document.getElementById('consultationModal');
  const openModalBtns = document.querySelectorAll('.open-consultation-modal');
  const closeModalBtns = document.querySelectorAll('.close-modal');

  if (consultationModal) {
    openModalBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        consultationModal.style.display = 'flex';
      });
    });

    closeModalBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        consultationModal.style.display = 'none';
      });
    });

    consultationModal.addEventListener('click', (e) => {
      if (e.target === consultationModal) {
        consultationModal.style.display = 'none';
      }
    });
  }
});
