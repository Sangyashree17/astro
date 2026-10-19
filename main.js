/**
 * ISHVARA TECH CONSULTING — MASTER CLIENT INTERFACE CONTROLLER
 * Architecture: Exact Replica of Pinterest References 1 & 2
 * Monochromatic Blue Color System & Advanced Micro-Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================================================
  // 1. Reference 1 Hero: Clean, Stable Fanned Deck (Zero Jitter / Shaking)
  // ==========================================================================
  const fannedCardsTrack = document.getElementById('fannedCardsTrack');
  if (fannedCardsTrack) {
    // Keep track stable at resting position with zero continuous movement
    fannedCardsTrack.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  }

  // ==========================================================================
  // 2. Reference 2: Left Floating Navigation Dock & Active Scrollspy
  // ==========================================================================
  const dockItems = document.querySelectorAll('.dock-item');
  const observedSections = document.querySelectorAll('section[id], footer[id]');

  const scrollSpyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        dockItems.forEach(item => {
          if (item.dataset.section === id) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  });

  observedSections.forEach(sec => scrollSpyObserver.observe(sec));

  // ==========================================================================
  // 3. Section 3: React Stacking Cards Section Integration
  // ==========================================================================
  // React component is auto-mounted via components/StackingCardsSection.js
  // Scroll and sticky positioning is managed with pure CSS to prevent jitter.

  // ==========================================================================
  // 4. Calendly Customer Stories Feedback Carousel (Exact Replica of Reference)
  // ==========================================================================
  const feedbackData = [
    {
      id: 0,
      metric: "80% reduction in booking-related emails",
      quote: '"We care deeply about the experience they have with us — and Ishvara helps us start it off right."',
      author: "Akira Bradley",
      role: "Co-Founder at Barking with the Bradley\'s",
      image: "assets/feedback-story-1.jpg",
      mediaTitle: "Barking with the Bradley\'s",
      mediaSubtitle: "Where every pup is treated like King"
    },
    {
      id: 1,
      metric: "4.2x faster release cadence & zero regression",
      quote: '"Working with Ishvara on our multi-tenant platform rebuild was one of the smoothest engineering engagements in my career."',
      author: "Marcus Davies",
      role: "VP of Product at HyperScale Studio",
      image: "assets/feedback-story-2.jpg",
      mediaTitle: "HyperScale Systems",
      mediaSubtitle: "Enterprise software built for compounding growth"
    },
    {
      id: 2,
      metric: "99.99% multi-region cloud uptime achieved",
      quote: '"Ishvara engineered our mission-critical Kubernetes infrastructure with zero downtime and ironclad HIPAA compliance."',
      author: "Elena Lindqvist",
      role: "Head of Technology at MedTech Global",
      image: "assets/feedback-story-3.jpg",
      mediaTitle: "MedTech Healthcare Platform",
      mediaSubtitle: "Zero-trust data architecture across 14 regions"
    },
    {
      id: 3,
      metric: "65% increase in client self-service adoption",
      quote: '"Our customer onboarding time plummeted from weeks to minutes. The intuitive workflows designed by Ishvara transformed our business."',
      author: "Sarah Jenkins",
      role: "Founder at Companion Care Network",
      image: "assets/feedback-story-4.jpg",
      mediaTitle: "Companion Care Network",
      mediaSubtitle: "Delivering compassionate digital care at scale"
    },
    {
      id: 4,
      metric: "18% operational cost savings in first quarter",
      quote: '"The predictive dispatch engine delivered compounding ROI immediately. Ishvara digs deep into real operational economics."',
      author: "Devendra Kulkarni",
      role: "Managing Director at GreenField AgriTech",
      image: "assets/feedback-story-5.jpg",
      mediaTitle: "GreenField Agricultural Systems",
      mediaSubtitle: "Autonomous optimization for modern farm operations"
    }
  ];

  let currentStoryIdx = 0;
  const totalStories = feedbackData.length;

  const cardMetric = document.getElementById('feedbackCardMetric');
  const cardQuote = document.getElementById('feedbackCardQuote');
  const cardAuthor = document.getElementById('feedbackCardAuthor');
  const cardRole = document.getElementById('feedbackCardRole');
  const cardImage = document.getElementById('feedbackCardImage');
  const mediaTitle = document.getElementById('feedbackMediaTitle');
  const mediaSubtitle = document.getElementById('feedbackMediaSubtitle');

  const sliceFarLeft = document.querySelector('.slice-far-left');
  const sliceNearLeft = document.querySelector('.slice-near-left');
  const sliceNearRight = document.querySelector('.slice-near-right');
  const sliceFarRight = document.querySelector('.slice-far-right');

  const dots = document.querySelectorAll('.feedback-dot');
  const prevBtn = document.getElementById('feedbackPrevBtn');
  const nextBtn = document.getElementById('feedbackNextBtn');
  const stage = document.getElementById('feedbackShowcaseStage');

  function updateFeedbackCarousel(newIdx) {
    currentStoryIdx = (newIdx + totalStories) % totalStories;
    const story = feedbackData[currentStoryIdx];

    // Indices for the 4 surrounding slices
    const farLeftIdx = (currentStoryIdx - 2 + totalStories) % totalStories;
    const nearLeftIdx = (currentStoryIdx - 1 + totalStories) % totalStories;
    const nearRightIdx = (currentStoryIdx + 1) % totalStories;
    const farRightIdx = (currentStoryIdx + 2) % totalStories;

    // Smooth subtle fade transition
    if (cardMetric && cardQuote && cardImage) {
      cardMetric.style.opacity = '0';
      cardMetric.style.transform = 'translateY(6px)';
      cardQuote.style.opacity = '0';
      cardQuote.style.transform = 'translateY(6px)';
      if (cardAuthor) cardAuthor.style.opacity = '0';
      cardImage.style.opacity = '0.3';
      if (mediaTitle) mediaTitle.style.opacity = '0';

      setTimeout(() => {
        cardMetric.textContent = story.metric;
        cardQuote.textContent = story.quote;
        if (cardAuthor) cardAuthor.textContent = story.author;
        if (cardRole) cardRole.textContent = story.role;
        cardImage.src = story.image;
        if (mediaTitle) mediaTitle.textContent = story.mediaTitle;
        if (mediaSubtitle) mediaSubtitle.textContent = story.mediaSubtitle;

        cardMetric.style.opacity = '1';
        cardMetric.style.transform = 'translateY(0)';
        cardQuote.style.opacity = '1';
        cardQuote.style.transform = 'translateY(0)';
        if (cardAuthor) cardAuthor.style.opacity = '1';
        cardImage.style.opacity = '1';
        if (mediaTitle) mediaTitle.style.opacity = '1';
      }, 180);
    }

    // Update surrounding capsules
    if (sliceFarLeft) {
      sliceFarLeft.dataset.index = farLeftIdx;
      const img = sliceFarLeft.querySelector('img');
      if (img) img.src = feedbackData[farLeftIdx].image;
    }
    if (sliceNearLeft) {
      sliceNearLeft.dataset.index = nearLeftIdx;
      const img = sliceNearLeft.querySelector('img');
      if (img) img.src = feedbackData[nearLeftIdx].image;
    }
    if (sliceNearRight) {
      sliceNearRight.dataset.index = nearRightIdx;
      const img = sliceNearRight.querySelector('img');
      if (img) img.src = feedbackData[nearRightIdx].image;
    }
    if (sliceFarRight) {
      sliceFarRight.dataset.index = farRightIdx;
      const img = sliceFarRight.querySelector('img');
      if (img) img.src = feedbackData[farRightIdx].image;
    }

    // Update dots
    dots.forEach((dot, idx) => {
      if (idx === currentStoryIdx) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  // Click on surrounding capsules
  [sliceFarLeft, sliceNearLeft, sliceNearRight, sliceFarRight].forEach(slice => {
    if (slice) {
      slice.addEventListener('click', () => {
        const targetIdx = parseInt(slice.dataset.index, 10);
        if (!isNaN(targetIdx)) {
          updateFeedbackCarousel(targetIdx);
        }
      });
    }
  });

  // Dots navigation
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      updateFeedbackCarousel(idx);
    });
  });

  // Arrow navigation
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      updateFeedbackCarousel(currentStoryIdx - 1);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      updateFeedbackCarousel(currentStoryIdx + 1);
    });
  }

  // Auto-play timer with pause on hover
  let autoPlayTimer = setInterval(() => {
    updateFeedbackCarousel(currentStoryIdx + 1);
  }, 6500);

  if (stage) {
    stage.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
    stage.addEventListener('mouseleave', () => {
      clearInterval(autoPlayTimer);
      autoPlayTimer = setInterval(() => {
        updateFeedbackCarousel(currentStoryIdx + 1);
      }, 6500);
    });
  }

  // ==========================================================================
  // 5. Reference 2: Interactive FAQ Accordion
  // ==========================================================================
  const faqItems = document.querySelectorAll('.faq-accordion-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Close others
        faqItems.forEach(i => i.classList.remove('open'));
        // Toggle current
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });

  // ==========================================================================
  // 6. Reference 2: Real-time Live Clock Display
  // ==========================================================================
  const liveClockDisplay = document.getElementById('liveClockDisplay');

  const updateLiveClock = () => {
    if (!liveClockDisplay) return;
    try {
      const now = new Date();
      // Format in IST (Bengaluru time) or client local
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const timeStr = new Intl.DateTimeFormat('en-US', options).format(now);
      liveClockDisplay.textContent = `Bengaluru, India • ${timeStr}`;
    } catch {
      liveClockDisplay.textContent = 'Bengaluru, India • Active 24/7';
    }
  };

  updateLiveClock();
  setInterval(updateLiveClock, 1000);

  // ==========================================================================
  // 7. Discovery Consultation Modal Logic
  // ==========================================================================
  const consultModal = document.getElementById('consultModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const openConsultModalBtn = document.getElementById('openConsultModalBtn');
  const topBookBtn = document.getElementById('topBookBtn');
  const headerCtaBtn = document.getElementById('headerCtaBtn');
  const heroConsultBtn = document.getElementById('heroConsultBtn');
  const bottomCallBtn = document.getElementById('bottomCallBtn');
  const consultForm = document.getElementById('consultForm');

  const openModal = (e) => {
    if (e) e.preventDefault();
    if (consultModal) {
      consultModal.classList.add('open');
      document.body.style.overflow = 'hidden';
      const firstInput = consultModal.querySelector('input');
      if (firstInput) firstInput.focus();
    }
  };

  const closeModal = () => {
    if (consultModal) {
      consultModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  [openConsultModalBtn, topBookBtn, headerCtaBtn, heroConsultBtn, bottomCallBtn].forEach(btn => {
    if (btn) btn.addEventListener('click', openModal);
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

  if (consultModal) {
    consultModal.addEventListener('click', (e) => {
      if (e.target === consultModal) closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && consultModal && consultModal.classList.contains('open')) {
      closeModal();
    }
  });

  if (consultForm) {
    consultForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = consultForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.textContent = 'Securing Session...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = '✓ Session Confirmed! Check Your Inbox.';
        submitBtn.style.background = '#053D58';

        setTimeout(() => {
          closeModal();
          consultForm.reset();
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
        }, 2200);
      }, 1000);
    });
  }

  // ==========================================================================
  // 8. Ambient Soundscape Audio Controller Integration
  // ==========================================================================
  const audioToggleBtn = document.getElementById('audioToggleBtn');
  const audioBtnText = document.getElementById('audioBtnText');

  if (audioToggleBtn && window.CinematicSound) {
    audioToggleBtn.addEventListener('click', () => {
      const isPlaying = window.CinematicSound.toggle();
      if (isPlaying) {
        audioToggleBtn.classList.add('playing');
        if (audioBtnText) audioBtnText.textContent = 'Sound On';
      } else {
        audioToggleBtn.classList.remove('playing');
        if (audioBtnText) audioBtnText.textContent = 'Sound';
      }
    });

    window.addEventListener('scroll', () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
      window.CinematicSound.updateScrollReaction(progress);
    }, { passive: true });
  }

  // ==========================================================================
  // 9. Intersection Observer for Smooth Visual Reveals (Zero Hover Conflict)
  // ==========================================================================
  const animatedBlocks = document.querySelectorAll(
    '.metric-ref1-card, .capability-ref1-box, .feedback-center-card, .faq-accordion-item, .ref3-feature-card, .ref3-metric-card'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
        // Clear inline properties after entrance so pure CSS hover transitions execute with zero conflicts
        setTimeout(() => {
          entry.target.style.transform = '';
          entry.target.style.transition = '';
        }, 650);
      }
    });
  }, { threshold: 0.1 });

  animatedBlocks.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s var(--ease-smooth), transform 0.6s var(--ease-smooth)';
    revealObserver.observe(el);
  });

  // ==========================================================================
  // 10. Reference 3: Interactive Stage Tracker (Left Pinned Reaction)
  // ==========================================================================
  const ref3Cards = document.querySelectorAll('.ref3-feature-card');
  const ref3MetricsGrid = document.querySelector('.ref3-metrics-grid');
  const ref3StageBanner = document.querySelector('.ref3-stage-banner');

  if (ref3Cards.length > 0 && ref3StageBanner) {
    const cardFocusObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-focus');
        } else {
          entry.target.classList.remove('in-focus');
        }
      });
    }, { threshold: 0.5 });

    ref3Cards.forEach(c => cardFocusObserver.observe(c));

    if (ref3MetricsGrid) {
      const metricsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            ref3StageBanner.style.borderColor = 'var(--blue-primary)';
            ref3StageBanner.style.background = 'rgba(37, 99, 235, 0.14)';
          } else {
            ref3StageBanner.style.borderColor = '';
            ref3StageBanner.style.background = '';
          }
        });
      }, { threshold: 0.3 });
      metricsObserver.observe(ref3MetricsGrid);
    }
  }
});
