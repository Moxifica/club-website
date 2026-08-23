import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Award, 
  Github, 
  Linkedin, 
  Mail, 
  Sparkles, 
  MessageCircle 
} from 'lucide-react';
import { Member } from '../types';
import { MemberConnectModal } from './MemberConnectModal';

interface MemberDirectoryProps {
  members: Member[];
}

export const MemberDirectory: React.FC<MemberDirectoryProps> = ({ members }) => {
  const [selectedRole, setSelectedRole] = useState<'All' | 'Officer' | 'Member' | 'Alumni' | 'Faculty Advisor'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMemberForConnect, setSelectedMemberForConnect] = useState<Member | null>(null);

  const roles: ('All' | 'Officer' | 'Member' | 'Alumni' | 'Faculty Advisor')[] = [
    'All',
    'Officer',
    'Member',
    'Alumni',
    'Faculty Advisor',
  ];

  const filteredMembers = members.filter((member) => {
    const matchesRole = selectedRole === 'All' || member.role === selectedRole;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      member.name.toLowerCase().includes(query) ||
      member.title.toLowerCase().includes(query) ||
      member.campus.toLowerCase().includes(query) ||
      member.skills.some((s) => s.toLowerCase().includes(query)) ||
      member.certifications.some((c) => c.toLowerCase().includes(query));
    return matchesRole && matchesSearch;
  });

  const getRoleBadge = (role: Member['role']) => {
    switch (role) {
      case 'Officer':
        return { label: 'Officer', bg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' };
      case 'Faculty Advisor':
        return { label: 'Faculty Advisor', bg: 'bg-amber-500/15 text-amber-400 border-amber-500/30' };
      case 'Alumni':
        return { label: 'Alumni', bg: 'bg-sky-500/15 text-sky-400 border-sky-500/30' };
      default:
        return { label: 'Member', bg: 'bg-[#102036] text-slate-300 border border-[#16273f]' };
    }
  };

  return (
    <section id="members" className="py-14 bg-[#070e1a] text-slate-100 border-b border-[#142338]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-1.5 font-mono">
              <Users className="w-3.5 h-3.5" />
              <span>Community & Leadership</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Members, Officers & Alumni
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl mt-1 leading-relaxed">
              Connect with fellow SoLAcc students, club leadership, faculty advisors, and alumni working at top tech firms across Acadiana.
            </p>
          </div>

          <div className="text-xs text-slate-400 bg-[#0a1626] px-3.5 py-1.5 rounded-lg border border-[#142338] self-start md:self-auto font-mono">
            <span className="text-sky-400 font-bold">{members.length}</span> Profiles
          </div>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-7">
          {/* Role Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto scrollbar-thin">
            {roles.map((role) => {
              const isSelected = selectedRole === role;
              return (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                    isSelected
                      ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                      : 'bg-[#0a1626] text-slate-400 border border-[#16273f] hover:text-white hover:bg-[#102036]'
                  }`}
                >
                  {role === 'All' ? 'All Roles' : role}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2" />
            <input
              type="text"
              placeholder="Filter by skill, cert, campus..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1 rounded-lg bg-[#0a1626] border border-[#16273f] text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredMembers.map((member) => {
            const roleBadge = getRoleBadge(member.role);

            return (
              <div
                key={member.id}
                id={`member-card-${member.id}`}
                className="rounded-xl bg-[#0a1626] border border-[#152740] hover:border-sky-500/40 transition-all p-4 flex flex-col justify-between shadow-sm hover:shadow-md group"
              >
                <div className="space-y-2.5">
                  
                  {/* Top Avatar & Role Badge */}
                  <div className="flex items-start justify-between gap-2">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-12 h-12 rounded-xl object-cover border border-[#16273f] group-hover:border-sky-500/50 transition-colors bg-[#060e1a]"
                      referrerPolicy="no-referrer"
                    />
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${roleBadge.bg}`}>
                      {roleBadge.label}
                    </span>
                  </div>

                  {/* Name & Title */}
                  <div>
                    <h3 className="font-bold text-white text-sm group-hover:text-sky-300 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs text-sky-400 font-medium">
                      {member.title}
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                      {member.campus}
                    </p>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Certifications if any */}
                  {member.certifications.length > 0 && (
                    <div className="space-y-1 pt-0.5">
                      <div className="text-[9px] uppercase font-bold text-slate-500 flex items-center gap-1 font-mono">
                        <Award className="w-3 h-3 text-amber-400" />
                        <span>Certifications</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {member.certifications.map((cert) => (
                          <span
                            key={cert}
                            className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20"
                          >
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Skills Chips */}
                  <div className="space-y-1 pt-0.5">
                    <div className="text-[9px] uppercase font-bold text-slate-500 font-mono">Skills</div>
                    <div className="flex flex-wrap gap-1">
                      {member.skills.slice(0, 4).map((skill) => (
                        <span
                          key={skill}
                          className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#060e1a] border border-[#142338] text-slate-300"
                        >
                          {skill}
                        </span>
                      ))}
                      {member.skills.length > 4 && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#060e1a] border border-[#142338] text-slate-500">
                          +{member.skills.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Peer Mentor Indicator */}
                  {member.isMentor && (
                    <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-300 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>Peer Mentor</span>
                    </div>
                  )}

                </div>

                {/* Card Footer: Socials & Connect Button */}
                <div className="pt-3 mt-2.5 border-t border-[#142338] flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-400">
                    {member.githubUrl && (
                      <a
                        href={member.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition"
                        title="GitHub"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.linkedinUrl && (
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-sky-400 transition"
                        title="LinkedIn"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="hover:text-emerald-400 transition"
                        title="Email"
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedMemberForConnect(member)}
                    className="px-2.5 py-1 rounded-lg bg-[#060e1a] hover:bg-[#102036] text-sky-400 hover:text-sky-300 border border-sky-500/30 text-xs font-semibold transition cursor-pointer flex items-center gap-1"
                  >
                    <MessageCircle className="w-3 h-3" />
                    <span>Connect</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Connect Modal */}
      <MemberConnectModal
        member={selectedMemberForConnect}
        isOpen={!!selectedMemberForConnect}
        onClose={() => setSelectedMemberForConnect(null)}
      />
    </section>
  );
};
