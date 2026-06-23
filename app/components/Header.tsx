'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '#skills', label: 'Executive summary' },
  { href: '#capabilities', label: 'Capabilities' },
  { href: '#selected-work', label: 'Selected work' },
  { href: '/cv', label: 'CV' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="site-header-inner site-shell">
        <a className="brand" href="/" onClick={() => setOpen(false)}>
          Dimas Prasetyo
        </a>

        <nav className="nav-links" aria-label="Primary">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <a className="button button-compact nav-cta" href="mailto:dimasboim@gmail.com">
          Get in touch
        </a>

        <button
          className="nav-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open ? (
        <nav className="nav-mobile" aria-label="Mobile">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a className="button" href="mailto:dimasboim@gmail.com" onClick={() => setOpen(false)}>
            Get in touch
          </a>
        </nav>
      ) : null}
    </header>
  );
}
