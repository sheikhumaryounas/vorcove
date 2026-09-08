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
  onOpenPortal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation, onOpenPortal }) => {
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
      {/* Top Precision Reading Scroll Progress Bar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '2.5px',
          background: 'linear-gradient(90deg, #1E2530 0%, #4A5464 50%, #10B981 100%)',
          transform: `scaleX(${scrollProgress / 100})`,
          transformOrigin: '0 50%',
          zIndex: 100,
          willChange: 'transform',
          transition: 'transform 0.08s linear, opacity 0.2s ease',
          opacity: scrollProgress > 1 ? 1 : 0,
          boxShadow: scrollProgress > 2 ? '0 0 10px rgba(16, 185, 129, 0.4)' : 'none'
        }}
      />

      {/* Sticky Main Header - Stuck directly at top: 0 with compact sleek size */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 90,
          background: isScrolled ? 'rgba(247, 245, 239, 0.94)' : 'rgba(247, 245, 239, 0.88)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border-light)',
          boxShadow: isScrolled ? '0 4px 16px rgba(30, 37, 48, 0.05)' : 'none',
          transition: 'all 0.25s ease'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 24px' }}>
          {/* Logo Brand matching Vorcove Site.dc.html exactly */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}
            aria-label="Vorcove Home"
          >
            <VorcoveLogo markSize={22} fontSize="15.5px" color="var(--ink-primary)" />
          </a>

          {/* Desktop Navigation Links with Underline Hover */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '4px'
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
                  style={{ padding: '6px 10px', fontSize: '13.5px' }}
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
            {/* Studio Portal Button */}
            {onOpenPortal && (
              <button
                onClick={() => {
                  playTactileClick();
                  onOpenPortal();
                }}
                className="nav-underline-link studio-portal-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(0, 0, 0, 0.035)',
                  border: '1px solid var(--border-light)',
                  padding: '5px 11px',
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <span>Studio Portal</span>
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#10B981'
                  }}
                />
              </button>
            )}

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
              style={{ padding: '7px 16px', fontSize: '13px' }}
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
                width: '34px',
                height: '34px',
                borderRadius: '10px',
                border: '1px solid var(--border-light)',
                background: '#FFFFFF',
                color: 'var(--ink-primary)',
                cursor: 'pointer'
              }}
              className="mobile-toggle"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
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
            {/* Studio Portal link in Mobile Dropdown */}
            {onOpenPortal && (
              <button
                onClick={() => {
                  playTactileClick();
                  setMobileMenuOpen(false);
                  onOpenPortal();
                }}
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'var(--ink-primary)',
                  background: 'rgba(0, 0, 0, 0.03)',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                  marginTop: '4px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>Studio Portal</span>
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#10B981'
                    }}
                  />
                </div>
                <ArrowUpRight size={16} color="var(--ink-muted)" />
              </button>
            )}

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
        @media (max-width: 768px) {
          .studio-portal-btn {
            display: none !important;
          }
        }
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
