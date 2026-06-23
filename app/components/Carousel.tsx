'use client';

import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

export type Slide = {
  image: string;
  badge?: string;
  title: string;
  description: string;
  href?: string;
};

type CarouselProps = {
  slides: Slide[];
  autoPlayMs?: number;
  ariaLabel?: string;
  imageVariant?: 'cover' | 'logo';
};

export function Carousel({ slides, autoPlayMs = 5500, ariaLabel = 'carousel', imageVariant = 'cover' }: CarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const count = slides.length;

  const clamp = (n: number) => (n + count) % count;
  const next = () => setIndex((i) => clamp(i + 1));
  const prev = () => setIndex((i) => clamp(i - 1));

  useEffect(() => {
    if (paused || count <= 1) return;
    const t = setInterval(next, autoPlayMs);
    return () => clearInterval(t);
  }, [paused, autoPlayMs, count]);

  const onDragEnd = (_: any, info: PanInfo) => {
    const threshold = 80; // px
    if (info.offset.x < -threshold) next();
    else if (info.offset.x > threshold) prev();
  };

  const dots = useMemo(() => new Array(count).fill(0), [count]);

  return (
    <div className="carousel" aria-roledescription="carousel" aria-label={ariaLabel}
         onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <button className="carousel-nav left" aria-label="Previous slide" onClick={prev}>
        <ChevronLeft size={18} />
      </button>
      <button className="carousel-nav right" aria-label="Next slide" onClick={next}>
        <ChevronRight size={18} />
      </button>

      <motion.div
        ref={trackRef}
        className="carousel-viewport"
      >
        <motion.div
          className="carousel-track"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={onDragEnd}
          animate={{ x: `-${index * 100}%` }}
          transition={{ type: 'spring', stiffness: 80, damping: 20 }}
        >
          {slides.map((s, i) => (
            <div className="carousel-slide" key={s.title + i} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${count}`}>
              <div className={`project-card${imageVariant === 'logo' ? ' project-card--logo' : ''}`}>
                <img src={s.image} alt={s.title} loading="lazy" />
                <div className="project-copy">
                  {s.badge ? <span className="badge">{s.badge}</span> : null}
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                  {s.href ? (
                    <a className="project-link" href={s.href}>
                      View project <ExternalLink size={14} strokeWidth={2.5} />
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <div className="carousel-dots" role="tablist" aria-label="Choose slide">
        {dots.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === index}
            aria-label={`Go to slide ${i + 1}`}
            className={`carousel-dot${i === index ? ' active' : ''}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
