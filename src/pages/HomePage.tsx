import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { Footer } from '../components/layout/Footer';
import { BlueprintBackground } from '../components/common/BlueprintBackground';
import { ToastContainer } from '../components/common/Toast';
import { HeroSection } from '../components/sections/HeroSection';
import { AboutSection } from '../components/sections/AboutSection';
import { EducationSection } from '../components/sections/EducationSection';
import { SkillsSection } from '../components/sections/SkillsSection';
import { ToolsSection } from '../components/sections/ToolsSection';
import { CertificatesSection } from '../components/sections/CertificatesSection';
import { InterestsSection } from '../components/sections/InterestsSection';
import { JournalSection } from '../components/sections/JournalSection';
import { GallerySection } from '../components/sections/GallerySection';
import { MemoriesSection } from '../components/sections/MemoriesSection';
import { ContactSection } from '../components/sections/ContactSection';
import { DataStore } from '../lib/dataStore';
import {
  Profile,
  Education,
  Skill,
  Tool,
  Certificate,
  Interest,
  Post,
  MediaItem,
  Album,
} from '../types';

export const HomePage: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [educationList, setEducationList] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [interests, setInterests] = useState<Interest[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = async () => {
    try {
      const [
        p,
        edu,
        sk,
        tl,
        cert,
        intr,
        pst,
        med,
        alb,
      ] = await Promise.all([
        DataStore.getProfile(),
        DataStore.getEducation(),
        DataStore.getSkills(),
        DataStore.getTools(true),
        DataStore.getCertificates(),
        DataStore.getInterests(),
        DataStore.getPosts(true),
        DataStore.getMedia(false),
        DataStore.getAlbums(false),
      ]);

      setProfile(p);
      setEducationList(edu);
      setSkills(sk);
      setTools(tl);
      setCertificates(cert);
      setInterests(intr);
      setPosts(pst);
      setMediaList(med);
      setAlbums(alb);
    } catch (err) {
      console.error('Error loading portfolio data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading || !profile) {
    return (
      <div className="min-h-screen bg-pastel-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-pastel-deep text-white flex items-center justify-center font-bold text-lg animate-pulse">
            TT
          </div>
          <span className="font-mono text-xs text-pastel-subtext tracking-wider uppercase">
            Loading Cao Đức Tiến Thành Portfolio...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pastel-bg text-pastel-text selection:bg-pastel-primary selection:text-pastel-deep relative">
      <BlueprintBackground />
      <ToastContainer />

      {/* Fixed Left Sidebar on Desktop */}
      <Sidebar />

      {/* Main Content Area: Offset by sidebar width on desktop */}
      <main className="lg:pl-72 relative z-10 min-h-screen pt-16 lg:pt-0">
        <HeroSection profile={profile} />
        <AboutSection profile={profile} />
        <EducationSection educationList={educationList} />
        <SkillsSection skills={skills} />
        <ToolsSection tools={tools} />
        <CertificatesSection certificates={certificates} />
        <InterestsSection interests={interests} />
        <JournalSection posts={posts} />
        <GallerySection mediaList={mediaList} />
        <MemoriesSection albums={albums} onRefreshAlbums={loadData} />
        <ContactSection profile={profile} />
        <Footer />
      </main>
    </div>
  );
};
