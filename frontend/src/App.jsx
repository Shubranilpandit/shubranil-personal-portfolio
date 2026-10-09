import React, { useState } from 'react';
import CinematicWelcome from './components/CinematicWelcome';
import TronBackground from './components/TronBackground';
import Navbar from './components/Navbar';
import SystemHero from './components/SystemHero';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import EducationSection from './components/EducationSection';
import ResumeSection from './components/ResumeSection';
import ContactSection from './components/ContactSection';
import FloatingAudioPlayer from './components/FloatingAudioPlayer';
import Footer from './components/Footer';
import { audioSystem } from './services/audioService';

/**
 * SHUBRANIL PANDIT — MINIMAL TRON DIGITAL IDENTITY SYSTEM
 * Less UI, More Atmosphere.
 * Layer hierarchy:
 * Layer 1: TronBackground Canvas (z-0)
 * Layer 2: Subtle scanlines (z-10)
 * Layer 3: Main content sections (z-20)
 * Layer 4: FloatingAudioPlayer (z-30)
 * Layer 5: Navbar (z-40)
 * Layer 6: Mobile Menu Overlay in Navbar (z-50)
 * Layer 7: ProjectModal (z-60)
 * Layer 8: CinematicWelcome Intro (z-70)
 */
export default function App() {
  const [welcomeComplete, setWelcomeComplete] = useState(false);

  // Preload audio asset so buffer is ready upon welcome completion
  React.useEffect(() => {
    audioSystem.init();
  }, []);

  // Global safety watchdog: guarantees welcome screen cannot block the portfolio indefinitely
  React.useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      setWelcomeComplete((done) => {
        if (!done) {
          console.warn('App safety watchdog: Auto-transitioning to main portfolio.');
          audioSystem.play().catch(() => {});
          return true;
        }
        return done;
      });
    }, 11000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  const handleWelcomeComplete = () => {
    setWelcomeComplete(true);
    // Explicitly trigger soundtrack playback when welcome completes
    audioSystem.play()
      .then((started) => {
        if (started) {
          console.debug('Soundtrack playback active upon welcome completion.');
        }
      })
      .catch((err) => {
        console.debug('Soundtrack playback deferred on welcome completion:', err);
      });
  };

  return (
    <div className="relative min-h-screen bg-tron-void text-tron-text overflow-x-hidden selection:bg-tron-cyan selection:text-black">
      
      {/* Layer 8: Cinematic Opening / Welcome Screen (~8-second Tron Legacy Intro) */}
      {!welcomeComplete && (
        <CinematicWelcome onComplete={handleWelcomeComplete} />
      )}

      {/* Layer 1: High-Performance TRON Grid Canvas */}
      <TronBackground />

      {/* Layer 2: Subtle CRT Scanline overlay effect */}
      <div className="scanlines pointer-events-none fixed inset-0 z-10" aria-hidden="true" />

      {/* Layer 5: 100% Full-Width Responsive Navbar (Drawer is Layer 6 at z-50) */}
      <Navbar />

      {/* Layer 4: Floating Circular Audio Player (z-30 — strictly BELOW mobile menu z-50) */}
      <FloatingAudioPlayer />

      {/* Layer 3: Main Content Sections (z-20) */}
      <main className="relative z-20">
        <SystemHero />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
        <ResumeSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
