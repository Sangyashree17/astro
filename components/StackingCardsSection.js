/**
 * ISHVARA TECH CONSULTING — SCROLL-DRIVEN STACKING CARDS SECTION (REACT)
 * Exact Visual Replica of Reference Design
 * Strict Solid Blue Palette (ZERO Gradients):
 * - Pure White: #FFFFFF
 * - Dark Navy Blue: #001A51
 * - Dark Blue: #053D58
 * - Royal Blue: #2563EB
 * - Light Blue: #BEE3FF
 * - Very Light Blue: #EFF7FF
 * 
 * CLEAN ENTERPRISE COPY:
 * - NO quotes, NO reviewer containers, NO person saying anything.
 * - Card 01 features normal Heading, Sub-heading, and Body Text with the 4 Brand Tiles.
 * - Increased height for generous, grand, premium visual presence.
 * - True scroll-driven pinned stacking cards sequence.
 */

(function () {
  'use strict';

  const { useState, useEffect, useRef, createElement: h } = React;

  // ==========================================================================
  // 1. SUBCOMPONENT: 4 Solid White Brand Tiles with Original Logos
  // ==========================================================================
  function BrandTilesRow() {
    return h('div', { className: 'sc-top-brand-tiles' },
      // Tile 1: Aurit Cognitive Technologies
      h('div', { className: 'sc-brand-tile tile-aurit', title: 'Aurit Cognitive Technologies' },
        h('img', {
          src: 'assets/logos/logo-aurit.svg',
          alt: 'Aurit Cognitive Technologies',
          className: 'sc-brand-logo-img sc-logo-aurit-img',
          loading: 'lazy'
        })
      ),

      // Tile 2: ECSE (EduSphere Centre for School Excellence)
      h('div', { className: 'sc-brand-tile tile-ecse', title: 'ECSE - EduSphere Centre for School Excellence' },
        h('img', {
          src: 'assets/logos/logo-ecse.png',
          alt: 'ECSE EduSphere Centre for School Excellence',
          className: 'sc-brand-logo-img sc-logo-ecse-img',
          loading: 'lazy'
        })
      ),

      // Tile 3: HireMitra (AI-Powered Hiring Assistant)
      h('div', { className: 'sc-brand-tile tile-hiremitra', title: 'HireMitra - AI-Powered Hiring Assistant' },
        h('img', {
          src: 'assets/logos/logo-hiremitra.png',
          alt: 'HireMitra AI-Powered Hiring Assistant',
          className: 'sc-brand-logo-img sc-logo-hiremitra-img',
          loading: 'lazy'
        })
      ),

      // Tile 4: Mitram (India\'s Everyday Digital Companion)
      h('div', { className: 'sc-brand-tile tile-mitram', title: 'Mitram - India\'s Everyday Digital Companion' },
        h('img', {
          src: 'assets/logos/logo-mitram.png',
          alt: 'Mitram - India\'s Everyday Digital Companion',
          className: 'sc-brand-logo-img sc-logo-mitram-img',
          loading: 'lazy'
        })
      )
    );
  }

  // ==========================================================================
  // 2. SUBCOMPONENT: Laptop Hardware Mockup (Solid Colors)
  // ==========================================================================
  function LaptopMockup() {
    return h('div', { className: 'sc-showcase-laptop' },
      h('div', { className: 'sc-laptop-chassis' },
        h('div', { className: 'sc-laptop-camera' }),
        h('div', { className: 'sc-laptop-display' },
          h('div', { className: 'sc-laptop-ui' },
            // Left App Sidebar
            h('aside', { className: 'sc-laptop-sidebar' },
              h('div', { className: 'sc-side-dot active' }),
              h('div', { className: 'sc-side-dot' }),
              h('div', { className: 'sc-side-dot' }),
              h('div', { className: 'sc-side-dot' })
            ),
            // Right App Canvas
            h('div', { className: 'sc-laptop-content' },
              // Header
              h('div', { className: 'sc-laptop-topbar' },
                h('div', { className: 'sc-laptop-search' },
                  h('svg', { viewBox: '0 0 24 24', width: '10', height: '10', fill: 'none', stroke: '#053D58', strokeWidth: '2.5' },
                    h('circle', { cx: '11', cy: '11', r: '8' }),
                    h('line', { x1: '21', y1: '21', x2: '16.65', y2: '16.65' })
                  ),
                  h('span', null, 'Analytics Overview')
                ),
                h('div', { className: 'sc-laptop-user-dot' })
              ),
              // KPI Stat Cards
              h('div', { className: 'sc-laptop-stats-row' },
                h('div', { className: 'sc-laptop-stat-card' },
                  h('span', { className: 'sc-l-label' }, 'Revenue'),
                  h('span', { className: 'sc-l-val' }, '$128.4k')
                ),
                h('div', { className: 'sc-laptop-stat-card' },
                  h('span', { className: 'sc-l-label' }, 'Active'),
                  h('span', { className: 'sc-l-val' }, '42.8k')
                ),
                h('div', { className: 'sc-laptop-stat-card' },
                  h('span', { className: 'sc-l-label' }, 'Retention'),
                  h('span', { className: 'sc-l-val' }, '96.4%')
                )
              ),
              // Charts Row
              h('div', { className: 'sc-laptop-chart-row' },
                // Bar Chart
                h('div', { className: 'sc-laptop-bars' },
                  [40, 85, 55, 95, 65, 100, 50].map((hVal, idx) =>
                    h('span', {
                      key: idx,
                      className: `sc-l-bar ${hVal >= 80 ? 'active' : ''}`,
                      style: { height: `${hVal}%` }
                    })
                  )
                ),
                // Line Graph
                h('div', { className: 'sc-laptop-line' },
                  h('svg', { viewBox: '0 0 100 40', preserveAspectRatio: 'none' },
                    h('path', {
                      d: 'M0,35 Q20,12 40,24 T70,14 T100,6',
                      fill: 'none',
                      stroke: '#2563EB',
                      strokeWidth: '2.5'
                    })
                  )
                )
              )
            )
          )
        )
      ),
      // Base Lip
      h('div', { className: 'sc-laptop-lip' },
        h('div', { className: 'sc-laptop-lip-notch' })
      )
    );
  }

  // ==========================================================================
  // 3. SUBCOMPONENT: 3 Standing Mobile Phones (Solid Colors)
  // ==========================================================================
  function PhonesCluster() {
    return h('div', { className: 'sc-phones-cluster' },
      // Phone 1: Morning Greeting & Balance Dashboard
      h('div', { className: 'sc-phone-frame phone-1' },
        h('div', { className: 'sc-dynamic-island' }),
        h('div', { className: 'sc-phone-screen screen-greeting' },
          h('div', { className: 'sc-p-header' },
            h('div', { className: 'sc-p-avatar' }),
            h('div', { className: 'sc-p-greeting-text' },
              h('span', { className: 'sc-p-sub' }, 'Good morning!'),
              h('span', { className: 'sc-p-user' }, 'Workspace')
            ),
            h('div', { className: 'sc-p-bell' })
          ),
          h('div', { className: 'sc-p-balance-card' },
            h('span', { className: 'sc-bal-lbl' }, 'Total Balance'),
            h('span', { className: 'sc-bal-val' }, '$24,580.00')
          ),
          h('div', { className: 'sc-p-actions-row' },
            h('span', { className: 'sc-p-act' }),
            h('span', { className: 'sc-p-act' }),
            h('span', { className: 'sc-p-act' }),
            h('span', { className: 'sc-p-act' })
          ),
          h('div', { className: 'sc-p-list' },
            h('div', { className: 'sc-p-list-item' },
              h('span', { className: 'sc-p-dot' }),
              h('div', { className: 'sc-p-item-lines' },
                h('span', { style: { width: '70%' } }),
                h('span', { style: { width: '40%' } })
              )
            ),
            h('div', { className: 'sc-p-list-item' },
              h('span', { className: 'sc-p-dot' }),
              h('div', { className: 'sc-p-item-lines' },
                h('span', { style: { width: '85%' } }),
                h('span', { style: { width: '50%' } })
              )
            )
          )
        )
      ),

      // Phone 2: My Learning & Core Disciplines
      h('div', { className: 'sc-phone-frame phone-2' },
        h('div', { className: 'sc-dynamic-island' }),
        h('div', { className: 'sc-phone-screen screen-learning' },
          h('div', { className: 'sc-p-learning-header' },
            h('span', null, '<'),
            h('span', { className: 'sc-p-learning-title' }, 'My Learning'),
            h('span', null, '...')
          ),
          h('div', { className: 'sc-p-mentors-row' },
            h('div', { className: 'sc-p-mentor' },
              h('div', { className: 'sc-mentor-av' }),
              h('span', { className: 'sc-mentor-name' }, 'UI Design'),
              h('span', { className: 'sc-mentor-role' }, 'Design System')
            ),
            h('div', { className: 'sc-p-mentor' },
              h('div', { className: 'sc-mentor-av dark' }),
              h('span', { className: 'sc-mentor-name' }, 'Architecture'),
              h('span', { className: 'sc-mentor-role' }, 'Cloud Platform')
            )
          ),
          h('div', { className: 'sc-p-course-item' },
            h('span', null, 'System Scaling'),
            h('div', { className: 'sc-p-prog' },
              h('div', { className: 'sc-p-prog-bar', style: { width: '82%' } })
            )
          ),
          h('div', { className: 'sc-p-course-item' },
            h('span', null, 'Atomic UI Design'),
            h('div', { className: 'sc-p-prog' },
              h('div', { className: 'sc-p-prog-bar', style: { width: '64%' } })
            )
          )
        )
      ),

      // Phone 3: Circular 72% Donut Chart & Metrics
      h('div', { className: 'sc-phone-frame phone-3' },
        h('div', { className: 'sc-dynamic-island' }),
        h('div', { className: 'sc-phone-screen screen-chart' },
          h('div', { className: 'sc-p-chart-header' },
            h('span', { className: 'sc-chart-pill' }, 'Live'),
            h('span', { className: 'sc-chart-pill' }, '89.4%')
          ),
          // Donut SVG
          h('div', { className: 'sc-donut-wrapper' },
            h('svg', { className: 'sc-donut-svg', viewBox: '0 0 36 36' },
              h('path', {
                className: 'sc-donut-bg',
                d: 'M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
              }),
              h('path', {
                className: 'sc-donut-fill',
                strokeDasharray: '72, 100',
                d: 'M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'
              })
            ),
            h('div', { className: 'sc-donut-text' },
              h('span', { className: 'sc-donut-val' }, '72%')
            )
          ),
          // Mini Activity Columns
          h('div', { className: 'sc-p-cols' },
            [30, 60, 45, 90, 75, 50, 85].map((val, idx) =>
              h('span', {
                key: idx,
                className: `sc-p-col ${val >= 75 ? 'active' : ''}`,
                style: { height: `${val}%` }
              })
            )
          )
        )
      )
    );
  }

  // ==========================================================================
  // 4. SUBCOMPONENT: Cloud Infrastructure Cluster Mockup (Card 03)
  // ==========================================================================
  function CloudClusterMockup() {
    return h('div', { className: 'sc-showcase-cloud' },
      h('div', { className: 'sc-cloud-monitor' },
        h('div', { className: 'sc-cloud-header' },
          h('span', { className: 'sc-cloud-badge' }, 'Multi-Region Kubernetes'),
          h('span', { className: 'sc-cloud-uptime' }, '99.99% Uptime')
        ),
        h('div', { className: 'sc-cloud-regions' },
          h('div', { className: 'sc-cloud-region' },
            h('span', { className: 'sc-region-name' }, 'US-East (Primary)'),
            h('div', { className: 'sc-region-meter' },
              h('div', { className: 'sc-meter-fill', style: { width: '38%' } })
            ),
            h('span', { className: 'sc-region-latency' }, '24ms')
          ),
          h('div', { className: 'sc-cloud-region' },
            h('span', { className: 'sc-region-name' }, 'EU-Central (Failover)'),
            h('div', { className: 'sc-region-meter' },
              h('div', { className: 'sc-meter-fill', style: { width: '52%' } })
            ),
            h('span', { className: 'sc-region-latency' }, '31ms')
          ),
          h('div', { className: 'sc-cloud-region' },
            h('span', { className: 'sc-region-name' }, 'AP-South (Edge CDN)'),
            h('div', { className: 'sc-region-meter' },
              h('div', { className: 'sc-meter-fill', style: { width: '26%' } })
            ),
            h('span', { className: 'sc-region-latency' }, '14ms')
          )
        )
      )
    );
  }

  // ==========================================================================
  // 5. SUBCOMPONENT: Card 01 — Core Enterprise Platform (Dark Navy #001A51)
  // Normal Heading, Sub-heading, and Body Text (NO QUOTES, NO PERSON SAYING)
  // ==========================================================================
  function Card01CorePlatform({ cardStyle }) {
    return h('div', {
      className: 'sc-stack-card sc-card-navy',
      id: 'sc-card-1',
      style: cardStyle
    },
      // Top Header Row
      h('div', { className: 'sc-card-top-header' },
        h('div', { className: 'sc-category-rule' },
          h('span', { className: 'sc-category-title' }, 'ENTERPRISE ECOSYSTEM & IMPACT'),
          h('span', { className: 'sc-category-line' })
        ),
        h('span', { className: 'sc-card-counter-display' }, '(01)')
      ),

      // Main Grid: Left Content (Subheading + Heading + Body) vs Right Brand Tiles
      h('div', { className: 'sc-c1-grid' },
        // Left Column: Normal Heading, Sub-heading, and Body Text
        h('div', { className: 'sc-c1-left-content' },
          h('span', { className: 'sc-c1-subheading' }, 'Proven Engineering Foundations'),
          h('h3', { className: 'sc-c1-heading' },
            'Architecting High-Performance Systems for Global Scale'
          ),
          h('p', { className: 'sc-c1-body' },
            'We align architecture, speed, and intelligence into digital software foundations that scale gracefully without firefighting. Built to empower growing teams and modern enterprises with precision craftsmanship.'
          )
        ),

        // Right Column: 4 Solid White Brand Tiles
        h(BrandTilesRow)
      ),

      // Bottom Row of Card 01: Trust Badges
      h('div', { className: 'sc-card-bottom-trust-strip' },
        h('span', { className: 'sc-trust-chip' },
          h('span', { className: 'sc-trust-dot' }),
          '99.8% Client Retention'
        ),
        h('span', { className: 'sc-trust-chip' },
          h('span', { className: 'sc-trust-dot' }),
          'Enterprise Grade Systems'
        ),
        h('span', { className: 'sc-trust-chip' },
          h('span', { className: 'sc-trust-dot' }),
          'Zero-Defect Architecture'
        )
      )
    );
  }

  // ==========================================================================
  // 6. SUBCOMPONENT: Card 02 — Product Engineering (Royal Blue #2563EB)
  // EXACT VISUAL REPLICA (NO QUOTES, NO REVIEWER CONTAINER)
  // ==========================================================================
  function Card02ProductEngineering({ cardStyle }) {
    return h('div', {
      className: 'sc-stack-card sc-card-royal',
      id: 'sc-card-2',
      style: cardStyle
    },
      // Top Header Row
      h('div', { className: 'sc-card-top-header' },
        h('div', { className: 'sc-category-rule' },
          h('span', { className: 'sc-category-title' }, 'PRODUCT ENGINEERING'),
          h('span', { className: 'sc-category-line' })
        ),
        h('span', { className: 'sc-card-counter-display' }, '(02)')
      ),

      // Main Content Grid: Left Copy vs Right Device Showcase
      h('div', { className: 'sc-card-content-grid' },
        // Left Column: Headline, Description, Checklist
        h('div', { className: 'sc-card-text-col' },
          h('h3', { className: 'sc-main-headline' },
            'Product experiences users adopt & keep using'
          ),
          h('p', { className: 'sc-main-desc' },
            'We design and build intuitive, scalable digital products that solve real user problems and drive measurable business growth.'
          ),

          // Checklist
          h('ul', { className: 'sc-main-checklist' },
            [
              'User Research & Insights',
              'UX/UI Design',
              'Product Development',
              'Growth & Optimization'
            ].map((text, idx) =>
              h('li', { key: idx, className: 'sc-check-item' },
                h('svg', {
                  className: 'sc-check-glyph',
                  viewBox: '0 0 24 24',
                  fill: 'none',
                  strokeWidth: '2.5',
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round'
                },
                  h('circle', { cx: '12', cy: '12', r: '10' }),
                  h('path', { d: 'm9 12 2 2 4-4' })
                ),
                h('span', null, text)
              )
            )
          )
        ),

        // Right Column: CTA Button + Device Showcase Stage
        h('div', { className: 'sc-card-device-col' },
          h('div', { className: 'sc-card-cta-bar' },
            h('a', {
              href: '#case-studies',
              className: 'sc-btn-case-studies'
            },
              h('span', null, 'SEE OUR CASE STUDIES'),
              h('svg', {
                viewBox: '0 0 24 24',
                width: '16',
                height: '16',
                fill: 'none',
                stroke: 'currentColor',
                strokeWidth: '2.5',
                strokeLinecap: 'round',
                strokeLinejoin: 'round'
              },
                h('path', { d: 'M5 12h14' }),
                h('path', { d: 'm12 5 7 7-7 7' })
              )
            )
          ),

          // Stage with Laptop + 3 Phones
          h('div', { className: 'sc-device-stage' },
            h(LaptopMockup),
            h(PhonesCluster)
          )
        )
      )
    );
  }

  // ==========================================================================
  // 7. SUBCOMPONENT: Card 03 — Cloud Transformation (Dark Blue #053D58)
  // (NO QUOTES, NO REVIEWER CONTAINER)
  // ==========================================================================
  function Card03CloudTransformation() {
    return h('div', {
      className: 'sc-stack-card sc-card-darkblue',
      id: 'sc-card-3'
    },
      // Top Header Row
      h('div', { className: 'sc-card-top-header' },
        h('div', { className: 'sc-category-rule' },
          h('span', { className: 'sc-category-title' }, 'CLOUD & INFRASTRUCTURE'),
          h('span', { className: 'sc-category-line' })
        ),
        h('span', { className: 'sc-card-counter-display' }, '(03)')
      ),

      // Main Content Grid
      h('div', { className: 'sc-card-content-grid' },
        // Left Column: Headline, Description, Checklist
        h('div', { className: 'sc-card-text-col' },
          h('h3', { className: 'sc-main-headline' },
            'Resilient, self-healing cloud architectures built to scale'
          ),
          h('p', { className: 'sc-main-desc' },
            'Zero-downtime migrations, automated Kubernetes clusters, and enterprise security postures engineered for 99.99% uptime and optimal cost efficiency.'
          ),

          // Checklist
          h('ul', { className: 'sc-main-checklist' },
            [
              'Multi-Cloud & Kubernetes Architecture',
              'Zero-Downtime Infrastructure Migration',
              'Infrastructure as Code (Terraform)',
              'DevSecOps & Enterprise Security'
            ].map((text, idx) =>
              h('li', { key: idx, className: 'sc-check-item' },
                h('svg', {
                  className: 'sc-check-glyph',
                  viewBox: '0 0 24 24',
                  fill: 'none',
                  strokeWidth: '2.5',
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round'
                },
                  h('circle', { cx: '12', cy: '12', r: '10' }),
                  h('path', { d: 'm9 12 2 2 4-4' })
                ),
                h('span', null, text)
              )
            )
          )
        ),

        // Right Column: CTA + Cloud Showcase
        h('div', { className: 'sc-card-device-col' },
          h('div', { className: 'sc-card-cta-bar' },
            h('a', {
              href: '#contact',
              className: 'sc-btn-case-studies'
            },
              h('span', null, 'EXPLORE CLOUD ARCHITECTURE'),
              h('svg', {
                viewBox: '0 0 24 24',
                width: '16',
                height: '16',
                fill: 'none',
                stroke: 'currentColor',
                strokeWidth: '2.5',
                strokeLinecap: 'round',
                strokeLinejoin: 'round'
              },
                h('path', { d: 'M5 12h14' }),
                h('path', { d: 'm12 5 7 7-7 7' })
              )
            )
          ),
          h(CloudClusterMockup)
        )
      )
    );
  }



  // ==========================================================================
  // 9. SUBCOMPONENT: Bottom Meta Bar with Live Clock
  // ==========================================================================
  function BottomMetaBar() {
    const [timeStr, setTimeStr] = useState('02:02:03 PM');

    useEffect(() => {
      const updateClock = () => {
        try {
          const now = new Date();
          setTimeStr(now.toLocaleTimeString('en-US', {
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'Asia/Kolkata'
          }));
        } catch (e) {
          // Fallback
        }
      };
      updateClock();
      const timer = setInterval(updateClock, 1000);
      return () => clearInterval(timer);
    }, []);

    return h('div', { className: 'sc-replica-meta-bar' },
      h('div', { className: 'sc-meta-brand' },
        h('span', { className: 'sc-meta-title' }, 'Ishvara'),
        h('span', { className: 'sc-meta-sub' }, 'Tech Consulting')
      ),
      h('div', { className: 'sc-meta-cta-pill' },
        h('span', { className: 'sc-discovery-text' }, 'Book a free discovery call'),
        h('a', {
          href: '#contact',
          className: 'sc-btn-discovery-call'
        },
          h('span', null, 'BOOK A CALL'),
          h('svg', {
            viewBox: '0 0 24 24',
            width: '16',
            height: '16',
            fill: 'none',
            stroke: 'currentColor',
            strokeWidth: '2.2'
          },
            h('rect', { x: '3', y: '4', width: '18', height: '18', rx: '2', ry: '2' }),
            h('line', { x1: '16', y1: '2', x2: '16', y2: '6' }),
            h('line', { x1: '8', y1: '2', x2: '8', y2: '6' }),
            h('line', { x1: '3', y1: '10', x2: '21', y2: '10' })
          )
        ),
        h('span', { className: 'sc-meta-live-pill' },
          h('span', { className: 'sc-live-dot' }),
          `Bengaluru, India • ${timeStr}`
        )
      )
    );
  }

  // ==========================================================================
  // 10. MAIN STACKING CARDS SECTION COMPONENT
  // Scroll-Driven Pinned Stacking Architecture (Increased Height)
  // ==========================================================================
  function StackingCardsSection() {
    const trackRef = useRef(null);
    const [progress, setProgress] = useState(0); // 0.0 to 1.0
    // Scroll progress controller
    useEffect(() => {
      const onScroll = () => {
        if (!trackRef.current) return;
        const rect = trackRef.current.getBoundingClientRect();
        const totalHeight = rect.height - window.innerHeight;
        if (totalHeight <= 0) return;

        // Current scroll amount inside the track
        const currentY = -rect.top;
        const rawProgress = Math.max(0, Math.min(1, currentY / totalHeight));
        setProgress(rawProgress);
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Calculate dynamic transforms based on scroll progress:
    // Card 01: scales down gently as Card 02 and 03 stack over it
    let c1Scale = 1;
    if (progress > 0.25) {
      c1Scale = Math.max(0.93, 1 - (progress - 0.25) * 0.12);
    }
    const card01Style = {
      transform: `scale(${c1Scale}) translateY(0px)`,
      transformOrigin: 'top center'
    };

    // Card 02: slides UP from bottom (translateY 100% -> 38px) between progress 0.18 and 0.50
    let c2YPercent = 105;
    let c2Scale = 1;
    if (progress <= 0.18) {
      c2YPercent = 105;
    } else if (progress <= 0.50) {
      const p = (progress - 0.18) / (0.50 - 0.18);
      c2YPercent = (1 - p) * 105;
    } else {
      c2YPercent = 0;
      if (progress > 0.65) {
        c2Scale = Math.max(0.96, 1 - (progress - 0.65) * 0.10);
      }
    }
    const card02Style = {
      transform: `translateY(${c2YPercent ? `calc(${c2YPercent}% + 38px)` : '38px'}) scale(${c2Scale})`,
      transformOrigin: 'top center'
    };

    // Card 03: slides UP from bottom (translateY 100% -> 76px) between progress 0.52 and 0.88
    let c3YPercent = 105;
    if (progress <= 0.52) {
      c3YPercent = 105;
    } else if (progress <= 0.88) {
      const p = (progress - 0.52) / (0.88 - 0.52);
      c3YPercent = (1 - p) * 105;
    } else {
      c3YPercent = 0;
    }
    const card03Style = {
      transform: `translateY(${c3YPercent ? `calc(${c3YPercent}% + 76px)` : '76px'}) scale(1)`,
      transformOrigin: 'top center'
    };

    return h('div', {
      className: 'sc-stack-scroll-track',
      ref: trackRef,
      id: 'sc-stack-track'
    },
      h('div', { className: 'sc-sticky-pin-frame' },
        h('div', { className: 'container' },
          h('div', { className: 'sc-replica-layout-wrap' },
            // Central Stacking Cards Viewport
            h('div', { className: 'sc-replica-viewport' },
              h('div', { className: 'sc-card-stack-stage' },
                // 1. Card 01 (Core Enterprise Platform — Normal Heading, Subheading & Body)
                h(Card01CorePlatform, { cardStyle: card01Style }),

                // 2. Card 02 (Product Engineering — Exact Visual Replica)
                h(Card02ProductEngineering, { cardStyle: card02Style }),

                // 3. Card 03 (Cloud Transformation) + Layered Offset Cards Underneath
                h('div', {
                  className: 'sc-card-3-stack-group',
                  id: 'sc-card-3-group',
                  style: card03Style
                },
                  h(Card03CloudTransformation),
                  // Offset Cards Layered Underneath Stack
                  h('div', { className: 'sc-offset-card sc-offset-card-1', 'aria-hidden': 'true' }),
                  h('div', { className: 'sc-offset-card sc-offset-card-2', 'aria-hidden': 'true' })
                )
              ),

              // Bottom Meta Bar (Branding + Discovery Pill with Live Clock)
              h(BottomMetaBar)
            )
          )
        )
      )
    );
  }

  // ==========================================================================
  // 11. AUTO-MOUNT LOGIC
  // ==========================================================================
  function mount() {
    const rootEl = document.getElementById('stacking-cards-root');
    if (!rootEl) return;

    if (ReactDOM.createRoot) {
      const root = ReactDOM.createRoot(rootEl);
      root.render(h(StackingCardsSection));
    } else if (ReactDOM.render) {
      ReactDOM.render(h(StackingCardsSection), rootEl);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = StackingCardsSection;
  } else {
    window.StackingCardsSection = StackingCardsSection;
  }
})();
