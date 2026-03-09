import React, { useEffect, useRef, useState } from 'react';

const COMPANIES = [
  { name: 'Salesforce', color: '#00A1E0' },
  { name: 'IBM',        color: '#1F70C1' },
  { name: 'Zendesk',    color: '#03363D' },
  { name: 'BMW',        color: '#0066B1' },
  { name: 'British Airways', color: '#EB2226' },
  { name: 'Microsoft',  color: '#00A4EF' },
  { name: 'Adobe',      color: '#FF0000' },
  { name: 'Shopify',    color: '#96BF48' },
  { name: 'Airbnb',     color: '#FF5A5F' },
  { name: 'Spotify',    color: '#1DB954' },
];

// Duplicate items so the loop is seamless
const ITEMS = [...COMPANIES, ...COMPANIES, ...COMPANIES];

const TrustedBySection = () => {
  const trackRef = useRef(null);
  const animFrameRef = useRef(null);
  const posRef = useRef(0);          // current translate-x in px
  const lastScrollY = useRef(window.scrollY);
  const directionRef = useRef(-1);   // -1 = left (default), +1 = right
  const speedRef = useRef(0);        // pixels per frame
  const SCROLL_BOOST = 0.18;         // px per scroll-delta
  const BASE_SPEED = 0.55;           // px per frame baseline
  const DECEL = 0.94;                // friction

  // We'll measure half the total track width (one copy of items) after mount
  const halfWidthRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // Width of one set of COMPANIES items (1/3 of track since we tripled)
    halfWidthRef.current = track.scrollWidth / 3;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      lastScrollY.current = currentY;

      if (delta === 0) return;

      // Direction: scroll down → move left (−), scroll up → move right (+)
      directionRef.current = delta > 0 ? -1 : 1;
      // Boost speed proportional to scroll delta, cap it
      speedRef.current = Math.min(
        BASE_SPEED + Math.abs(delta) * SCROLL_BOOST,
        12
      );
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const animate = () => {
      // Decay speed toward baseline
      if (speedRef.current > BASE_SPEED) {
        speedRef.current = speedRef.current * DECEL + BASE_SPEED * (1 - DECEL);
      } else {
        speedRef.current = BASE_SPEED;
      }

      posRef.current += directionRef.current * speedRef.current;

      const half = halfWidthRef.current;
      if (half > 0) {
        // Wrap: keep pos within [−half, 0]
        if (posRef.current <= -half) posRef.current += half;
        if (posRef.current >= 0)     posRef.current -= half;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${posRef.current}px)`;
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  return (
    <section className="py-16 bg-white overflow-hidden">
      <p className="text-center text-gray-500 text-sm font-medium mb-10 uppercase tracking-wide px-4">
        Trusted by leading companies worldwide
      </p>

      {/* Fade edges */}
      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
          style={{ background: 'linear-gradient(to right, white, transparent)' }} />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
          style={{ background: 'linear-gradient(to left, white, transparent)' }} />

        <div
          ref={trackRef}
          className="flex items-center gap-6 will-change-transform"
          style={{ width: 'max-content' }}
        >
          {ITEMS.map((company, index) => (
            <div
              key={index}
              className="flex items-center gap-2.5 px-6 py-3 bg-gray-50 rounded-full border border-gray-100 select-none whitespace-nowrap"
            >
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: company.color }} />
              <span className="font-semibold text-gray-700 text-sm">{company.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
