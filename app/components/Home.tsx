'use client';

import React, { useRef } from 'react';
import { motion, easeOut, easeInOut, useScroll, useSpring } from 'framer-motion';
import { Briefcase, Building2, TrendingUp, Mail, ArrowRight, Cpu, ClipboardList, Camera, Link, ChevronDown, Users } from 'lucide-react';
import type { SkillGroup } from '@/lib/data/skills';
import CountUp from './CountUp';
import Carousel, { type Slide } from './Carousel';
import ParallaxOrbs from './ParallaxOrbs';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const card = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: easeOut },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: easeOut },
  },
};

type HomeProps = {
  skillGroups: SkillGroup[];
  projects: Slide[];
  testimonials: Slide[];
};

export default function Home({ skillGroups, projects, testimonials }: HomeProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const sectionRef1 = useRef<HTMLElement | null>(null);
  const sectionRef2 = useRef<HTMLElement | null>(null);
  const sectionRef3 = useRef<HTMLElement | null>(null);
  return (
    <motion.main className="site-shell" initial="hidden" animate="visible" variants={stagger}>
      {/* Scroll Progress Bar */}
      <motion.div className="scroll-progress" style={{ scaleX }} />
      {/* Hero Section */}
      <motion.section className="hero" variants={fadeUp} viewport={{ once: true, amount: 0.2 }}>
        <motion.div className="hero-copy" variants={stagger}>
          <motion.p className="eyebrow" variants={card}>
            Senior Technology Leader
          </motion.p>
          <motion.h1 variants={card}>
            Hi, I'm Dimas — a senior tech leader from Jakarta.
          </motion.h1>
          <motion.p className="intro" variants={card}>
            I help teams build digital platforms, scale engineering organizations, and
            execute technology transformations with strong business outcomes.
          </motion.p>
          <motion.div className="hero-actions" variants={stagger}>
            <motion.a className="button" href="mailto:dimasboim@gmail.com" variants={card} whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Mail size={18} strokeWidth={2.5} />
              Contact me
            </motion.a>
            <motion.a className="button button-secondary" href="#selected-work" variants={card} whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
              View work
              <ArrowRight size={18} strokeWidth={2.5} />
            </motion.a>
            <motion.a className="button button-secondary" href="/cv" variants={card} whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
              View CV
            </motion.a>
            <motion.a className="button button-secondary" href="https://instagram.com/dimasboim" variants={card} whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} target="_blank" rel="noopener noreferrer">
              <Camera size={16} /> IG
            </motion.a>
            <motion.a className="button button-secondary" href="https://www.linkedin.com/in/dimasprasetyotegar" variants={card} whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} target="_blank" rel="noopener noreferrer">
              <Link size={16} /> LinkedIn
            </motion.a>
          </motion.div>

          {/* Stats Grid */}
          <motion.div className="stats-grid" variants={stagger}>
            <motion.div className="stat-card stat-green" variants={card} whileHover={{ scale: 1.05, y: -5 }}>
              <motion.div
                className="stat-icon"
                initial={{ rotate: -10 }}
                whileInView={{ rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Briefcase size={28} strokeWidth={2} />
              </motion.div>
              <span className="stat-number"><CountUp to={15} suffix="+" /></span>
              <p className="stat-label">Years experience</p>
            </motion.div>
            <motion.div className="stat-card stat-yellow" variants={card} whileHover={{ scale: 1.05, y: -5 }}>
              <motion.div
                className="stat-icon"
                initial={{ rotate: 10 }}
                whileInView={{ rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Building2 size={28} strokeWidth={2} />
              </motion.div>
              <span className="stat-number"><CountUp to={3} /></span>
              <p className="stat-label">Executive roles</p>
            </motion.div>
            <motion.div className="stat-card stat-orange" variants={card} whileHover={{ scale: 1.05, y: -5 }}>
              <motion.div
                className="stat-icon"
                initial={{ rotate: -10 }}
                whileInView={{ rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <TrendingUp size={28} strokeWidth={2} />
              </motion.div>
              <span className="stat-number"><CountUp to={20} suffix="+" /></span>
              <p className="stat-label">Growth initiatives</p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Hero Visual with animated gradient */}
        <motion.div className="hero-visual hero-visual-animated" variants={scaleIn} transition={{ duration: 1, ease: easeOut }}>
          <motion.div
            className="media-shell"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            whileHover={{ y: -10, scale: 1.02 }}
          >
            <motion.img
              src="/images/image-1.jpg"
              alt="Dimas Prasetyo leadership"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: easeInOut }}
            />
            <div className="media-caption">
              <p>Digital leadership for product, operations, and enterprise impact.</p>
            </div>
          </motion.div>
        </motion.div>
        {/* Scroll indicator to next section */}
        <motion.a href="#skills" className="scroll-indicator" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} whileHover={{ y: -2 }}>
          <ChevronDown size={18} />
        </motion.a>
      </motion.section>

      {/* Executive Summary */}
      <motion.section ref={sectionRef1} id="skills" className="section features" variants={fadeUp} viewport={{ once: true, amount: 0.2 }}>
        <ParallaxOrbs containerRef={sectionRef1} />
        <div className="section-intro">
          <p className="section-label">Executive summary</p>
          <h2>Operator CTO with a track record of shipping, scaling, and transforming.</h2>
        </div>
        <motion.div className="feature-grid" variants={stagger}>
          <motion.article className="feature-card" variants={card} whileHover={{ y: -10, scale: 1.02 }}>
            <h3>Strategy to impact</h3>
            <p>Translate business goals into a durable tech strategy, value-focused roadmaps, and measurable outcomes across product, platform, and data.</p>
          </motion.article>
          <motion.article className="feature-card" variants={card} whileHover={{ y: -10, scale: 1.02 }}>
            <h3>Scaling teams</h3>
            <p>Build accountable, high-trust engineering organizations with strong leadership pipelines, good rituals, and pragmatic process.</p>
          </motion.article>
          <motion.article className="feature-card" variants={card} whileHover={{ y: -10, scale: 1.02 }}>
            <h3>Delivery excellence</h3>
            <p>Ship early and often. Establish lean governance, quality bars, and platform foundations to accelerate iteration at scale.</p>
          </motion.article>
        </motion.div>
      </motion.section>

      {/* Leadership Principles */}
      <motion.section ref={sectionRef2} className="section features" variants={fadeUp} viewport={{ once: true, amount: 0.2 }}>
        <ParallaxOrbs containerRef={sectionRef2} />
        <div className="section-intro">
          <p className="section-label">Leadership principles</p>
          <h2>How I lead product, people, and platforms.</h2>
        </div>
        <motion.div className="feature-grid" variants={stagger}>
          <motion.article className="feature-card" variants={card} whileHover={{ y: -8 }}>
            <h3>Customer and business first</h3>
            <p>Prioritize outcomes over output. Tie every initiative to clear customer value and business impact.</p>
          </motion.article>
          <motion.article className="feature-card" variants={card} whileHover={{ y: -8 }}>
            <h3>Clarity and alignment</h3>
            <p>Write strategy down. Communicate simply. Ensure teams understand the why, the boundaries, and the bets.</p>
          </motion.article>
          <motion.article className="feature-card" variants={card} whileHover={{ y: -8 }}>
            <h3>Systems over heroes</h3>
            <p>Create standards, tooling, and platforms that make the right thing easy and the hard thing possible.</p>
          </motion.article>
        </motion.div>
      </motion.section>

      {/* Advisory & Boards */}
      <motion.section ref={sectionRef3} className="section features" variants={fadeUp} viewport={{ once: true, amount: 0.2 }}>
        <ParallaxOrbs containerRef={sectionRef3} />
        <div className="section-intro">
          <p className="section-label">Advisory & boards</p>
          <h2>Advisor to founders and operators on product, data, and scale.</h2>
        </div>
        <motion.div className="feature-grid" variants={stagger}>
          <motion.article className="feature-card" variants={card}>
            <h3>Startup advisory</h3>
            <p>Seed to Series B. Product-market fit, first platforms, and hiring your first 10 engineers.</p>
          </motion.article>
          <motion.article className="feature-card" variants={card}>
            <h3>Enterprise transformation</h3>
            <p>Operating models, cloud migration, data platforms, and vendor strategy to accelerate delivery.</p>
          </motion.article>
          <motion.article className="feature-card" variants={card}>
            <h3>Due diligence</h3>
            <p>Commercial and technical diligence for investors on product, architecture, and organization health.</p>
          </motion.article>
        </motion.div>
      </motion.section>

      {/* Skills Section */}
      <motion.section id="capabilities" className="section features" variants={fadeUp} viewport={{ once: true, amount: 0.2 }}>
        <div className="section-intro">
          <p className="section-label">Skills</p>
          <h2>Core technical, delivery, and leadership capabilities.</h2>
        </div>
        <motion.div className="skills-groups" variants={stagger}>
          {skillGroups.map((group) => {
            const icon = group.title === 'Technology' ? (
              <Cpu size={18} />
            ) : group.title === 'Delivery' ? (
              <ClipboardList size={18} />
            ) : (
              <Users size={18} />
            );
            return (
              <motion.div key={group.title} className="skills-group" variants={card}>
                <div className="skills-heading-row">
                  <div className="skills-heading-left">
                    <span className="skills-heading-icon">{icon}</span>
                    <h3 className="skills-heading">{group.title}</h3>
                  </div>
                  <span className="skills-count" aria-label={`${group.items.length} skills`}>
                    {group.items.length}
                  </span>
                </div>
                <div className="skills-grid">
                  {group.items.map((skill) => (
                    <span key={skill} className="skill-chip">{skill}</span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.section>

      {/* Selected Work Section — Carousel */}
      <motion.section className="section selected" id="selected-work" variants={fadeUp} viewport={{ once: true, amount: 0.2 }}>
        <div className="section-intro">
          <p className="section-label">Selected work</p>
          <h2>Key milestones shaping my career journey.</h2>
        </div>
        <Carousel slides={projects} autoPlayMs={5500} ariaLabel="Selected work" />
      </motion.section>

      {/* Speaking & Writing */}
      <motion.section className="section features" variants={fadeUp} viewport={{ once: true, amount: 0.2 }}>
        <div className="section-intro">
          <p className="section-label">Speaking & writing</p>
          <h2>Sharing learnings on leadership, platforms, and product.</h2>
        </div>
        <motion.div className="feature-grid" variants={stagger}>
          <motion.article className="feature-card" variants={card}>
            <h3>Conference talks</h3>
            <p>Engineering leadership, platform building, and org design across SEA tech events.</p>
          </motion.article>
          <motion.article className="feature-card" variants={card}>
            <h3>Writing</h3>
            <p>Essays on scaling teams, designing platforms, and mapping strategy to delivery.</p>
          </motion.article>
          <motion.article className="feature-card" variants={card}>
            <h3>Mentoring</h3>
            <p>1:1 with engineering managers and staff engineers on career growth and craft.</p>
          </motion.article>
        </motion.div>
      </motion.section>

      {/* Testimonials Slider */}
      {testimonials.length > 0 && (
        <motion.section className="section features" variants={fadeUp} viewport={{ once: true, amount: 0.2 }}>
          <div className="section-intro">
            <p className="section-label">Testimonials</p>
            <h2>Trusted by founders and operators.</h2>
          </div>
          <Carousel slides={testimonials} autoPlayMs={6000} ariaLabel="Testimonials" imageVariant="logo" />
        </motion.section>
      )}

      {/* Contact Section */}
      <motion.section id="contact" className="section contact" variants={fadeUp} viewport={{ once: true, amount: 0.2 }}>
        <motion.div className="section-copy" variants={scaleIn}>
          <p className="section-label">Contact</p>
          <h2>Ready to shape tech, product, and people?</h2>
          <p>Let's connect on leadership, transformation, or digital strategy.</p>
          <motion.a
            className="button button-primary"
            href="mailto:dimasboim@gmail.com"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            <Mail size={18} strokeWidth={2.5} />
            dimasboim@gmail.com
          </motion.a>
          <motion.a
            className="button button-secondary"
            href="/cv/dimas-prasetyo-cv.pdf"
            download
            style={{ marginLeft: '0.75rem' }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Download CV
          </motion.a>
          <motion.div className="social-links" variants={stagger}>
            <a className="social-link" href="https://instagram.com/dimasboim" target="_blank" rel="noopener noreferrer">
              <Camera size={16} /> @dimasboim
            </a>
            <a className="social-link" href="https://www.linkedin.com/in/dimasprasetyotegar" target="_blank" rel="noopener noreferrer">
              <Link size={16} /> in/dimasprasetyotegar
            </a>
          </motion.div>
        </motion.div>
      </motion.section>
    </motion.main>
  );
}
