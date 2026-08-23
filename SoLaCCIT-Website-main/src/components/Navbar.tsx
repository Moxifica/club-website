import React, { useState } from 'react';
import { 
  Terminal, 
  Layers, 
  Calendar, 
  Users, 
  Briefcase, 
  Sparkles, 
  UserPlus, 
  Menu, 
  X, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { ClubLogo } from './ClubLogo';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onOpenJoinModal: () => void;
  onOpenAiModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  setActiveSection,
  onOpenJoinModal,
  onOpenAiModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Overview', icon: Terminal },
    { id: 'projects', label: 'Projects', icon: Layers },
    { id: 'events', label: 'Events & Calendar', icon: Calendar },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'networking', label: 'Career Hub', icon: Briefcase },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#070e1a]/95 backdrop-blur-md border-b border-[#142338] text-slate-100">
      {/* Top Notification Announcement Bar */}
      <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-emerald-600 text-white text-xs py-1 px-4 font-medium text-center flex items-center justify-center gap-2">
        <span className="bg-white/15 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase">Next Event</span>
        <span className="truncate max-w-md sm:max-w-none">CGI Tech-Talk & Junior IT Hiring Night — March 4 @ Devalcourt Rm 112</span>
        <button 
          onClick={() => handleNavClick('events')}
          className="hover:text-emerald-200 ml-1 font-semibold text-[11px] underline underline-offset-2 flex items-center gap-0.5"
        >
          Details <ChevronRight className="w-3 h-3 inline" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Branding */}
          <div 
            className="flex items-center gap-3 cursor-pointer group select-none" 
            onClick={() => handleNavClick('home')}
            id="brand-header-link"
          >
            <div className="transition-transform group-hover:scale-105">
              <ClubLogo size="md" variant="shield-only" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-extrabold text-lg tracking-tight text-white">SoLAcc</span>
                <div className="flex items-center gap-1 text-sm font-black tracking-wide font-sans">
                  <span className="text-sky-400">IT</span>
                  <span className="text-emerald-400">CLUB</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide uppercase mt-0.5">South Louisiana Community College</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#0b1727]/60 p-1 rounded-xl border border-[#16273f]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-sky-500/15 text-sky-300 border border-sky-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#13233a]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* AI Advisor Button */}
            <button
              id="open-ai-advisor-header-btn"
              onClick={onOpenAiModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#0b1b2d] border border-sky-500/30 text-sky-300 hover:bg-sky-500/10 hover:border-sky-400 transition-colors"
              title="Open AI Career & Project Advisor"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>AI Advisor</span>
            </button>

            {/* Join Club Button */}
            <button
              id="open-join-club-header-btn"
              onClick={onOpenJoinModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-sm transition-all transform active:scale-95 cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Join Club</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenAiModal}
              className="p-2 rounded-lg bg-[#0b1727] text-sky-300 sm:hidden border border-sky-500/30"
              aria-label="AI Advisor"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#0b1727] text-slate-300 hover:text-white hover:bg-[#122238] border border-[#16273f] transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070e1a] border-b border-[#142338] px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-left ${
                  isActive
                    ? 'bg-sky-500/15 text-sky-300 border border-sky-500/30'
                    : 'text-slate-300 hover:bg-[#0e1c2e] hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 text-sky-400" />
                {item.label}
              </button>
            );
          })}

          <div className="pt-3 border-t border-[#142338] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAiModal();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#0b1b2d] border border-sky-500/30 text-sky-300"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              SoLAcc AI Tech Advisor
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenJoinModal();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950"
            >
              <UserPlus className="w-4 h-4" />
              Join SoLAcc IT Club (Free)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

