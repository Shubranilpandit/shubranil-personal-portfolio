import React, { useState, useEffect, useCallback } from 'react';
import TronCanvas from './components/TronCanvas';
import BootScreen from './components/BootScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Resume from './components/Resume';
import GitHubActivity from './components/GitHubActivity';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SystemStatusModal from './components/SystemStatusModal';
import InteractiveTerminal from './components/InteractiveTerminal';
import AdminDashboard from './components/AdminDashboard';
import TronMusicPlayer from './components/TronMusicPlayer';
import { api } from './services/api';
import { sound } from './services/soundService';

export default function App() {
  const [bootComplete, setBootComplete] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(() => {
    return localStorage.getItem('tron_audio_enabled') === 'true';
  });

  // Modals
  const [isHealthOpen, setIsHealthOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Data
  const [systemStatus, setSystemStatus] = useState('ONLINE');
  const [profile, setProfile] = useState(null);
  const [skillsData, setSkillsData] = useState({ categories: [], all_skills: [] });
  const [projects, setProjects] = useState([]);
  const [projectCategories, setProjectCategories] = useState(['All']);
  const [educationList, setEducationList] = useState([]);
  const [experienceList, setExperienceList] = useState([]);
  const [achievementsList, setAchievementsList] = useState([]);
  const [githubData, setGithubData] = useState(null);

  const fetchAllData = useCallback(async () => {
    try {
      const [profRes, skillsRes, projsRes, eduRes, expRes, achRes, ghRes, healthRes] =
        await Promise.allSettled([
          api.getProfile(),
          api.getSkills(),
          api.getProjects(),
          api.getEducation(),
          api.getExperience(),
          api.getAchievements(),
          api.getGithub(),
          api.getHealth(),
        ]);

      if (profRes.status === 'fulfilled') setProfile(profRes.value.data);
      if (skillsRes.status === 'fulfilled') setSkillsData(skillsRes.value);
      if (projsRes.status === 'fulfilled') {
        setProjects(projsRes.value.data || []);
        if (projsRes.value.categories) setProjectCategories(projsRes.value.categories);
      }
      if (eduRes.status === 'fulfilled') setEducationList(eduRes.value.data || []);
      if (expRes.status === 'fulfilled') setExperienceList(expRes.value.data || []);
      if (achRes.status === 'fulfilled') setAchievementsList(achRes.value.data || []);
      if (ghRes.status === 'fulfilled') setGithubData(ghRes.value.data);
      if (healthRes.status === 'fulfilled') setSystemStatus(healthRes.value.status || 'ONLINE');
    } catch (err) {
      console.warn("Portfolio data fetch notice:", err);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  return (
    <div className="relative min-h-screen bg-tron-void text-tron-text overflow-x-hidden">
      
      {/* TRON Digital Grid & Particle Canvas */}
      <TronCanvas />

      {/* Subtle CRT Scanline overlay effect */}
      <div className="scanlines" aria-hidden="true" />

      {/* Cinematic Boot Screen (first load with audio enablement prompt) */}
      {!bootComplete && (
        <BootScreen
          onComplete={() => setBootComplete(true)}
          onEnableAudio={() => setIsAudioEnabled(true)}
        />
      )}

      {/* 100% Full-Width Top Navigation HUD with Futuristic Burger Menu */}
      <Navbar
        systemStatus={systemStatus}
        onOpenHealth={() => setIsHealthOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onToggleAudioPlayer={() => setIsAudioEnabled(prev => !prev)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero
          profile={profile}
          onOpenTerminal={() => setIsTerminalOpen(true)}
        />

        <About profile={profile} />

        <Skills skillsData={skillsData} />

        <Projects
          projects={projects}
          categories={projectCategories}
        />

        <Education educationList={educationList} />

        <Experience experienceList={experienceList} />

        <Achievements achievementsList={achievementsList} />

        <GitHubActivity githubData={githubData} />

        <Resume />

        <Contact />
      </main>

      {/* Technical Footer */}
      <Footer
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Auxiliary Interactive Modals */}
      <SystemStatusModal
        isOpen={isHealthOpen}
        onClose={() => setIsHealthOpen(false)}
      />

      <InteractiveTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        projects={projects}
        skills={skillsData?.all_skills || []}
        profile={profile}
      />

      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onDataUpdated={fetchAllData}
      />

      {/* TRON: Legacy "End of Line" Music Player Module */}
      <TronMusicPlayer
        isAudioEnabled={isAudioEnabled}
        onEnableAudio={() => setIsAudioEnabled(true)}
      />

    </div>
  );
}
