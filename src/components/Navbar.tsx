import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../data/content';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { playTactileClick } from '../utils/audio';
import { VorcoveLogo } from './VorcoveLogo';

interface NavbarProps {
  onOpenConsultation?: () => void;
  onOpenAssistant?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollProgress = useScrollProgress();
  const activeSection = useScrollSpy([
    'services',
    'revenue',
    'approach',
    'demos',
    'comparison',
    'architecture',
    'work',
    'calculator',
    'faq',
    'contact'
  ], 120);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    playTactileClick();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Reading Scroll Indicator Bar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'var(--ink-primary)',
          transform: `scaleX(${scrollProgress / 100})`,
          transformOrigin: '0 50%',
          zIndex: 100,
          willChange: 'transform',
          transition: 'transform 0.05s linear'
        }}
      />

      {/* TapTile-style Top Notice Announcement Bar */}
      <div className="top-announcement-bar">
        <span className="top-announcement-pill">
          ⚡ Launching Q4 Squads
        </span>
        <span style={{ letterSpacing: '0.02em', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <span>Enterprise AI & Full-Stack Product Network</span>
          <span style={{ opacity: 0.5 }}>•</span>
          <span style={{ fontWeight: 600 }}>First working demo in 14 days</span>
        </span>
        <a
          href="#contact"
          onClick={(e) => handleLinkClick(e, '#contact')}
          style={{
            color: '#FFFFFF',
            fontWeight: 700,
            textDecoration: 'underline',
            fontSize: '12px',
            marginLeft: '4px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '3px'
          }}
        >
          <span>Book slot →</span>
        </a>
      </div>

      <header
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 90,
          background: isScrolled ? 'rgba(247, 245, 239, 0.94)' : 'rgba(247, 245, 239, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '2px solid var(--ink-primary)',
          boxShadow: isScrolled ? '0 4px 12px rgba(30, 37, 48, 0.06)' : 'none',
          transition: 'all 0.25s ease'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px' }}>
          {/* Logo Brand matching Vorcove Site.dc.html exactly */}
          <a
            href="#top"
            onClick={(e) => handleLinkClick(e, '#top')}
            style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}
            aria-label="Vorcove Home"
          >
            <VorcoveLogo markSize={26} fontSize="17px" color="var(--ink-primary)" />
          </a>

          {/* Desktop Navigation Links with Underline Hover */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '6px'
            }}
            className="desktop-nav"
          >
            {NAV_LINKS.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={`nav-underline-link ${isActive ? 'active' : ''}`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="nav-badge-pill">
                      {item.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Quick Action Start Project */}
            <a
              href="#contact"
              onClick={(e) => {
                playTactileClick();
                if (onOpenConsultation) {
                  onOpenConsultation();
                } else {
                  handleLinkClick(e, '#contact');
                }
              }}
              className="btn-primary"
            >
              <span>Start a project</span>
              <span className="pulse-dot" />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => {
                playTactileClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                border: '1px solid var(--border-light)',
                background: '#FFFFFF',
                color: 'var(--ink-primary)',
                cursor: 'pointer'
              }}
              className="mobile-toggle"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            style={{
              background: 'rgba(247, 245, 239, 0.98)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--border-light)',
              padding: '16px 24px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            {NAV_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: 500,
                  color: 'var(--ink-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>{item.label}</span>
                {item.badge ? (
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      background: '#10B981',
                      color: '#FFFFFF',
                      padding: '2px 8px',
                      borderRadius: '999px'
                    }}
                  >
                    {item.badge}
                  </span>
                ) : (
                  <ArrowUpRight size={16} color="var(--ink-muted)" />
                )}
              </a>
            ))}
            <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--border-light)' }}>
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Book a scoping call →
              </a>
            </div>
          </div>
        )}
      </header>

      <style>{`
        @media (min-width: 960px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};
