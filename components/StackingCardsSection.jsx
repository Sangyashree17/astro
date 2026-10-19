import React, { useState, useEffect, useRef } from 'react';

// ==========================================================================
// 1. 4 Solid White Brand Tiles
// ==========================================================================
export function BrandTilesRow() {
  return (
    <div className="sc-top-brand-tiles">
      {/* Tile 1: Aurit Cognitive Technologies */}
      <div className="sc-brand-tile tile-aurit" title="Aurit Cognitive Technologies">
        <img
          src="assets/logos/logo-aurit.svg"
          alt="Aurit Cognitive Technologies"
          className="sc-brand-logo-img sc-logo-aurit-img"
          loading="lazy"
        />
      </div>

      {/* Tile 2: ECSE (EduSphere Centre for School Excellence) */}
      <div className="sc-brand-tile tile-ecse" title="ECSE - EduSphere Centre for School Excellence">
        <img
          src="assets/logos/logo-ecse.png"
          alt="ECSE EduSphere Centre for School Excellence"
          className="sc-brand-logo-img sc-logo-ecse-img"
          loading="lazy"
        />
      </div>

      {/* Tile 3: HireMitra (AI-Powered Hiring Assistant) */}
      <div className="sc-brand-tile tile-hiremitra" title="HireMitra - AI-Powered Hiring Assistant">
        <img
          src="assets/logos/logo-hiremitra.png"
          alt="HireMitra AI-Powered Hiring Assistant"
          className="sc-brand-logo-img sc-logo-hiremitra-img"
          loading="lazy"
        />
      </div>

      {/* Tile 4: Mitram (India's Everyday Digital Companion) */}
      <div className="sc-brand-tile tile-mitram" title="Mitram - India's Everyday Digital Companion">
        <img
          src="assets/logos/logo-mitram.png"
          alt="Mitram - India's Everyday Digital Companion"
          className="sc-brand-logo-img sc-logo-mitram-img"
          loading="lazy"
        />
      </div>
    </div>
  );
}

// ==========================================================================
// 2. Laptop Hardware Mockup
// ==========================================================================
export function LaptopMockup() {
  return (
    <div className="sc-showcase-laptop">
      <div className="sc-laptop-chassis">
        <div className="sc-laptop-camera" />
        <div className="sc-laptop-display">
          <div className="sc-laptop-ui">
            <aside className="sc-laptop-sidebar">
              <div className="sc-side-dot active" />
              <div className="sc-side-dot" />
              <div className="sc-side-dot" />
              <div className="sc-side-dot" />
            </aside>
            <div className="sc-laptop-content">
              <div className="sc-laptop-topbar">
                <div className="sc-laptop-search">
                  <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="#053D58" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <span>Analytics Overview</span>
                </div>
                <div className="sc-laptop-user-dot" />
              </div>
              <div className="sc-laptop-stats-row">
                <div className="sc-laptop-stat-card">
                  <span className="sc-l-label">Revenue</span>
                  <span className="sc-l-val">$128.4k</span>
                </div>
                <div className="sc-laptop-stat-card">
                  <span className="sc-l-label">Active</span>
                  <span className="sc-l-val">42.8k</span>
                </div>
                <div className="sc-laptop-stat-card">
                  <span className="sc-l-label">Retention</span>
                  <span className="sc-l-val">96.4%</span>
                </div>
              </div>
              <div className="sc-laptop-chart-row">
                <div className="sc-laptop-bars">
                  {[40, 85, 55, 95, 65, 100, 50].map((hVal, idx) => (
                    <span key={idx} className={`sc-l-bar ${hVal >= 80 ? 'active' : ''}`} style={{ height: `${hVal}%` }} />
                  ))}
                </div>
                <div className="sc-laptop-line">
                  <svg viewBox="0 0 100 40" preserveAspectRatio="none">
                    <path d="M0,35 Q20,12 40,24 T70,14 T100,6" fill="none" stroke="#2563EB" strokeWidth="2.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sc-laptop-lip">
        <div className="sc-laptop-lip-notch" />
      </div>
    </div>
  );
}

// ==========================================================================
// 3. 3 Standing Mobile Phones (NO PEOPLE NAMES)
// ==========================================================================
export function PhonesCluster() {
  return (
    <div className="sc-phones-cluster">
      {/* Phone 1: Morning Greeting & Balance */}
      <div className="sc-phone-frame phone-1">
        <div className="sc-dynamic-island" />
        <div className="sc-phone-screen screen-greeting">
          <div className="sc-p-header">
            <div className="sc-p-avatar" />
            <div className="sc-p-greeting-text">
              <span className="sc-p-sub">Good morning!</span>
              <span className="sc-p-user">Workspace</span>
            </div>
            <div className="sc-p-bell" />
          </div>
          <div className="sc-p-balance-card">
            <span className="sc-bal-lbl">Total Balance</span>
            <span className="sc-bal-val">$24,580.00</span>
          </div>
          <div className="sc-p-actions-row">
            <span className="sc-p-act" />
            <span className="sc-p-act" />
            <span className="sc-p-act" />
            <span className="sc-p-act" />
          </div>
          <div className="sc-p-list">
            <div className="sc-p-list-item">
              <span className="sc-p-dot" />
              <div className="sc-p-item-lines">
                <span style={{ width: '70%' }} />
                <span style={{ width: '40%' }} />
              </div>
            </div>
            <div className="sc-p-list-item">
              <span className="sc-p-dot" />
              <div className="sc-p-item-lines">
                <span style={{ width: '85%' }} />
                <span style={{ width: '50%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phone 2: My Learning */}
      <div className="sc-phone-frame phone-2">
        <div className="sc-dynamic-island" />
        <div className="sc-phone-screen screen-learning">
          <div className="sc-p-learning-header">
            <span>&lt;</span>
            <span className="sc-p-learning-title">My Learning</span>
            <span>...</span>
          </div>
          <div className="sc-p-mentors-row">
            <div className="sc-p-mentor">
              <div className="sc-mentor-av" />
              <span className="sc-mentor-name">UI Design</span>
              <span className="sc-mentor-role">Design System</span>
            </div>
            <div className="sc-p-mentor">
              <div className="sc-mentor-av dark" />
              <span className="sc-mentor-name">Architecture</span>
              <span className="sc-mentor-role">Cloud Platform</span>
            </div>
          </div>
          <div className="sc-p-course-item">
            <span>System Scaling</span>
            <div className="sc-p-prog"><div className="sc-p-prog-bar" style={{ width: '82%' }} /></div>
          </div>
          <div className="sc-p-course-item">
            <span>Atomic UI Design</span>
            <div className="sc-p-prog"><div className="sc-p-prog-bar" style={{ width: '64%' }} /></div>
          </div>
        </div>
      </div>

      {/* Phone 3: Donut 72% */}
      <div className="sc-phone-frame phone-3">
        <div className="sc-dynamic-island" />
        <div className="sc-phone-screen screen-chart">
          <div className="sc-p-chart-header">
            <span className="sc-chart-pill">Live</span>
            <span className="sc-chart-pill">89.4%</span>
          </div>
          <div className="sc-donut-wrapper">
            <svg className="sc-donut-svg" viewBox="0 0 36 36">
              <path className="sc-donut-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="sc-donut-fill" strokeDasharray="72, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="sc-donut-text"><span className="sc-donut-val">72%</span></div>
          </div>
          <div className="sc-p-cols">
            {[30, 60, 45, 90, 75, 50, 85].map((val, idx) => (
              <span key={idx} className={`sc-p-col ${val >= 75 ? 'active' : ''}`} style={{ height: `${val}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// 4. Main Stacking Cards Section (Increased Grand Height)
// ==========================================================================
export default function StackingCardsSection() {
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [activeIdx, setActiveIdx] = useState(1);
  const [timeStr, setTimeStr] = useState('02:02:03 PM');

  useEffect(() => {
    const onScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const totalHeight = rect.height - window.innerHeight;
      if (totalHeight <= 0) return;

      const currentY = -rect.top;
      const rawProgress = Math.max(0, Math.min(1, currentY / totalHeight));
      setProgress(rawProgress);

      if (rawProgress < 0.35) {
        setActiveIdx(1);
      } else if (rawProgress < 0.70) {
        setActiveIdx(2);
      } else {
        setActiveIdx(3);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="sc-stack-scroll-track" ref={trackRef} id="sc-stack-track">
      <div className="sc-sticky-pin-frame">
        <div className="container">
            {/* Central Viewport */}
            <div className="sc-replica-viewport">
              <div className="sc-card-stack-stage">
                {/* Card 01: Core Platform & Brand Tiles (Heading + Subheading + Body Text) */}
                {/* Card 02: Product Engineering */}
                {/* Card 03: Cloud Transformation */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
