'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { TextRoll } from '@/components/atoms/TextRoll';
import { ExternalLink } from 'lucide-react';
import styles from './WorkSection.module.css';

interface Project {
  title: string;
  category: string;
  description: string;
  tech: string[];
  result: string;
  url: string;
}

const PROJECTS: Project[] = [
  {
    title: 'Art Heart',
    category: 'Website Development & Brand Support',
    description:
      'Redesigned and rebuilt a modern, fully responsive web experience and integrated social/community outreach strategies to revitalize Art Heart\'s digital presence.',
    tech: ['Next.js', 'React', 'Framer Motion', 'Vanilla CSS', 'Brand Support'],
    result: 'Fully responsive site & enhanced brand engagement',
    url: 'https://artheart.in',
  },
  {
    title: 'Naya Dharavi',
    category: 'Community Portal & Web Platform',
    description:
      'Designed and engineered a high-performance community platform, featuring interactive maps and business directories, to boost local merchant visibility and preserve cultural narratives.',
    tech: ['Next.js', 'React', 'Mapbox GL', 'Vanilla CSS', 'UI/UX Design'],
    result: 'Registry for 500+ local micro-businesses & enhanced reach',
    url: 'https://re-dharavi.vercel.app/',
  },
  {
    title: 'Bhumee Exports',
    category: 'Product Catalog & Business Website',
    description:
      'Created a professional digital storefront, online product catalog, and secure payment workflows to elevate Bhumee Exports\' global business footprint.',
    tech: ['Next.js', 'React', 'Payment Integration', 'Tailwind CSS', 'UI/UX Design'],
    result: 'Centralized catalog & streamlined payment flow',
    url: 'https://bhumeeexports.com/',
  },
];

export function WorkSection() {
  const rootRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!rootRef.current || prefersReducedMotion) return;

    const context = gsap.context(() => {
      // Parallax scroll for visual background layers
      gsap.to('[data-work-parallax="slow"]', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          scrub: 1,
          start: 'top bottom',
          end: 'bottom top',
        },
      });

      gsap.to('[data-work-parallax="fast"]', {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          scrub: 0.8,
          start: 'top bottom',
          end: 'bottom top',
        },
      });

      gsap.fromTo('[data-work-header]',
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

      gsap.fromTo('[data-work-reveal-line]',
        { yPercent: 108, rotate: 2 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 1.1,
          stagger: 0.12,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

      const isMobile = window.innerWidth < 768;

      const cards = rootRef.current!.querySelectorAll('[data-case-card]');
      cards.forEach((card, i) => {
        const fromLeft = i % 2 === 0;
        const xOffset = isMobile ? 0 : (fromLeft ? -160 : 160);
        const yOffset = isMobile ? 40 : 0;
        gsap.fromTo(card,
          { x: xOffset, y: yOffset, autoAlpha: 0, filter: 'blur(8px)' },
          {
            x: 0,
            y: 0,
            autoAlpha: 1,
            filter: 'blur(0px)',
            ease: 'power1.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 95%',
              end: 'top 55%',
              scrub: 1,
            }
          }
        );
      });
    }, rootRef);

    return () => {
      context.revert();
      ScrollTrigger.refresh();
    };
  }, [prefersReducedMotion]);

  return (
    <section ref={rootRef} id="work" className={styles.work} aria-labelledby="work-title">
      <div className={styles.bgGrid} data-work-parallax="slow" aria-hidden="true" />
      <div className={styles.bgGlow} data-work-parallax="fast" aria-hidden="true" />
      <div className={styles.gradient} aria-hidden="true" />

      <div className={styles.headerWrap} data-work-header>
        {/* Hand icon centered at top */}
        <div className={styles.handWrapper}>
          <img src="/imgs/hand.svg" className={styles.handIcon} alt="" aria-hidden="true" />
        </div>

        {/* Background rotating wheel */}
        <img src="/sun.svg?v=2" className={styles.sunBackground} alt="" aria-hidden="true" />

        <h2 id="work-title" className={styles.sectionTitle}>
          <span style={{ display: 'block', overflow: 'hidden' }}>
            <span style={{ display: 'inline-block' }} data-work-reveal-line>OUR</span>
          </span>
          <span style={{ display: 'block', overflow: 'hidden' }}>
            <span style={{ display: 'inline-block' }} data-work-reveal-line>WORK</span>
          </span>
        </h2>
        <div className={styles.dividerLine} aria-hidden="true" />
      </div>

      <div className={styles.caseList}>
        {PROJECTS.map((project, index) => (
          <a
            key={project.title}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.caseCard} textRollTrigger`}
            data-case-card
          >
            <div className={styles.cardInner}>
              <div className={styles.caseHeader}>
                <span className={styles.caseIndex}>{index + 1}</span>
                <div className={styles.caseMeta}>
                  <span className={styles.caseCategory}>{project.category}</span>
                </div>
              </div>

              <h3 className={styles.caseTitle}>
                <TextRoll text={project.title} />
                <ExternalLink className={styles.externalIcon} size={20} />
              </h3>
              <p className={styles.caseDescription}>{project.description}</p>

              <div className={styles.techTags}>
                {project.tech.map((t) => (
                  <span key={t} className={styles.techTag}>{t}</span>
                ))}
              </div>

              {project.url && (
                <span className={styles.caseLink}>
                  Explore <span className={styles.arrow}>→</span>
                </span>
              )}

              <div className={styles.caseResult}>{project.result}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
