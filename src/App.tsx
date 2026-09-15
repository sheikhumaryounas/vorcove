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
import { ScrollNavigationControl } from './components/ScrollNavigationControl';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { useGlobalScrollAnimations, scrollToTarget } from './hooks/useGlobalScrollAnimations';

export function App() {
  useGlobalScrollAnimations();
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);

  const scrollToContact = () => {
    scrollToTarget('#contact', { offset: -80 });
  };

  const scrollToDemos = () => {
    scrollToTarget('#demos', { offset: -80 });
  };

  return (
    <div className="page-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Precision Top Reading Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* Real Architectural Studio Atmospheric Background Layer */}
      <div className="bg-atmosphere-layer" aria-hidden="true" />

      {/* Fixed Sticky Navbar */}
      <Navbar
        onOpenConsultation={scrollToContact}
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
      <Footer />

      {/* Floating Scroll Navigation & Quick Action Indicator */}
      <ScrollNavigationControl />

      {/* Menu-Based AI Studio Assistant Widget */}
      <StudioAssistantWidget
        isOpenExternal={isAssistantOpen}
        onCloseExternal={() => setIsAssistantOpen(false)}
      />
    </div>
  );
}

export default App;
