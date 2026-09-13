import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarqueeTicker } from './components/MarqueeTicker';
import { BentoGrid } from './components/BentoGrid';
import { Approach } from './components/Approach';
import { LiveDemos } from './components/LiveDemos';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { ArchitectureFlow } from './components/ArchitectureFlow';
import { RoiCalculator } from './components/RoiCalculator';
import { TechStack } from './components/TechStack';
import { Testimonials } from './components/Testimonials';
import { FaqAccordion } from './components/FaqAccordion';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { StudioAssistantWidget } from './components/StudioAssistantWidget';
import { AdminPortal } from './components/AdminPortal';
import { ScrollNavigationControl } from './components/ScrollNavigationControl';
import { useGlobalScrollAnimations } from './hooks/useGlobalScrollAnimations';

export function App() {
  useGlobalScrollAnimations();
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);
  const [isPortalOpen, setIsPortalOpen] = useState<boolean>(false);

  const scrollToContact = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToDemos = () => {
    const demosEl = document.getElementById('demos');
    if (demosEl) {
      demosEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="page-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Real Architectural Studio Atmospheric Background Layer */}
      <div className="bg-atmosphere-layer" aria-hidden="true" />

      {/* Fixed Sticky Navbar */}
      <Navbar
        onOpenConsultation={scrollToContact}
        onOpenPortal={() => setIsPortalOpen(true)}
      />

      {/* Main Sections Stack */}
      <main style={{ flex: 1 }}>
        {/* Editorial Hero with Live Agent Terminal */}
        <Hero onExploreDemos={scrollToDemos} />

        {/* Marquee Ticker */}
        <MarqueeTicker />

        {/* 2026 Bento Grid Services Architecture */}
        <BentoGrid />

        {/* 4-Step Velocity Loop & Stats */}
        <Approach />

        {/* Interactive Live Product Demos */}
        <LiveDemos />

        {/* The Vorcove Contrast (Traditional Consulting vs Vorcove) */}
        <BeforeAfterSlider />

        {/* Deterministic Pipeline Flow & Code Inspector */}
        <ArchitectureFlow />

        {/* Interactive ROI & Scope Estimator */}
        <RoiCalculator />

        {/* Enterprise Tech Stack */}
        <TechStack />

        {/* Executive Feedback & Testimonials */}
        <Testimonials />

        {/* FAQ Accordion */}
        <FaqAccordion />

        {/* High-Converting Contact Section */}
        <ContactSection />
      </main>

      {/* Studio Footer */}
      <Footer onOpenPortal={() => setIsPortalOpen(true)} />

      {/* Floating Scroll Navigation & Quick Action Indicator */}
      <ScrollNavigationControl />

      {/* Menu-Based AI Studio Assistant Widget */}
      <StudioAssistantWidget
        isOpenExternal={isAssistantOpen}
        onCloseExternal={() => setIsAssistantOpen(false)}
      />

      {/* Studio Executive Admin Portal & Telemetry */}
      <AdminPortal
        isOpen={isPortalOpen}
        onClose={() => setIsPortalOpen(false)}
      />
    </div>
  );
}

export default App;
