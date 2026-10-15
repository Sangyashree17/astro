/**
 * ISHVARA TECH CONSULTING — MASTER CINEMATIC CONTROLLER
 * High-Performance 211-Frame Animation Engine with Responsive Bi-Directional Scroll
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const TOTAL_FRAMES = 211;
  const canvas = document.getElementById('cinematicCanvas');
  const ctx = canvas ? canvas.getContext('2d', { alpha: false }) : null;
  const preloader = document.getElementById('cinematicPreloader');
  const preloaderBar = document.getElementById('preloaderBar');
  const preloaderText = document.getElementById('preloaderText');
  const hudFrameReadout = document.getElementById('hudFrameReadout');
  const hudPips = document.querySelectorAll('.hud-pip');
  const siteNav = document.getElementById('siteNav');

  // Exact 6-Stage Editorial Sequence
  const stages = [
    { id: 'stage-hero', min: 0.00, max: 0.16 },
    { id: 'stage-philosophy', min: 0.18, max: 0.33 },
    { id: 'stage-capabilities', min: 0.35, max: 0.52 },
    { id: 'stage-products', min: 0.54, max: 0.72 },
    { id: 'stage-approach', min: 0.74, max: 0.88 },
    { id: 'stage-final-cta', min: 0.90, max: 1.00 }
  ];

  const stageElements = stages.map(s => ({
    ...s,
    el: document.getElementById(s.id)
  }));

  // Frame Cache & State
  const frames = new Array(TOTAL_FRAMES);
  const loadingPromises = new Map();
  let loadedCount = 0;
  let isInitialLoaded = false;
  let currentRenderedIndex = -1;
  let targetRequestedIndex = 0;

  // Formatted filename generator
  function getFrameSrc(index) {
    const padded = String(index + 1).padStart(3, '0');
    return `assets/ezgif-frame-${padded}.jpg`;
  }

  // Load a single frame with caching and immediate dispatch
  function loadFrame(i) {
    if (i < 0 || i >= TOTAL_FRAMES) return Promise.resolve(null);
    if (frames[i] && frames[i].complete) return Promise.resolve(frames[i]);
    if (loadingPromises.has(i)) return loadingPromises.get(i);

    const promise = new Promise((resolve) => {
      const img = new Image();
      img.src = getFrameSrc(i);

      img.onload = () => {
        frames[i] = img;
        loadedCount++;
        updateProgress();

        // If the user's scroll position is currently waiting for this frame, render immediately!
        if (Math.abs(targetRequestedIndex - i) <= 1) {
          drawCoverImage(img);
          currentRenderedIndex = i;
        }
        resolve(img);
      };

      img.onerror = () => {
        resolve(null);
      };
    });

    loadingPromises.set(i, promise);
    return promise;
  }

  // Canvas Sizing with HiDPI support
  function resizeCanvas() {
    if (!canvas || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    if (currentRenderedIndex >= 0 && frames[currentRenderedIndex]) {
      drawCoverImage(frames[currentRenderedIndex]);
    }
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Draw Cover Image with crisp aspect ratio preservation
  function drawCoverImage(img) {
    if (!canvas || !ctx || !img || !img.complete) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth || 1920;
    const ih = img.naturalHeight || 1080;

    const imgRatio = iw / ih;
    const canvasRatio = cw / ch;

    let renderW, renderH, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      renderW = cw;
      renderH = cw / imgRatio;
      offsetX = 0;
      offsetY = (ch - renderH) / 2;
    } else {
      renderW = ch * imgRatio;
      renderH = ch;
      offsetX = (cw - renderW) / 2;
      offsetY = 0;
    }

    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
  }

  // Render Frame with immediate nearest fallback and lookahead prefetching
  function renderFrame(index) {
    if (!canvas || !ctx) return;
    targetRequestedIndex = index;

    // Prioritize loading target frame and adjacent frames
    loadFrame(index);
    if (index + 1 < TOTAL_FRAMES) loadFrame(index + 1);
    if (index + 2 < TOTAL_FRAMES) loadFrame(index + 2);
    if (index - 1 >= 0) loadFrame(index - 1);

    let targetImg = frames[index];

    // If target frame is already loaded, draw it directly
    if (targetImg && targetImg.complete) {
      if (currentRenderedIndex !== index) {
        drawCoverImage(targetImg);
        currentRenderedIndex = index;
      }
      return;
    }

    // Otherwise, find the closest loaded frame to keep display continuous
    let closestDistance = Infinity;
    let closestImg = null;
    let closestIndex = -1;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      if (frames[i] && frames[i].complete) {
        const dist = Math.abs(i - index);
        if (dist < closestDistance) {
          closestDistance = dist;
          closestImg = frames[i];
          closestIndex = i;
        }
      }
    }

    if (closestImg && closestIndex !== currentRenderedIndex) {
      drawCoverImage(closestImg);
      currentRenderedIndex = closestIndex;
    }
  }

  // Progress readout updater
  function updateProgress() {
    const pct = Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100));
    if (preloaderBar) preloaderBar.style.width = `${pct}%`;
    if (preloaderText) preloaderText.textContent = `LOADING ASSETS // ${pct}%`;
  }

  // Instant First Paint & Progressive Keyframe Stride Engine
  function initPreloader() {
    // 1. Instant reveal: load Frame 0 first and reveal site in < 200ms
    loadFrame(0).then((firstImg) => {
      if (firstImg) {
        drawCoverImage(firstImg);
        currentRenderedIndex = 0;
      }
      isInitialLoaded = true;
      if (preloaderBar) preloaderBar.style.width = '100%';

      // Immediate smooth reveal
      setTimeout(() => {
        if (preloader) preloader.classList.add('loaded');
      }, 160);

      // 2. Progressive Stride: Load every 6th frame first (~35 keyframes)
      // This immediately covers the entire 100% scroll path
      const keyframes = [];
      for (let i = 6; i < TOTAL_FRAMES; i += 6) {
        keyframes.push(i);
      }
      if (!keyframes.includes(TOTAL_FRAMES - 1)) keyframes.push(TOTAL_FRAMES - 1);

      const keyframePromises = keyframes.map(idx => loadFrame(idx));

      Promise.all(keyframePromises).then(() => {
        // 3. Background filling of all intermediate frames with polite batching
        const remaining = [];
        for (let i = 1; i < TOTAL_FRAMES; i++) {
          if (!keyframes.includes(i)) remaining.push(i);
        }

        let cur = 0;
        const BATCH_SIZE = 12;
        function loadNextRemaining() {
          if (cur >= remaining.length) return;
          const chunk = [];
          for (let j = 0; j < BATCH_SIZE && cur < remaining.length; j++, cur++) {
            chunk.push(loadFrame(remaining[cur]));
          }
          Promise.all(chunk).then(() => {
            setTimeout(loadNextRemaining, 16);
          });
        }
        loadNextRemaining();
      });
    });

    // Hard fallback: preloader never blocks the user for more than 1s
    setTimeout(() => {
      if (preloader && !preloader.classList.contains('loaded')) {
        preloader.classList.add('loaded');
      }
    }, 1000);
  }

  initPreloader();

  // =========================================================================
  // SCROLL-LINKED ANIMATION ENGINE (FAST & RESPONSIVE LERP)
  // =========================================================================
  let targetProgress = 0;
  let smoothProgress = 0;
  let isTicking = false;

  function calculateScrollProgress() {
    const scrollY = window.scrollY || window.pageYOffset;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return 0;
    return Math.min(1, Math.max(0, scrollY / maxScroll));
  }

  // Responsive event listener on window
  window.addEventListener('scroll', () => {
    targetProgress = calculateScrollProgress();
    if (!isTicking) {
      isTicking = true;
      requestAnimationFrame(updateLoop);
    }
  }, { passive: true });

  // Direct wheel assist for ultra-responsive frame changes
  window.addEventListener('wheel', () => {
    targetProgress = calculateScrollProgress();
    if (!isTicking) {
      isTicking = true;
      requestAnimationFrame(updateLoop);
    }
  }, { passive: true });

  function updateLoop() {
    const delta = targetProgress - smoothProgress;
    // Responsive interpolation factor (0.24 for crisp, immediate tracking)
    smoothProgress += delta * 0.24;

    if (Math.abs(delta) < 0.0003) {
      smoothProgress = targetProgress;
      isTicking = false;
    } else {
      requestAnimationFrame(updateLoop);
    }

    // Map progress to exact frame index 0-210
    const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(smoothProgress * (TOTAL_FRAMES - 1))));
    renderFrame(frameIndex);

    // Update HUD Frame Readout on each scroll movement
    if (hudFrameReadout) {
      hudFrameReadout.textContent = `${String(frameIndex + 1).padStart(3, '0')} // 211`;
    }

    // Update Stage Visibility
    stageElements.forEach((stage, idx) => {
      if (!stage.el) return;
      const isActive = smoothProgress >= stage.min && smoothProgress <= stage.max;
      stage.el.classList.toggle('active', isActive);

      if (hudPips[idx]) {
        hudPips[idx].classList.toggle('active', isActive);
      }
    });

    // Nav Bar Scrolled styling
    if (siteNav) {
      siteNav.classList.toggle('scrolled', window.scrollY > 40);
    }

    // Dynamic Ambient Sound Filter Reaction
    if (window.CinematicSound) {
      window.CinematicSound.updateScrollReaction(smoothProgress);
    }
  }

  // Render initial frame
  updateLoop();

  // =========================================================================
  // TOP-RIGHT SOOTHING AMBIENT SOUND CONTROLLER
  // =========================================================================
  const soundBtn = document.getElementById('soundToggleBtn');
  const soundStatusText = document.getElementById('soundStatusText');

  if (soundBtn && window.CinematicSound) {
    soundBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isPlaying = window.CinematicSound.toggle();
      if (isPlaying) {
        soundBtn.classList.add('active');
        if (soundStatusText) soundStatusText.textContent = 'Sound On';
      } else {
        soundBtn.classList.remove('active');
        if (soundStatusText) soundStatusText.textContent = 'Sound Off';
      }
    });
  }

  // Debug Hook
  window.__cinematicEngine = {
    getLoadedCount: () => loadedCount,
    getCurrentRenderedFrame: () => currentRenderedIndex,
    getTargetIndex: () => targetRequestedIndex,
    getSmoothProgress: () => smoothProgress
  };

  // =========================================================================
  // MODAL INQUIRY CONTROLLER
  // =========================================================================
  const modal = document.getElementById('contactModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const openBtns = document.querySelectorAll('.open-modal-trigger');
  const contactForm = document.getElementById('contactForm');

  function openModal() {
    if (modal) {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.innerHTML = '<span>Transmitting...</span>';
        submitBtn.disabled = true;
      }
      setTimeout(() => {
        contactForm.innerHTML = `
          <div style="text-align: center; padding: 2rem 0;">
            <div style="width: 44px; height: 44px; border-radius: 50%; background: #0DDAFF; color: #040714; font-size: 1.3rem; display: inline-flex; align-items: center; justify-content: center; font-weight: 700; margin-bottom: 1rem;">✓</div>
            <h3 style="font-family: var(--font-serif); font-size: 1.8rem; color: #fff; margin-bottom: 0.5rem;">Transmission Received</h3>
            <p style="color: rgba(255,255,255,0.7); font-size: 0.88rem;">An Ishvara Tech Principal Consultant will review your inquiry within 24 hours.</p>
          </div>
        `;
        setTimeout(() => closeModal(), 3000);
      }, 700);
    });
  }

  // Smooth Scroll Trigger Helper
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#contact') return;

      const targetEl = document.querySelector(href);
      if (targetEl) {
        e.preventDefault();
        const stageMatch = stageElements.find(s => s.id === href.substring(1));
        if (stageMatch) {
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          const targetY = stageMatch.min * maxScroll + 20;
          window.scrollTo({ top: targetY, behavior: 'smooth' });
        }
      }
    });
  });

});
