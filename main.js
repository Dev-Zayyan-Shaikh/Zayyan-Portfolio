document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll Reveal Animations (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve once revealed to keep performance high
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // 2. Animated Counters for Metrics
  const counterElements = document.querySelectorAll('.stat-counter');
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-target'));
        const duration = 1500; // ms
        const stepTime = 15;
        const steps = duration / stepTime;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            el.innerText = target % 1 === 0 ? Math.round(target).toLocaleString() : target.toFixed(1);
            clearInterval(timer);
          } else {
            el.innerText = target % 1 === 0 ? Math.round(current).toLocaleString() : current.toFixed(1);
          }
        }, stepTime);

        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.5
  });

  counterElements.forEach(el => {
    counterObserver.observe(el);
  });

  // 3. Sticky Header Scroll Indicator & Shadows
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('shadow-sm', 'border-b', 'border-zinc-200/50');
    } else {
      header.classList.remove('shadow-sm', 'border-b', 'border-zinc-200/50');
    }
  });

  // 4. Mobile Menu Toggle
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      mobileMenu.classList.toggle('flex');
    });
  }

  // 5. Interactive UI Mockups (e.g., active state triggers)
  // Used in Project Detail Pages for showing and hiding details
  window.activateDiagramStep = (stepNumber, totalSteps, detailIdPrefix) => {
    // Deactivate all steps
    for (let i = 1; i <= totalSteps; i++) {
      const trigger = document.getElementById(`step-trigger-${i}`);
      const content = document.getElementById(`${detailIdPrefix}-${i}`);
      
      if (trigger) {
        trigger.classList.remove('border-orange-500', 'bg-orange-50/50', 'text-orange-600', 'border-emerald-500', 'bg-emerald-50/50', 'text-emerald-600', 'border-teal-500', 'bg-teal-50/50', 'text-teal-600', 'border-indigo-500', 'bg-indigo-50/50', 'text-indigo-600');
        trigger.classList.add('border-zinc-200', 'text-zinc-600');
      }
      if (content) {
        content.classList.add('hidden');
      }
    }

    // Activate the clicked step
    const activeTrigger = document.getElementById(`step-trigger-${stepNumber}`);
    const activeContent = document.getElementById(`${detailIdPrefix}-${stepNumber}`);
    
    let activeThemeColor = 'orange';
    if (detailIdPrefix.includes('greenbore')) activeThemeColor = 'emerald';
    if (detailIdPrefix.includes('dermai')) activeThemeColor = 'teal';
    if (detailIdPrefix.includes('robodoc')) activeThemeColor = 'indigo';

    if (activeTrigger) {
      activeTrigger.classList.remove('border-zinc-200', 'text-zinc-600');
      activeTrigger.classList.add(`border-${activeThemeColor}-500`, `bg-${activeThemeColor}-50/50`, `text-${activeThemeColor}-600`);
    }
    if (activeContent) {
      activeContent.classList.remove('hidden');
    }
  };

  // 6. Interactive Pricing Selector (DermAI page)
  window.switchPricing = (billingCycle) => {
    const prices = document.querySelectorAll('.pricing-val');
    const billingLabels = document.querySelectorAll('.billing-label');
    
    billingLabels.forEach(lbl => {
      if (lbl.getAttribute('data-cycle') === billingCycle) {
        lbl.classList.add('bg-zinc-900', 'text-white');
        lbl.classList.remove('text-zinc-600');
      } else {
        lbl.classList.remove('bg-zinc-900', 'text-white');
        lbl.classList.add('text-zinc-600');
      }
    });

    prices.forEach(price => {
      const monthly = parseFloat(price.getAttribute('data-monthly'));
      const annual = parseFloat(price.getAttribute('data-annual'));
      price.innerText = billingCycle === 'annual' ? `$${annual}` : `$${monthly}`;
    });
  };

  // 7. Interactive RoboDoc Assistant Mode Switcher
  window.switchRoboDocMode = (modeName) => {
    const tabs = document.querySelectorAll('.robodoc-mode-tab');
    const containers = document.querySelectorAll('.robodoc-mode-container');

    tabs.forEach(tab => {
      if (tab.getAttribute('data-mode') === modeName) {
        tab.classList.add('border-indigo-500', 'text-indigo-600', 'bg-indigo-50/30');
        tab.classList.remove('border-transparent', 'text-zinc-600', 'hover:text-zinc-900');
      } else {
        tab.classList.remove('border-indigo-500', 'text-indigo-600', 'bg-indigo-50/30');
        tab.classList.add('border-transparent', 'text-zinc-600', 'hover:text-zinc-900');
      }
    });

    containers.forEach(container => {
      if (container.id === `robodoc-mode-${modeName}`) {
        container.classList.remove('hidden');
      } else {
        container.classList.add('hidden');
      }
    });
  };

  // 8. Contact Form Submission Handler
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simulate submission animation
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const origText = submitBtn.innerHTML;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg> Sending...`;
      submitBtn.disabled = true;

      setTimeout(() => {
        contactForm.reset();
        submitBtn.innerHTML = origText;
        submitBtn.disabled = false;
        
        // Show success state
        formSuccess.classList.remove('hidden');
        setTimeout(() => {
          formSuccess.classList.add('hidden');
        }, 5000);
      }, 1500);
    });
  }
});
