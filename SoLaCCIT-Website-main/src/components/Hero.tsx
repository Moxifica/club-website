import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Network, 
  Code2, 
  Calendar, 
  MapPin,
  CheckCircle2,
  Terminal,
  ExternalLink
} from 'lucide-react';
import { ClubLogo } from './ClubLogo';

interface HeroProps {
  onExploreProjects: () => void;
  onExploreEvents: () => void;
  onOpenJoinModal: () => void;
  onOpenAiAdvisor: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreProjects,
  onExploreEvents,
  onOpenJoinModal,
  onOpenAiAdvisor,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#060d17] text-slate-100 pt-10 pb-14 lg:py-16 border-b border-[#142338]">
      {/* Subtle Minimal Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Hero Brand & Value Prop */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Campus & Cohort Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a1626] border border-[#162a45] text-xs text-slate-300 shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-semibold text-emerald-400">Spring 2026 Active Cohort</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-300">South Louisiana Community College</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.18]">
              Empowering Tech Innovation & Leadership at{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-emerald-400">
                SoLAcc
              </span>
            </h1>

            {/* Subtitle description */}
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              The official hub for students passionate about <span className="text-white font-medium">Cybersecurity</span>, <span className="text-white font-medium">Software & Web Development</span>, <span className="text-white font-medium">Cloud Infrastructure</span>, and <span className="text-white font-medium">Hardware Engineering</span>. Build real-world portfolio projects, earn certifications, and connect with Louisiana tech industry leaders.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
              <button
                id="hero-join-club-btn"
                onClick={onOpenJoinModal}
                className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-sm transition-all transform active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <span>Join SoLAcc IT Club (Free)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-explore-projects-btn"
                onClick={onExploreProjects}
                className="px-4 py-2.5 rounded-lg bg-[#0a1626] hover:bg-[#102036] text-slate-200 border border-[#182e4e] hover:border-sky-500/40 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <Code2 className="w-4 h-4 text-sky-400" />
                <span>Explore Projects</span>
              </button>

              <button
                id="hero-ai-advisor-btn"
                onClick={onOpenAiAdvisor}
                className="px-4 py-2.5 rounded-lg bg-[#0b1b2d] text-sky-300 border border-sky-500/30 hover:border-sky-400/60 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>AI Career Mentor</span>
              </button>
            </div>

            {/* Quick Meeting Info */}
            <div className="pt-4 border-t border-[#132338] flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                <span>Lafayette Main (Devalcourt 214) & All Regional Campuses</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                <span>Bi-Weekly Thursdays @ 5:30 PM CST</span>
              </div>
            </div>
          </div>

          {/* Right Column: Minimalist Brand Shield & Terminal Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-[#0a1626] border border-[#152740] shadow-xl p-5 backdrop-blur-sm">
              {/* Header with Logo Emblem & Status */}
              <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-[#142338]">
                <div className="flex items-center gap-3">
                  <ClubLogo size="sm" variant="shield-only" />
                  <div>
                    <div className="flex items-center gap-1 font-bold text-xs">
                      <span className="text-white">SoLAcc</span>
                      <span className="text-sky-400">IT</span>
                      <span className="text-emerald-400">CLUB</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">Official Student Chapter</span>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                  ACTIVE • 2026
                </span>
              </div>

              {/* Core Pillars */}
              <div className="font-mono text-xs space-y-2.5">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-lg bg-[#060e1a] border border-[#142338] flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-white text-[11px]">Cyber Defense & CTF</div>
                      <div className="text-[10px] text-slate-400">Packet labs & hardening</div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#060e1a] border border-[#142338] flex items-start gap-2">
                    <Code2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-white text-[11px]">App & Web Dev</div>
                      <div className="text-[10px] text-slate-400">Fullstack React & Python</div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#060e1a] border border-[#142338] flex items-start gap-2">
                    <Network className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-white text-[11px]">Cloud & Homelab</div>
                      <div className="text-[10px] text-slate-400">Proxmox rack & Cisco</div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#060e1a] border border-[#142338] flex items-start gap-2">
                    <Cpu className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-white text-[11px]">CGI & Tech Network</div>
                      <div className="text-[10px] text-slate-400">Acadiana hiring bridges</div>
                    </div>
                  </div>
                </div>

                {/* Live Activity snippet */}
                <div className="p-3 rounded-lg bg-[#060e1a] border border-[#142338] text-[11px] text-slate-300 space-y-1.5 font-sans">
                  <div className="text-slate-400 flex items-center justify-between text-[10px]">
                    <span className="font-mono text-slate-400">Recent Highlights</span>
                    <span className="text-emerald-400 font-mono">Live</span>
                  </div>
                  <div className="text-slate-200 flex items-center gap-1.5 text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span>CajunNet Packet Sniffer v2.1 pushed to Showcase</span>
                  </div>
                  <div className="text-slate-200 flex items-center gap-1.5 text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>CompTIA Security+ Study Jam: 18 students RSVPed</span>
                  </div>
                </div>

                {/* Quick Join Prompt */}
                <div className="pt-1 flex items-center justify-between text-[11px] font-sans">
                  <span className="text-slate-400">Free membership for all majors</span>
                  <button
                    onClick={onOpenJoinModal}
                    className="text-emerald-400 font-semibold hover:text-emerald-300 inline-flex items-center gap-1 cursor-pointer"
                  >
                    Get Member Pass →
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Minimalist Stats Row */}
        <div className="mt-12 pt-8 border-t border-[#142338] grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3.5 rounded-xl bg-[#0a1626]/70 border border-[#142338]">
            <div className="text-2xl sm:text-3xl font-extrabold text-white">85+</div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">Active IT Members & Alumni</div>
          </div>
          <div className="p-3.5 rounded-xl bg-[#0a1626]/70 border border-[#142338]">
            <div className="text-2xl sm:text-3xl font-extrabold text-sky-400">24+</div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">Student Showcase Projects</div>
          </div>
          <div className="p-3.5 rounded-xl bg-[#0a1626]/70 border border-[#142338]">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">12+</div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">Workshops & Guest Talks</div>
          </div>
          <div className="p-3.5 rounded-xl bg-[#0a1626]/70 border border-[#142338]">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-100">$0</div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">Membership Fee (Free)</div>
          </div>
        </div>

      </div>
    </section>
  );
};
