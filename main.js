/**
 * Ishvara Tech Consulting — Cinematic Scroll-Driven Experience
 * Continuous Scroll-Based Storytelling Engine: 9 Synchronized Stages
 * + Section 3: 3D Rotating Wireframe & Feature Cards Showcase
 */

(function () {
  'use strict';

  // =========================================================================
  // Section 1 Constants & State (Chrome Hands & Logo — 179 frames)
  // =========================================================================
  const S1_START = 73;
  const S1_END = 251;
  const S1_TOTAL = S1_END - S1_START + 1; // 179 frames
  const S1_PATH = 'Assets/';

  const canvas1 = document.getElementById('heroCanvas');
  const ctx1 = canvas1.getContext('2d', { alpha: false });
  const heroContainer = document.getElementById('heroContainer');
  const scrollCue = document.getElementById('scrollCue');
  const loadingOverlay = document.getElementById('loadingOverlay');
  const s1TrackerLabel = document.getElementById('s1TrackerLabel');

  const statementsS1 = [
    { el: document.getElementById('s1-stage-0'), inStart: 0.0, inEnd: 0.0, outStart: 0.12, outEnd: 0.18 },
    { el: document.getElementById('s1-stage-1'), inStart: 0.18, inEnd: 0.24, outStart: 0.34, outEnd: 0.40 },
    { el: document.getElementById('s1-stage-2'), inStart: 0.40, inEnd: 0.46, outStart: 0.56, outEnd: 0.62 },
    { el: document.getElementById('s1-stage-3'), inStart: 0.62, inEnd: 0.68, outStart: 0.78, outEnd: 0.84 },
    { el: document.getElementById('s1-stage-4'), inStart: 0.84, inEnd: 0.90, outStart: 1.02, outEnd: 1.05 }
  ];

  const imagesS1 = new Array(S1_TOTAL);
  let targetProgress1 = 0;
  let currentProgress1 = 0;
  let lastRenderedS1 = -1;
  let isInitialS1Rendered = false;

  // =========================================================================
  // Section 2 Constants & State (Floating Chip & Motherboard — 169 frames)
  // =========================================================================
  const S2_START = 73;
  const S2_END = 241;
  const S2_TOTAL = S2_END - S2_START + 1; // 169 frames
  const S2_PATH = 'Assets/New%20folder/';

  const canvas2 = document.getElementById('section2Canvas');
  const ctx2 = canvas2.getContext('2d', { alpha: false });
  const section2Container = document.getElementById('section2Container');
  const s2TrackerLabel = document.getElementById('s2TrackerLabel');

  const statementsS2 = [
    { el: document.getElementById('s2-stage-5'), inStart: 0.02, inEnd: 0.08, outStart: 0.20, outEnd: 0.26 },
    { el: document.getElementById('s2-stage-6'), inStart: 0.26, inEnd: 0.32, outStart: 0.44, outEnd: 0.50 },
    { el: document.getElementById('s2-stage-7'), inStart: 0.50, inEnd: 0.56, outStart: 0.68, outEnd: 0.74 },
    { el: document.getElementById('s2-stage-8'), inStart: 0.74, inEnd: 0.80, outStart: 1.02, outEnd: 1.05 }
  ];

  const imagesS2 = new Array(S2_TOTAL);
  let targetProgress2 = 0;
  let currentProgress2 = 0;
  let lastRenderedS2 = -1;
  let isInitialS2Rendered = false;

  // =========================================================================
  // Section 3 Constants & State (3D Orbiting Feature Carousel — 9 Storyboard States)
  // =========================================================================
  const section3Container = document.getElementById('section3Container');
  const orbitContainer = document.getElementById('orbitContainer');
  const orbitCards = document.querySelectorAll('.orbit-card');
  const s3TrackerCounter = document.getElementById('s3TrackerCounter');
  const s3TrackerLabel = document.getElementById('s3TrackerLabel');
  const indicatorPips = document.querySelectorAll('#s3NavIndicator .indicator-pip');

  let targetProgress3 = 0;
  let currentProgress3 = 0;

  // The 9 Storyboard States (1-to-1 match with reference storyboard)
  const STORYBOARD_STATES = [
    { id: 1, name: 'INITIAL STATE', label: 'INITIAL ORBIT' },
    { id: 2, name: 'CARD 1 MOVES TO FRONT', label: 'AI PRODUCTS APPROACH' },
    { id: 3, name: 'CARD 1 — FULL VIEW', label: 'INTELLIGENCE, MADE USEFUL' },
    { id: 4, name: 'CARD 2 MOVES TO FRONT', label: 'ENGINEERING APPROACH' },
    { id: 5, name: 'CARD 2 — FULL VIEW', label: 'BUILT FOR WHAT COMES NEXT' },
    { id: 6, name: 'CARD 3 MOVES TO FRONT', label: 'AUTOMATION APPROACH' },
    { id: 7, name: 'CARD 3 — FULL VIEW', label: 'LESS REPETITION. MORE POSSIBILITY' },
    { id: 8, name: 'CARD 4 MOVES TO FRONT', label: 'EXPERIENCE APPROACH' },
    { id: 9, name: 'CARD 4 — FULL VIEW', label: 'DESIGNED TO MAKE SENSE' }
  ];

  // Normalized scroll checkpoints for the 9 states
  const STATE_CHECKPOINTS = [0.00, 0.16, 0.29, 0.42, 0.55, 0.68, 0.81, 0.92, 1.00];

  // Storyboard scroll intervals with comfortable resting plateaus at each state
  const STORYBOARD_SEGMENTS = [
    { pStart: 0.00, pEnd: 0.04, state: 0, hold: true },
    { pStart: 0.04, pEnd: 0.14, from: 0, to: 1 },
    { pStart: 0.14, pEnd: 0.18, state: 1, hold: true },
    { pStart: 0.18, pEnd: 0.26, from: 1, to: 2 },
    { pStart: 0.26, pEnd: 0.32, state: 2, hold: true },
    { pStart: 0.32, pEnd: 0.40, from: 2, to: 3 },
    { pStart: 0.40, pEnd: 0.44, state: 3, hold: true },
    { pStart: 0.44, pEnd: 0.52, from: 3, to: 4 },
    { pStart: 0.52, pEnd: 0.58, state: 4, hold: true },
    { pStart: 0.58, pEnd: 0.66, from: 4, to: 5 },
    { pStart: 0.66, pEnd: 0.70, state: 5, hold: true },
    { pStart: 0.70, pEnd: 0.78, from: 5, to: 6 },
    { pStart: 0.78, pEnd: 0.84, state: 6, hold: true },
    { pStart: 0.84, pEnd: 0.90, from: 6, to: 7 },
    { pStart: 0.90, pEnd: 0.94, state: 7, hold: true },
    { pStart: 0.94, pEnd: 0.98, from: 7, to: 8 },
    { pStart: 0.98, pEnd: 1.00, state: 8, hold: true }
  ];

  // 3D Card Orbit Keyframes for each state (card 0..3)
  const STATE_CARD_KEYFRAMES = [
    // State 01: Initial State (All 4 cards in orbit around central processor)
    [
      { x: -220, y: 0, z: -40, rotY: 16, scale: 0.80, opacity: 0.85, fullView: 0 },
      { x: -440, y: -10, z: -150, rotY: 26, scale: 0.62, opacity: 0.62, fullView: 0 },
      { x: 260, y: -20, z: -210, rotY: -22, scale: 0.54, opacity: 0.48, fullView: 0 },
      { x: 440, y: 0, z: -80, rotY: -25, scale: 0.68, opacity: 0.70, fullView: 0 }
    ],
    // State 02: Card 1 Moves to Front
    [
      { x: -55, y: -5, z: 25, rotY: 4, scale: 0.94, opacity: 0.98, fullView: 0.35 },
      { x: -460, y: -5, z: -130, rotY: 25, scale: 0.64, opacity: 0.64, fullView: 0 },
      { x: 420, y: -10, z: -160, rotY: -24, scale: 0.60, opacity: 0.58, fullView: 0 },
      { x: 200, y: -20, z: -230, rotY: -18, scale: 0.50, opacity: 0.38, fullView: 0 }
    ],
    // State 03: Card 1 — Full View (Locked Foreground Center)
    [
      { x: 0, y: -10, z: 80, rotY: 0, scale: 1.0, opacity: 1.0, fullView: 1.0 },
      { x: -470, y: 0, z: -120, rotY: 25, scale: 0.65, opacity: 0.65, fullView: 0 },
      { x: 470, y: 0, z: -120, rotY: -25, scale: 0.65, opacity: 0.65, fullView: 0 },
      { x: 0, y: -25, z: -260, rotY: 0, scale: 0.44, opacity: 0.22, fullView: 0 }
    ],
    // State 04: Card 2 Moves to Front
    [
      { x: -320, y: 0, z: -50, rotY: 18, scale: 0.75, opacity: 0.78, fullView: 0 },
      { x: -55, y: -5, z: 25, rotY: 4, scale: 0.94, opacity: 0.98, fullView: 0.35 },
      { x: 470, y: 0, z: -120, rotY: -25, scale: 0.65, opacity: 0.65, fullView: 0 },
      { x: 180, y: -20, z: -230, rotY: -16, scale: 0.50, opacity: 0.38, fullView: 0 }
    ],
    // State 05: Card 2 — Full View (Locked Foreground Center)
    [
      { x: -470, y: 0, z: -120, rotY: 25, scale: 0.65, opacity: 0.65, fullView: 0 },
      { x: 0, y: -10, z: 80, rotY: 0, scale: 1.0, opacity: 1.0, fullView: 1.0 },
      { x: 470, y: 0, z: -120, rotY: -25, scale: 0.65, opacity: 0.65, fullView: 0 },
      { x: 0, y: -25, z: -260, rotY: 0, scale: 0.44, opacity: 0.22, fullView: 0 }
    ],
    // State 06: Card 3 Moves to Front
    [
      { x: -380, y: -20, z: -210, rotY: 20, scale: 0.52, opacity: 0.38, fullView: 0 },
      { x: -320, y: 0, z: -50, rotY: 18, scale: 0.75, opacity: 0.78, fullView: 0 },
      { x: 55, y: -5, z: 25, rotY: -4, scale: 0.94, opacity: 0.98, fullView: 0.35 },
      { x: 470, y: 0, z: -120, rotY: -25, scale: 0.65, opacity: 0.65, fullView: 0 }
    ],
    // State 07: Card 3 — Full View (Locked Foreground Center)
    [
      { x: 0, y: -25, z: -260, rotY: 0, scale: 0.44, opacity: 0.22, fullView: 0 },
      { x: -470, y: 0, z: -120, rotY: 25, scale: 0.65, opacity: 0.65, fullView: 0 },
      { x: 0, y: -10, z: 80, rotY: 0, scale: 1.0, opacity: 1.0, fullView: 1.0 },
      { x: 470, y: 0, z: -120, rotY: -25, scale: 0.65, opacity: 0.65, fullView: 0 }
    ],
    // State 08: Card 4 Moves to Front
    [
      { x: 360, y: -20, z: -210, rotY: -20, scale: 0.52, opacity: 0.38, fullView: 0 },
      { x: -380, y: -20, z: -200, rotY: 20, scale: 0.52, opacity: 0.38, fullView: 0 },
      { x: -320, y: 0, z: -50, rotY: 18, scale: 0.75, opacity: 0.78, fullView: 0 },
      { x: 55, y: -5, z: 25, rotY: -4, scale: 0.94, opacity: 0.98, fullView: 0.35 }
    ],
    // State 09: Card 4 — Full View (Locked Foreground Center)
    [
      { x: 470, y: 0, z: -130, rotY: -25, scale: 0.62, opacity: 0.55, fullView: 0 },
      { x: 0, y: -25, z: -260, rotY: 0, scale: 0.44, opacity: 0.22, fullView: 0 },
      { x: -470, y: 0, z: -120, rotY: 25, scale: 0.65, opacity: 0.65, fullView: 0 },
      { x: 0, y: -10, z: 80, rotY: 0, scale: 1.0, opacity: 1.0, fullView: 1.0 }
    ]
  ];

  // Modal elements
  const cardModal = document.getElementById('cardModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalActionClose = document.getElementById('modalActionClose');
  const modalWireframeSlot = document.getElementById('modalWireframeSlot');
  const modalCategory = document.getElementById('modalCategory');
  const modalNumber = document.getElementById('modalNumber');
  const modalHeadline = document.getElementById('modalHeadline');
  const modalLead = document.getElementById('modalLead');
  const modalFeatures = document.getElementById('modalFeatures');

  let isModalOpen = false;

  const cardDetails = [
    {
      category: 'AI PRODUCTS',
      number: '01',
      tracker: 'AI PRODUCTS',
      headline: 'Intelligence, Made Useful.',
      lead: 'AI-powered products designed to transform complex workflows into intuitive digital experiences.',
      features: [
        'Dynamic multi-agent reasoning systems tuned for enterprise workflows.',
        'Zero-latency edge intelligence with resilient fallbacks and governance.',
        'Empathetic human-AI interface models that reduce cognitive overhead.'
      ],
      wireframe: `<svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="110" y1="110" x2="110" y2="38" stroke="rgba(0, 229, 255, 0.6)" stroke-width="1.2"/><line x1="110" y1="110" x2="176" y2="76" stroke="rgba(0, 229, 255, 0.6)" stroke-width="1.2"/><line x1="110" y1="110" x2="176" y2="146" stroke="rgba(0, 229, 255, 0.6)" stroke-width="1.2"/><line x1="110" y1="110" x2="110" y2="182" stroke="rgba(0, 229, 255, 0.6)" stroke-width="1.2"/><line x1="110" y1="110" x2="44" y2="146" stroke="rgba(0, 229, 255, 0.6)" stroke-width="1.2"/><line x1="110" y1="110" x2="44" y2="76" stroke="rgba(0, 229, 255, 0.6)" stroke-width="1.2"/><polygon points="110,38 176,76 176,146 110,182 44,146 44,76" stroke="rgba(0, 229, 255, 0.35)" stroke-width="1" stroke-dasharray="3 3"/><circle cx="110" cy="110" r="30" stroke="rgba(0, 229, 255, 0.32)" stroke-width="1" stroke-dasharray="4 4"/><circle cx="110" cy="38" r="6" fill="#00e5ff"/><circle cx="176" cy="76" r="6" fill="#00e5ff"/><circle cx="176" cy="146" r="6" fill="#00e5ff"/><circle cx="110" cy="182" r="6" fill="#00e5ff"/><circle cx="44" cy="146" r="6" fill="#00e5ff"/><circle cx="44" cy="76" r="6" fill="#00e5ff"/><circle cx="110" cy="110" r="12" fill="#00e5ff" stroke="#ffffff" stroke-width="2"/></svg>`
    },
    {
      category: 'ENGINEERING',
      number: '02',
      tracker: 'PRODUCT ENGINEERING',
      headline: 'Built for What Comes Next.',
      lead: 'Scalable digital platforms and connected systems engineered around real business needs.',
      features: [
        'Resilient distributed architectures built with micro-kernel modularity.',
        'Real-time streaming telemetry and event-driven state synchronizers.',
        'Continuous performance benchmarking ensuring sub-millisecond execution.'
      ],
      wireframe: `<svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="110,165 175,190 110,215 45,190" stroke="rgba(0, 229, 255, 0.55)" stroke-width="1.2" fill="rgba(0, 229, 255, 0.05)"/><polygon points="110,135 175,160 110,185 45,160" stroke="rgba(0, 229, 255, 0.7)" stroke-width="1.2" fill="rgba(0, 229, 255, 0.07)"/><polygon points="110,105 175,130 110,155 45,130" stroke="rgba(0, 229, 255, 0.9)" stroke-width="1.3" fill="rgba(0, 229, 255, 0.1)"/><polygon points="110,32 148,50 110,68 72,50" stroke="#00e5ff" stroke-width="1.6" fill="rgba(0, 229, 255, 0.25)"/><polygon points="72,50 110,68 110,106 72,88" stroke="#00e5ff" stroke-width="1.6" fill="rgba(0, 160, 240, 0.18)"/><polygon points="110,68 148,50 148,88 110,106" stroke="#00e5ff" stroke-width="1.6" fill="rgba(0, 100, 200, 0.22)"/><circle cx="110" cy="68" r="4.5" fill="#ffffff"/></svg>`
    },
    {
      category: 'AUTOMATION',
      number: '03',
      tracker: 'INTELLIGENT AUTOMATION',
      headline: 'Less Repetition. More Possibility.',
      lead: 'Intelligent workflows that simplify operations and help teams move faster.',
      features: [
        'Cognitive process mining that detects and untangles operational friction.',
        'Automated document and multi-modal pipeline execution with high precision.',
        'Zero-interruption cloud orchestrations that scale horizontally on demand.'
      ],
      wireframe: `<svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="45" y1="110" x2="75" y2="110" stroke="rgba(0, 229, 255, 0.9)" stroke-width="1.6"/><path d="M115 100 L115 65 Q115 60 120 60 L140 60" stroke="rgba(0, 229, 255, 0.8)" stroke-width="1.6" fill="none"/><path d="M115 120 L115 155 Q115 160 120 160 L140 160" stroke="rgba(0, 229, 255, 0.8)" stroke-width="1.6" fill="none"/><rect x="25" y="96" width="28" height="28" rx="6" stroke="#00e5ff" stroke-width="1.5" fill="rgba(0, 229, 255, 0.12)"/><rect x="75" y="92" width="45" height="36" rx="8" stroke="#00e5ff" stroke-width="1.6" fill="rgba(0, 229, 255, 0.2)"/><rect x="140" y="44" width="42" height="32" rx="6" stroke="rgba(0, 229, 255, 0.9)" stroke-width="1.4" fill="rgba(0, 229, 255, 0.15)"/><rect x="140" y="144" width="42" height="32" rx="6" stroke="rgba(0, 229, 255, 0.9)" stroke-width="1.4" fill="rgba(0, 229, 255, 0.15)"/><circle cx="192" cy="110" r="10" stroke="#00e5ff" stroke-width="1.6" fill="rgba(0, 229, 255, 0.25)"/></svg>`
    },
    {
      category: 'EXPERIENCE DESIGN',
      number: '04',
      tracker: 'EXPERIENCE DESIGN',
      headline: 'Designed to Make Sense.',
      lead: 'Thoughtful user experiences that make complex products intuitive and accessible.',
      features: [
        'Information architecture optimized for expert workflows and mission-critical decisions.',
        'Bespoke micro-interactions and tactile feedback establishing product trust.',
        'Design systems governed by accessibility, clarity, and enduring aesthetic dignity.'
      ],
      wireframe: `<svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="25" y="35" width="170" height="150" rx="10" stroke="#00e5ff" stroke-width="1.5" fill="rgba(3, 12, 32, 0.75)"/><line x1="25" y1="62" x2="195" y2="62" stroke="rgba(0, 229, 255, 0.35)" stroke-width="1"/><circle cx="42" cy="49" r="3" fill="#00e5ff"/><circle cx="53" cy="49" r="3" fill="#00e5ff"/><circle cx="64" cy="49" r="3" fill="#00e5ff"/><rect x="38" y="75" width="62" height="52" rx="6" stroke="rgba(0, 229, 255, 0.75)" stroke-width="1.2"/><line x1="112" y1="82" x2="180" y2="82" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round"/><rect x="38" y="148" width="22" height="22" rx="5" stroke="#00e5ff" stroke-width="1.4"/></svg>`
    }
  ];

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // =========================================================================
  // Filename Resolvers
  // =========================================================================
  function getS1Filename(index) {
    const num = S1_START + index;
    const padded = String(num).padStart(3, '0');
    return `${S1_PATH}ezgif-frame-${padded}.jpg`;
  }

  function getS2Filename(index) {
    const num = S2_START + index;
    const padded = String(num).padStart(3, '0');
    return `${S2_PATH}ezgif-frame-${padded}.jpg`;
  }

  // =========================================================================
  // Responsive Canvas Sizing (HiDPI / Retina)
  // =========================================================================
  function resizeCanvases() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayW = window.innerWidth;
    const displayH = window.innerHeight;
    const pixelW = Math.round(displayW * dpr);
    const pixelH = Math.round(displayH * dpr);

    if (canvas1.width !== pixelW || canvas1.height !== pixelH) {
      canvas1.width = pixelW;
      canvas1.height = pixelH;
      lastRenderedS1 = -1;
    }

    if (canvas2.width !== pixelW || canvas2.height !== pixelH) {
      canvas2.width = pixelW;
      canvas2.height = pixelH;
      lastRenderedS2 = -1;
    }
  }

  // =========================================================================
  // Aspect-Ratio Cover Fitting
  // =========================================================================
  function drawCover(ctx, canvas, img) {
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const w = canvas.width;
    const h = canvas.height;
    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;
    const imgRatio = imgW / imgH;
    const canvasRatio = w / h;

    let drawW, drawH, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawW = w;
      drawH = Math.round(w / imgRatio);
      offsetX = 0;
      offsetY = Math.round((h - drawH) / 2);
    } else {
      drawH = h;
      drawW = Math.round(h * imgRatio);
      offsetX = Math.round((w - drawW) / 2);
      offsetY = 0;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
  }

  // =========================================================================
  // Nearest-Neighbor Loaded Frame Fallback (Zero Flicker)
  // =========================================================================
  function getBestAvailableFrame(imagesArray, total, targetIndex) {
    if (imagesArray[targetIndex] && imagesArray[targetIndex].complete) {
      return imagesArray[targetIndex];
    }

    for (let i = targetIndex - 1; i >= 0; i--) {
      if (imagesArray[i] && imagesArray[i].complete) {
        return imagesArray[i];
      }
    }

    for (let i = targetIndex + 1; i < total; i++) {
      if (imagesArray[i] && imagesArray[i].complete) {
        return imagesArray[i];
      }
    }

    return null;
  }

  // Smoothstep easing helper
  function smoothstep(min, max, value) {
    const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
    return x * x * (3 - 2 * x);
  }

  // =========================================================================
  // Compute Opacity and Positional Easing
  // =========================================================================
  function computeStageStyle(progress, config) {
    const { inStart, inEnd, outStart, outEnd } = config;

    if (progress < inStart || progress > outEnd) {
      return { opacity: 0, translateY: progress < inStart ? 16 : -16, visible: false };
    }

    if (inStart === inEnd && inStart === 0.0) {
      if (progress <= outStart) {
        return { opacity: 1, translateY: 0, visible: true };
      }
      const t = smoothstep(outStart, outEnd, progress);
      return {
        opacity: 1 - t,
        translateY: -t * 16,
        visible: t < 1
      };
    }

    if (progress < inEnd) {
      const t = smoothstep(inStart, inEnd, progress);
      return {
        opacity: t,
        translateY: (1 - t) * 16,
        visible: true
      };
    }

    if (progress <= outStart) {
      return { opacity: 1, translateY: 0, visible: true };
    }

    const t = smoothstep(outStart, outEnd, progress);
    return {
      opacity: 1 - t,
      translateY: -t * 16,
      visible: t < 1
    };
  }

  // =========================================================================
  // Update Statement List Visibility and Transforms
  // =========================================================================
  function updateStatements(statementsList, progress) {
    for (let i = 0; i < statementsList.length; i++) {
      const config = statementsList[i];
      const style = computeStageStyle(progress, config);
      const el = config.el;
      if (!el) continue;

      if (!style.visible && style.opacity === 0) {
        if (el.style.opacity !== '0') {
          el.style.opacity = '0';
          el.style.visibility = 'hidden';
          el.style.transform = prefersReducedMotion 
            ? 'none' 
            : `translate3d(0, ${style.translateY.toFixed(1)}px, 0)`;
        }
      } else {
        el.style.visibility = 'visible';
        el.style.opacity = style.opacity.toFixed(3);
        el.style.transform = prefersReducedMotion 
          ? 'none' 
          : `translate3d(0, ${style.translateY.toFixed(1)}px, 0)`;
      }
    }
  }

  // =========================================================================
  // Update Trackers
  // =========================================================================
  function updateTrackers(p1, p2, p3) {
    if (s1TrackerLabel) {
      if (p1 < 0.20) s1TrackerLabel.textContent = 'GENESIS PROTOCOL';
      else if (p1 < 0.42) s1TrackerLabel.textContent = 'HANDS CONVERGE';
      else if (p1 < 0.64) s1TrackerLabel.textContent = 'RING TUNNEL';
      else if (p1 < 0.86) s1TrackerLabel.textContent = 'CIRCUIT EMERGENCE';
      else s1TrackerLabel.textContent = 'EXPANSION CORE';
    }

    if (s2TrackerLabel) {
      if (p2 < 0.26) s2TrackerLabel.textContent = 'ATMOSPHERIC CORE';
      else if (p2 < 0.50) s2TrackerLabel.textContent = 'CONDUCTION DESCENT';
      else if (p2 < 0.74) s2TrackerLabel.textContent = 'SOCKET SYNTHESIS';
      else s2TrackerLabel.textContent = 'MONOLITH ZENITH';
    }

    if (s3TrackerLabel) {
      const activeIdx = Math.min(3, Math.max(0, Math.round(p3 * 3)));
      s3TrackerLabel.textContent = cardDetails[activeIdx].tracker;
    }
  }

  // =========================================================================
  // Section 3: 3D Orbiting Feature Carousel — 9 Storyboard States Interpolation
  // =========================================================================
  function getInterpolationParams(p) {
    p = Math.min(1, Math.max(0, p));
    for (let i = 0; i < STORYBOARD_SEGMENTS.length; i++) {
      const seg = STORYBOARD_SEGMENTS[i];
      if (p >= seg.pStart && p <= seg.pEnd) {
        if (seg.hold) return { from: seg.state, to: seg.state, t: 0, activeState: seg.state };
        const raw = (p - seg.pStart) / (seg.pEnd - seg.pStart);
        const eased = raw * raw * (3 - 2 * raw);
        const activeState = (raw > 0.5) ? seg.to : seg.from;
        return { from: seg.from, to: seg.to, t: eased, activeState };
      }
    }
    return { from: 8, to: 8, t: 0, activeState: 8 };
  }

  function updateCarousel3D(progress) {
    if (!orbitCards || orbitCards.length === 0) return;

    const { from, to, t, activeState } = getInterpolationParams(progress);

    // Responsive spread factor for screen width
    const windowW = window.innerWidth;
    const spreadFactor = windowW < 1280 ? Math.max(0.65, (windowW - 120) / 1160) : 1.0;
    const globalScaleFactor = windowW < 768 ? 0.82 : 1.0;

    // Update 9-state nav indicators
    if (indicatorPips && indicatorPips.length > 0) {
      indicatorPips.forEach((pip, idx) => {
        if (idx === activeState) {
          pip.classList.add('active');
        } else {
          pip.classList.remove('active');
        }
      });
    }

    // Update Storyboard Stage Tracker
    if (s3TrackerCounter) {
      s3TrackerCounter.textContent = `STATE 0${activeState + 1}`;
    }
    if (s3TrackerLabel) {
      s3TrackerLabel.textContent = STORYBOARD_STATES[activeState].label;
    }

    // Apply continuous 3D transforms to cards
    orbitCards.forEach((card, idx) => {
      const kfFrom = STATE_CARD_KEYFRAMES[from][idx];
      const kfTo = STATE_CARD_KEYFRAMES[to][idx];

      const x = (kfFrom.x + (kfTo.x - kfFrom.x) * t) * spreadFactor;
      const y = kfFrom.y + (kfTo.y - kfFrom.y) * t;
      const z = kfFrom.z + (kfTo.z - kfFrom.z) * t;
      const rotY = kfFrom.rotY + (kfTo.rotY - kfFrom.rotY) * t;
      const scale = (kfFrom.scale + (kfTo.scale - kfFrom.scale) * t) * globalScaleFactor;
      const opacity = kfFrom.opacity + (kfTo.opacity - kfFrom.opacity) * t;
      const fullView = kfFrom.fullView + (kfTo.fullView - kfFrom.fullView) * t;

      if (prefersReducedMotion) {
        card.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0)`;
      } else {
        card.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateY(${rotY.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
      }

      card.style.opacity = opacity.toFixed(3);
      card.style.zIndex = Math.round(z + 500);

      // Active state and full-view expansion
      if (fullView >= 0.45) {
        card.classList.add('is-full-view');
        card.classList.add('is-active');
        card.style.pointerEvents = 'auto';
        card.style.filter = 'blur(0px)';
      } else {
        card.classList.remove('is-full-view');
        if (z > -50) {
          card.classList.add('is-active');
          card.style.filter = 'blur(0px)';
        } else {
          card.classList.remove('is-active');
          const blurAmount = Math.max(0, (-z - 50) * 0.012);
          card.style.filter = blurAmount > 0.4 ? `blur(${blurAmount.toFixed(1)}px)` : 'none';
        }
        card.style.pointerEvents = opacity > 0.5 ? 'auto' : 'none';
      }
    });
  }

  // =========================================================================
  // Scroll Position Tracking
  // =========================================================================
  function updateScrollPositions() {
    if (isModalOpen) return;

    if (heroContainer) {
      const rect1 = heroContainer.getBoundingClientRect();
      const maxScroll1 = heroContainer.offsetHeight - window.innerHeight;
      if (maxScroll1 > 0) {
        const scrolled1 = -rect1.top;
        targetProgress1 = Math.min(1, Math.max(0, scrolled1 / maxScroll1));
      }
    }

    if (section2Container) {
      const rect2 = section2Container.getBoundingClientRect();
      const maxScroll2 = section2Container.offsetHeight - window.innerHeight;
      if (maxScroll2 > 0) {
        const scrolled2 = -rect2.top;
        targetProgress2 = Math.min(1, Math.max(0, scrolled2 / maxScroll2));
      }
    }

    if (section3Container) {
      const rect3 = section3Container.getBoundingClientRect();
      const maxScroll3 = section3Container.offsetHeight - window.innerHeight;
      if (maxScroll3 > 0) {
        const scrolled3 = -rect3.top;
        targetProgress3 = Math.min(1, Math.max(0, scrolled3 / maxScroll3));
      }
    }

    if (scrollCue) {
      if (window.scrollY > 35) {
        scrollCue.classList.add('is-hidden');
      } else {
        scrollCue.classList.remove('is-hidden');
      }
    }
  }

  // =========================================================================
  // Main Render Loop (Butter-Smooth 60/120fps with Inertial Lerp)
  // =========================================================================
  function renderLoop() {
    // Section 1 scroll lerp
    const delta1 = targetProgress1 - currentProgress1;
    if (Math.abs(delta1) < 0.0003) {
      currentProgress1 = targetProgress1;
    } else {
      currentProgress1 += delta1 * 0.14;
    }

    // Section 2 scroll lerp
    const delta2 = targetProgress2 - currentProgress2;
    if (Math.abs(delta2) < 0.0003) {
      currentProgress2 = targetProgress2;
    } else {
      currentProgress2 += delta2 * 0.14;
    }

    // Section 3 scroll lerp
    const delta3 = targetProgress3 - currentProgress3;
    if (Math.abs(delta3) < 0.0003) {
      currentProgress3 = targetProgress3;
    } else {
      currentProgress3 += delta3 * 0.14;
    }

    // --- Render Section 1 Frame ---
    const targetIndexS1 = Math.min(S1_TOTAL - 1, Math.max(0, Math.floor(currentProgress1 * (S1_TOTAL - 1))));
    if (targetIndexS1 !== lastRenderedS1 || !isInitialS1Rendered) {
      const best = getBestAvailableFrame(imagesS1, S1_TOTAL, targetIndexS1);
      if (best) {
        drawCover(ctx1, canvas1, best);
        lastRenderedS1 = targetIndexS1;
        isInitialS1Rendered = true;
      }
    }
    updateStatements(statementsS1, currentProgress1);

    // --- Render Section 2 Frame ---
    const targetIndexS2 = Math.min(S2_TOTAL - 1, Math.max(0, Math.floor(currentProgress2 * (S2_TOTAL - 1))));
    if (targetIndexS2 !== lastRenderedS2 || !isInitialS2Rendered) {
      const best = getBestAvailableFrame(imagesS2, S2_TOTAL, targetIndexS2);
      if (best) {
        drawCover(ctx2, canvas2, best);
        lastRenderedS2 = targetIndexS2;
        isInitialS2Rendered = true;
      }
    }
    updateStatements(statementsS2, currentProgress2);

    // --- Render Section 3 3D Carousel ---
    updateCarousel3D(currentProgress3);

    // Update trackers across all scenes
    updateTrackers(currentProgress1, currentProgress2, currentProgress3);

    requestAnimationFrame(renderLoop);
  }

  // =========================================================================
  // Frame Preloader
  // =========================================================================
  function preloadAllFrames() {
    // 1. Section 1 Frame 0
    const firstImgS1 = new Image();
    firstImgS1.src = getS1Filename(0);
    imagesS1[0] = firstImgS1;

    firstImgS1.onload = () => {
      resizeCanvases();
      drawCover(ctx1, canvas1, firstImgS1);
      isInitialS1Rendered = true;
      lastRenderedS1 = 0;
      updateStatements(statementsS1, 0);

      if (loadingOverlay) {
        loadingOverlay.classList.add('is-loaded');
      }

      for (let i = 1; i < S1_TOTAL; i++) {
        const img = new Image();
        img.src = getS1Filename(i);
        imagesS1[i] = img;
      }
    };

    // 2. Section 2 Frame 0
    const firstImgS2 = new Image();
    firstImgS2.src = getS2Filename(0);
    imagesS2[0] = firstImgS2;

    firstImgS2.onload = () => {
      resizeCanvases();
      drawCover(ctx2, canvas2, firstImgS2);
      isInitialS2Rendered = true;
      lastRenderedS2 = 0;
      updateStatements(statementsS2, 0);

      for (let i = 1; i < S2_TOTAL; i++) {
        const img = new Image();
        img.src = getS2Filename(i);
        imagesS2[i] = img;
      }
    };
  }

  // =========================================================================
  // Click-to-Expand Modal Logic
  // =========================================================================
  function openCardModal(cardIndex) {
    const data = cardDetails[cardIndex];
    if (!data || !cardModal) return;

    modalCategory.textContent = data.category;
    modalNumber.textContent = data.number;
    modalHeadline.innerHTML = data.headline;
    modalLead.textContent = data.lead;
    modalWireframeSlot.innerHTML = data.wireframe;

    modalFeatures.innerHTML = '';
    data.features.forEach(feat => {
      const li = document.createElement('li');
      li.textContent = feat;
      modalFeatures.appendChild(li);
    });

    cardModal.classList.add('is-open');
    cardModal.setAttribute('aria-hidden', 'false');
    isModalOpen = true;
  }

  function closeCardModal() {
    if (!cardModal) return;
    cardModal.classList.remove('is-open');
    cardModal.setAttribute('aria-hidden', 'true');
    isModalOpen = false;
  }

  function setupInteractions() {
    // Orbit Card clicks to open detail modal
    orbitCards.forEach((card, idx) => {
      card.addEventListener('click', (e) => {
        e.stopPropagation();
        openCardModal(idx);
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openCardModal(idx);
        }
      });
    });

    // Pips click to navigate to corresponding state
    indicatorPips.forEach((pip, idx) => {
      pip.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!section3Container) return;
        const targetP = STATE_CHECKPOINTS[idx];
        const rect = section3Container.getBoundingClientRect();
        const maxScroll = section3Container.offsetHeight - window.innerHeight;
        const targetScrollY = window.scrollY + rect.top + targetP * maxScroll;
        window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
      });
    });

    // Close buttons
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeCardModal();
      });
    }

    if (modalActionClose) {
      modalActionClose.addEventListener('click', (e) => {
        e.stopPropagation();
        closeCardModal();
      });
    }

    if (cardModal) {
      cardModal.addEventListener('click', (e) => {
        if (e.target === cardModal) {
          closeCardModal();
        }
      });
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeCardModal();
      }
    });
  }

  // =========================================================================
  // Initialization
  // =========================================================================
  function init() {
    resizeCanvases();
    preloadAllFrames();
    setupInteractions();
    updateScrollPositions();

    window.addEventListener('resize', () => {
      resizeCanvases();
      const bestS1 = getBestAvailableFrame(imagesS1, S1_TOTAL, lastRenderedS1 >= 0 ? lastRenderedS1 : 0);
      if (bestS1) drawCover(ctx1, canvas1, bestS1);

      const bestS2 = getBestAvailableFrame(imagesS2, S2_TOTAL, lastRenderedS2 >= 0 ? lastRenderedS2 : 0);
      if (bestS2) drawCover(ctx2, canvas2, bestS2);
    }, { passive: true });

    window.addEventListener('scroll', updateScrollPositions, { passive: true });

    requestAnimationFrame(renderLoop);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
