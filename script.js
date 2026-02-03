document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('projectModal');
  const closeBtn = document.querySelector('.close-btn');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalPrice = document.getElementById('modalPrice');
  const modalFeatures = document.getElementById('modalFeatures');

  // Features mapping for each project
  const projectDetails = {
    'Login & Signup with Email OTP': [
      'Backend: Node.js & Express',
      'Database: MongoDB',
      'Frontend: Angular',
      'Secure Email OTP Integration',
      'JWT Authentication'
    ],
    'E-Commerce Website': [
      'Full Stack Solution',
      'Admin Dashboard',
      'User Cart & Checkout',
      'Payment Gateway Integration',
      'Order Management'
    ],
    'AI Fire Detection System': [
      'Deep Learning Models',
      'Real-time Video Processing',
      'High Accuracy Detection',
      'Python & OpenCV',
      'Alert System'
    ],
    'Student Attendance System': [
      'Facial Recognition',
      'Automated Reports',
      'Student Database',
      'Admin Panel',
      'Easy Export to Excel'
    ],
    'Expense Tracker App': [
      'Visual Charts & Graphs',
      'Category Management',
      'Monthly Reports',
      'Dark Mode Support',
      'Local Storage Data'
    ]
  };

  // Add event listeners to all view buttons
  document.querySelectorAll('.view-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const card = e.target.closest('.card');
      const title = card.querySelector('h3').textContent;
      const desc = card.querySelector('.short-desc').textContent;
      const price = card.querySelector('.price').textContent;

      if (modal && modalTitle && modalDesc && modalPrice && modalFeatures) {
        // Populate Modal
        modalTitle.textContent = title;
        modalDesc.textContent = desc;
        modalPrice.textContent = price;

        // Clear and populate features
        modalFeatures.innerHTML = '';
        const features = projectDetails[title] || ['Complete Source Code', 'Documentation', 'Support'];
        features.forEach(feature => {
          const li = document.createElement('li');
          li.textContent = `✔ ${feature}`;
          modalFeatures.appendChild(li);
        });

        // Show Modal
        modal.style.display = 'block';
      }
    });
  });

  // Close Modal Actions
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  if (modal) {
    window.addEventListener('click', (e) => {
      if (e.target == modal) {
        modal.style.display = 'none';
      }
    });
  }

  // Filter Logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.projects .card'); // Broadened selector

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          // Only filter actual project cards, skip testimonials which are also cards but might not have category
          if (category) {
            if (filter === 'all' || category === filter) {
              card.style.display = 'block';
              card.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
              card.style.display = 'none';
            }
          }
        });
      });
    });
  }

  // Contact Form Handling
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button');
      const originalText = btn.textContent;

      btn.textContent = 'Sending...';
      btn.disabled = true;

      // Real API call to our backend
      try {
        const response = await fetch('/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: contactForm.querySelector('input[type="text"]').value,
            email: contactForm.querySelector('input[type="email"]').value,
            message: contactForm.querySelector('textarea').value
          })
        });

        if (response.ok) {
          btn.textContent = 'Message Sent!';
          btn.style.background = '#22c55e'; // Green success color
          contactForm.reset();
        } else {
          throw new Error('Failed to send');
        }
      } catch (error) {
        console.error('Error:', error);
        btn.textContent = 'Error Sending';
        btn.style.background = '#ef4444'; // Red error color
      } finally {
        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
          btn.style.background = '#2563eb'; // Revert color
        }, 3000);
      }

    });
  }
});
