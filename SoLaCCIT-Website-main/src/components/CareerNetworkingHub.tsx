import React, { useState } from 'react';
import { 
  Briefcase, 
  Award, 
  Users, 
  MapPin, 
  DollarSign, 
  ExternalLink, 
  Plus, 
  BookOpen, 
  ShieldCheck, 
  Cloud, 
  Network, 
  Code2,
  CheckCircle2,
  Building2
} from 'lucide-react';
import { CareerOpportunity, StudyCircle, CollabPost } from '../types';
import { CollabBoardModal } from './CollabBoardModal';

interface CareerNetworkingHubProps {
  opportunities: CareerOpportunity[];
  studyCircles: StudyCircle[];
  collabPosts: CollabPost[];
  onAddCollabPost: (post: CollabPost) => void;
  onOpenJoinModal: () => void;
}

export const CareerNetworkingHub: React.FC<CareerNetworkingHubProps> = ({
  opportunities,
  studyCircles,
  collabPosts,
  onAddCollabPost,
}) => {
  const [activeTab, setActiveTab] = useState<'jobs' | 'study' | 'collab'>('jobs');
  const [isCollabModalOpen, setIsCollabModalOpen] = useState(false);
  const [repliedPostId, setRepliedPostId] = useState<string | null>(null);

  const getCertIcon = (certName: string) => {
    if (certName.includes('Security')) return ShieldCheck;
    if (certName.includes('AWS') || certName.includes('Cloud')) return Cloud;
    if (certName.includes('Cisco') || certName.includes('Network')) return Network;
    return Code2;
  };

  return (
    <section id="networking" className="py-14 bg-[#060d17] text-slate-100 border-b border-[#142338]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 tracking-wider uppercase mb-1.5 font-mono">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Tech Networking & Career Bridges</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Acadiana Career & Study Hub
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl mt-1 leading-relaxed">
              Connect directly with local tech opportunities, join structured certification study circles, and team up with fellow SoLAcc peers.
            </p>
          </div>

          {/* Sub-Navigation Tabs */}
          <div className="flex rounded-lg bg-[#0a1626] border border-[#16273f] p-1 self-start md:self-auto overflow-x-auto">
            <button
              onClick={() => setActiveTab('jobs')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition whitespace-nowrap cursor-pointer ${
                activeTab === 'jobs'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Tech Jobs & Internships</span>
            </button>

            <button
              onClick={() => setActiveTab('study')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition whitespace-nowrap cursor-pointer ${
                activeTab === 'study'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Study Circles & Certs</span>
            </button>

            <button
              onClick={() => setActiveTab('collab')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition whitespace-nowrap cursor-pointer ${
                activeTab === 'collab'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Student Peer Collab</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Local Tech Jobs & Internships */}
        {activeTab === 'jobs' && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-[#0a1626] border border-[#142338] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>
                  Curated entry-level and internship roles with local Acadiana partners (CGI Lafayette Center, Parish IT, Stuller, Opportunity Machine).
                </span>
              </div>
              <span className="font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 shrink-0 text-[10px]">
                Verified Roles
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {opportunities.map((job) => (
                <div
                  key={job.id}
                  id={`job-card-${job.id}`}
                  className="rounded-xl bg-[#0a1626] border border-[#152740] hover:border-sky-500/40 transition-all p-5 flex flex-col justify-between shadow-sm"
                >
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-sky-500/15 text-sky-300 border border-sky-500/20">
                          {job.type}
                        </span>
                        <h3 className="text-base font-bold text-white mt-1 leading-snug">
                          {job.title}
                        </h3>
                        <p className="text-xs font-semibold text-emerald-400">
                          {job.company}
                        </p>
                      </div>
                      {job.partnerBadge && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#060e1a] text-slate-400 border border-[#142338]">
                          {job.partnerBadge}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-3 text-xs text-slate-400">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        <span>{job.location}</span>
                      </div>
                      {job.salaryRange && (
                        <div className="flex items-center gap-1 text-emerald-400 font-medium font-mono">
                          <DollarSign className="w-3.5 h-3.5" />
                          <span>{job.salaryRange}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {job.description}
                    </p>

                    {/* Requirements */}
                    <div className="space-y-1 pt-0.5">
                      <div className="text-[10px] font-bold text-slate-400 font-mono uppercase">Target Qualifications:</div>
                      <ul className="space-y-0.5 text-xs text-slate-400">
                        {job.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Bottom Button */}
                  <div className="pt-3 mt-3 border-t border-[#142338] flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-mono">Posted {job.postedDate}</span>
                    <a
                      href={job.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-sm transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>View & Apply</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Certification Study Circles */}
        {activeTab === 'study' && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {studyCircles.map((circle) => {
                const Icon = getCertIcon(circle.certName);

                return (
                  <div
                    key={circle.id}
                    id={`study-circle-${circle.id}`}
                    className="rounded-xl bg-[#0a1626] border border-[#152740] p-5 flex flex-col justify-between shadow-sm"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono uppercase font-bold text-sky-400 px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20">
                              {circle.difficulty} Track
                            </span>
                            <h3 className="text-base font-bold text-white mt-0.5">
                              {circle.title}
                            </h3>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1.5 text-xs">
                        <div className="p-2.5 rounded-lg bg-[#060e1a] border border-[#142338] space-y-0.5">
                          <div className="text-[10px] font-bold text-slate-400 uppercase font-mono">Current Topic:</div>
                          <div className="text-slate-200 font-medium">{circle.currentTopic}</div>
                        </div>

                        <div className="flex items-center justify-between text-slate-400 pt-0.5">
                          <span>Schedule:</span>
                          <span className="text-slate-200 font-medium">{circle.meetingSchedule}</span>
                        </div>

                        <div className="flex items-center justify-between text-slate-400">
                          <span>Mentor:</span>
                          <span className="text-emerald-400 font-medium">{circle.leadMember}</span>
                        </div>

                        <div className="flex items-center justify-between text-slate-400">
                          <span>Active Students:</span>
                          <span className="text-sky-400 font-bold">{circle.activeParticipants} Study Cohort</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-[#142338] flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">Discord Study Voice & Notes</span>
                      <a
                        href={circle.studyDocsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition flex items-center gap-1.5"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Join Study Circle</span>
                      </a>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Student Peer Collaboration Board */}
        {activeTab === 'collab' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-[#0a1626] border border-[#142338]">
              <div>
                <h4 className="font-bold text-white text-sm">Student Collaboration & Skill Swap Board</h4>
                <p className="text-xs text-slate-400">Team up for hackathons, exchange lab troubleshooting help, or form study groups.</p>
              </div>
              <button
                onClick={() => setIsCollabModalOpen(true)}
                className="px-3.5 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-sm transition flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Post Request</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {collabPosts.map((post) => (
                <div
                  key={post.id}
                  className="rounded-xl bg-[#0a1626] border border-[#152740] p-4 flex flex-col justify-between shadow-sm"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span className="px-2 py-0.5 rounded bg-[#060e1a] text-sky-300 border border-[#142338] uppercase">
                        {post.category.replace('_', ' ')}
                      </span>
                      <span>{post.createdAt}</span>
                    </div>

                    <h3 className="font-bold text-white text-sm leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs text-slate-300 line-clamp-4 leading-relaxed">
                      {post.description}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#060e1a] border border-[#142338] text-slate-400"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 mt-2.5 border-t border-[#142338] flex items-center justify-between text-xs">
                    <div className="text-[11px] text-slate-400">
                      by <span className="text-slate-200 font-semibold">{post.authorName}</span>
                    </div>

                    <button
                      onClick={() => setRepliedPostId(repliedPostId === post.id ? null : post.id)}
                      className="px-2.5 py-1 rounded-lg bg-[#060e1a] hover:bg-[#102036] text-sky-400 text-xs font-semibold transition border border-sky-500/20 cursor-pointer"
                    >
                      {repliedPostId === post.id ? 'Hide Contact' : 'Reach Out'}
                    </button>
                  </div>

                  {repliedPostId === post.id && (
                    <div className="mt-2.5 p-2.5 rounded-lg bg-[#060e1a] border border-[#142338] text-xs text-slate-300 space-y-1">
                      <div className="text-[10px] uppercase font-bold text-slate-400 font-mono">Contact Info:</div>
                      <div className="text-emerald-400 font-mono text-xs">{post.authorEmail}</div>
                      <p className="text-[10px] text-slate-400">Mention you saw their post on the SoLAcc IT Club Hub!</p>
                    </div>
                  )}

                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Modal for creating a collab post */}
      <CollabBoardModal
        isOpen={isCollabModalOpen}
        onClose={() => setIsCollabModalOpen(false)}
        onSubmitPost={onAddCollabPost}
      />
    </section>
  );
};
