/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { ProjectSubmitModal } from './components/ProjectSubmitModal';
import { EventsRoadmap } from './components/EventsRoadmap';
import { MemberDirectory } from './components/MemberDirectory';
import { CareerNetworkingHub } from './components/CareerNetworkingHub';
import { AiTechAdvisor } from './components/AiTechAdvisor';
import { JoinClubModal } from './components/JoinClubModal';
import { Footer } from './components/Footer';

import { 
  INITIAL_PROJECTS, 
  INITIAL_EVENTS, 
  INITIAL_MEMBERS, 
  INITIAL_CAREER_OPPORTUNITIES, 
  INITIAL_STUDY_CIRCLES, 
  INITIAL_COLLAB_POSTS 
} from './data/mockData';
import { Project, ClubEvent, Member, CollabPost, MemberRegistration } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  
  // Modals state
  const [isSubmitProjectModalOpen, setIsSubmitProjectModalOpen] = useState(false);
  const [isAiAdvisorModalOpen, setIsAiAdvisorModalOpen] = useState(false);
  const [isJoinClubModalOpen, setIsJoinClubModalOpen] = useState(false);

  // Core Data state with initial localStorage fallback
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('solacc_it_projects');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_PROJECTS;
  });

  const [events, setEvents] = useState<ClubEvent[]>(() => {
    const saved = localStorage.getItem('solacc_it_events');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_EVENTS;
  });

  const [members, setMembers] = useState<Member[]>(() => {
    const saved = localStorage.getItem('solacc_it_members');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_MEMBERS;
  });

  const [collabPosts, setCollabPosts] = useState<CollabPost[]>(() => {
    const saved = localStorage.getItem('solacc_it_collab_posts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_COLLAB_POSTS;
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('solacc_it_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('solacc_it_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('solacc_it_members', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem('solacc_it_collab_posts', JSON.stringify(collabPosts));
  }, [collabPosts]);

  // Project Handlers
  const handleAddProject = (newProject: Project) => {
    setProjects((prev) => [newProject, ...prev]);
  };

  const handleLikeProject = (projectId: string) => {
    setProjects((prev) =>
      prev.map((proj) =>
        proj.id === projectId ? { ...proj, likes: proj.likes + 1 } : proj
      )
    );
  };

  const handleAddComment = (projectId: string, text: string, author: string) => {
    const newComment = {
      id: `comment-${Date.now()}`,
      author,
      text,
      createdAt: 'Just now',
    };

    setProjects((prev) =>
      prev.map((proj) =>
        proj.id === projectId
          ? { ...proj, comments: [newComment, ...proj.comments] }
          : proj
      )
    );
  };

  // Event RSVP Handler
  const handleRsvpEvent = (eventId: string) => {
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === eventId ? { ...ev, rsvpCount: ev.rsvpCount + 1 } : ev
      )
    );
  };

  // Collab Post Handler
  const handleAddCollabPost = (newPost: CollabPost) => {
    setCollabPosts((prev) => [newPost, ...prev]);
  };

  // Member Registration Handler
  const handleMemberRegistered = (reg: MemberRegistration) => {
    const newMember: Member = {
      id: `member-${Date.now()}`,
      name: reg.fullName,
      role: 'Member',
      title: 'Active Student Member',
      concentration: reg.concentration,
      campus: reg.campus,
      bio: reg.careerGoals || `Passionate about ${reg.interests.join(', ')}.`,
      skills: reg.interests,
      certifications: [],
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(reg.fullName)}`,
      email: reg.email,
      isMentor: false,
    };
    setMembers((prev) => [newMember, ...prev]);
  };

  // Smooth scroll helper
  const navigateToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950 flex flex-col">
      {/* Top Navbar */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenJoinModal={() => setIsJoinClubModalOpen(true)}
        onOpenAiModal={() => setIsAiAdvisorModalOpen(true)}
      />

      {/* Main Sections */}
      <main className="flex-1">
        {/* Section 1: Hero */}
        <div id="home">
          <Hero
            onExploreProjects={() => navigateToSection('projects')}
            onExploreEvents={() => navigateToSection('events')}
            onOpenJoinModal={() => setIsJoinClubModalOpen(true)}
            onOpenAiAdvisor={() => setIsAiAdvisorModalOpen(true)}
          />
        </div>

        {/* Section 2: Projects Showcase */}
        <ProjectsShowcase
          projects={projects}
          onOpenSubmitModal={() => setIsSubmitProjectModalOpen(true)}
          onLikeProject={handleLikeProject}
          onAddComment={handleAddComment}
        />

        {/* Section 3: Events, Workshops & Semester Roadmap */}
        <EventsRoadmap
          events={events}
          onRsvpEvent={handleRsvpEvent}
        />

        {/* Section 4: Members, Officers & Alumni */}
        <MemberDirectory
          members={members}
        />

        {/* Section 5: Tech Networking & Career Bridges */}
        <CareerNetworkingHub
          opportunities={INITIAL_CAREER_OPPORTUNITIES}
          studyCircles={INITIAL_STUDY_CIRCLES}
          collabPosts={collabPosts}
          onAddCollabPost={handleAddCollabPost}
          onOpenJoinModal={() => setIsJoinClubModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenJoinModal={() => setIsJoinClubModalOpen(true)}
        onOpenAiAdvisor={() => setIsAiAdvisorModalOpen(true)}
        onNavigateSection={navigateToSection}
      />

      {/* Modals */}
      <ProjectSubmitModal
        isOpen={isSubmitProjectModalOpen}
        onClose={() => setIsSubmitProjectModalOpen(false)}
        onSubmitProject={handleAddProject}
      />

      <AiTechAdvisor
        isOpen={isAiAdvisorModalOpen}
        onClose={() => setIsAiAdvisorModalOpen(false)}
      />

      <JoinClubModal
        isOpen={isJoinClubModalOpen}
        onClose={() => setIsJoinClubModalOpen(false)}
        onMemberRegistered={handleMemberRegistered}
      />
    </div>
  );
}
