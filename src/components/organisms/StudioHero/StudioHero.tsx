'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './StudioHero.module.css';

export function StudioHero() {
  const rootRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!rootRef.current || prefersReducedMotion) return;

    // Shared parallax applicator — used by both mouse and touch handlers
    const applyParallax = (clientX: number, clientY: number) => {
      const xPos = (clientX / window.innerWidth - 0.5) * 2;
      const yPos = (clientY / window.innerHeight - 0.5) * 2;

      gsap.to('[data-mouse-parallax="copy"]', {
        x: xPos * 14,
        y: yPos * 8,
        duration: 1.2,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      gsap.to('[data-mouse-parallax="letters"]', {
        x: xPos * -20,
        y: yPos * -12,
        duration: 1.4,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      gsap.to('[data-mouse-parallax="bg-fast"]', {
        x: xPos * 25,
        y: yPos * 16,
        duration: 1.6,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      gsap.to('[data-mouse-parallax="bg-slow"]', {
        x: xPos * 8,
        y: yPos * 6,
        duration: 2,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    // Unified pointer handler — fires on mouse hover (desktop) and
    // finger drag (mobile/tablet). Never fires on taps or clicks.
    const handlePointerMove = (e: PointerEvent) => {
      applyParallax(e.clientX, e.clientY);
    };

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'expo.out' } });

      timeline
        .fromTo(
          '[data-hero-line]',
          { yPercent: 112, rotate: 5 },
          {
            yPercent: 0,
            rotate: 0,
            duration: 1.2,
            stagger: 0.12,
          },
        )
        .fromTo(
          '[data-hero-copy]',
          { autoAlpha: 0, y: 24, filter: 'blur(10px)' },
          {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.85,
            stagger: 0.08,
          },
          '-=0.8',
        )
        .fromTo(
          '[data-hero-ornament]',
          { autoAlpha: 0, scale: 0.84, rotate: -10 },
          {
            autoAlpha: 1,
            scale: 1,
            rotate: 0,
            duration: 1.05,
            stagger: 0.1,
          },
          '-=1',
        );

      gsap.to('[data-parallax="slow"]', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          scrub: 0.9,
          start: 'top top',
          end: 'bottom top',
        },
      });

      gsap.to('[data-parallax="fast"]', {
        yPercent: -7,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          scrub: 0.75,
          start: 'top top',
          end: 'bottom top',
        },
      });
    }, rootRef);

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      context.revert();
      ScrollTrigger.refresh();
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={rootRef}
      id="home"
      className={styles.hero}
      aria-labelledby="hero-title"
    >
      <div className={styles.bgTexture} data-parallax="slow" data-mouse-parallax="bg-slow" aria-hidden="true" />
      <div className={styles.bgFoldLeft} data-parallax="fast" data-mouse-parallax="bg-fast" aria-hidden="true" />
      <div className={styles.bgFoldRight} data-parallax="slow" data-mouse-parallax="bg-slow" aria-hidden="true" />
      <div className={styles.diagonalLineOne} data-hero-ornament aria-hidden="true" />
      <div className={styles.diagonalLineTwo} data-hero-ornament aria-hidden="true" />

      <div className={styles.headlineStage} data-mouse-parallax="letters" aria-hidden="true">
        <div className={styles.wordMaskAuto}>
          <p className={styles.wordAuto} data-hero-line>
            Auto
          </p>
        </div>

        <div className={styles.wordMaskNova}>
          <p className={styles.wordNova} data-hero-line>
            Nova
          </p>
        </div>

        <div className={styles.wordMaskAi}>
          <p className={styles.wordAi} data-hero-line>
            AI
          </p>
        </div>
      </div>

      <div className={styles.copyBlock} data-mouse-parallax="copy">
        <p className={styles.kicker} data-hero-copy>
          AUTONOVA AI / DIGITAL INTELLIGENCE STUDIO
        </p>

        <h1 id="hero-title" className="sr-only">
          Autonova AI digital intelligence studio.
        </h1>

        <div className={styles.editorialColumn}>
          <p className={styles.editorialLead} data-hero-copy>
            AUTONOVA AI DESIGNS AND DEVELOPS WORLD-CLASS WEBSITES FOR MODERN BRANDS.
          </p>
          <p className={styles.editorialBody} data-hero-copy>
            Thoughtfully crafted interfaces, seamless user experiences, and scalable digital solutions built for growth.
          </p>
        </div>

        <a href="#contact" className={styles.showreelLink} data-hero-copy>
          Start Our Build
        </a>
      </div>

      <div className={styles.homeWheelContainer} data-hero-ornament data-mouse-parallax="bg-slow" aria-hidden="true">
        <div className={styles.homeWheel}>
          <span className={styles.sunCore} />
          {Array.from({ length: 36 }).map((_, index) => (
            <span
              key={index}
              className={styles.sunRay}
              style={{ ['--ray-rotation' as string]: `${index * 10}deg` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
