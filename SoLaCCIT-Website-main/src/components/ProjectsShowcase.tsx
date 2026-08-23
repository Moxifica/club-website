import React, { useState } from 'react';
import { 
  Layers, 
  Search, 
  Plus, 
  Heart, 
  MessageSquare, 
  Github, 
  Globe, 
  Shield, 
  Code, 
  Cloud, 
  Cpu, 
  Smartphone,
  Send,
  User,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Project, ProjectCategory } from '../types';

interface ProjectsShowcaseProps {
  projects: Project[];
  onOpenSubmitModal: () => void;
  onLikeProject: (projectId: string) => void;
  onAddComment: (projectId: string, commentText: string, authorName: string) => void;
}

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({
  projects,
  onOpenSubmitModal,
  onLikeProject,
  onAddComment,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCommentProjectId, setActiveCommentProjectId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState('');
  const [commenterName, setCommenterName] = useState('');
  const [likedProjects, setLikedProjects] = useState<Record<string, boolean>>({});

  const categories: { id: ProjectCategory; label: string; icon: any }[] = [
    { id: 'all', label: 'All Tracks', icon: Layers },
    { id: 'cybersecurity', label: 'Cybersecurity', icon: Shield },
    { id: 'web_dev', label: 'Web & Fullstack', icon: Code },
    { id: 'cloud_network', label: 'Cloud & Systems', icon: Cloud },
    { id: 'ai_hardware', label: 'AI & IoT Hardware', icon: Cpu },
    { id: 'mobile', label: 'Mobile Apps', icon: Smartphone },
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleLike = (id: string) => {
    setLikedProjects((prev) => ({ ...prev, [id]: !prev[id] }));
    onLikeProject(id);
  };

  const handlePostComment = (e: React.FormEvent, projectId: string) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    const author = commenterName.trim() || 'SoLAcc Student';
    onAddComment(projectId, commentInput.trim(), author);
    setCommentInput('');
  };

  const getCategoryBadge = (category: Project['category']) => {
    switch (category) {
      case 'cybersecurity':
        return { label: 'Cybersecurity', bg: 'bg-sky-500/10 text-sky-400 border-sky-500/20' };
      case 'web_dev':
        return { label: 'Web & App Dev', bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' };
      case 'cloud_network':
        return { label: 'Cloud & SysAdmin', bg: 'bg-sky-500/10 text-sky-300 border-sky-500/20' };
      case 'ai_hardware':
        return { label: 'AI & Hardware', bg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' };
      case 'mobile':
        return { label: 'Mobile', bg: 'bg-sky-500/10 text-sky-400 border-sky-500/20' };
      default:
        return { label: 'IT Project', bg: 'bg-slate-500/10 text-slate-400 border-slate-500/20' };
    }
  };

  return (
    <section id="projects" className="py-14 bg-[#070e1a] text-slate-100 border-b border-[#142338]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-1.5 font-mono">
              <Layers className="w-3.5 h-3.5" />
              <span>Student Portfolio Gallery</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Showcased IT Projects & Builds
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl mt-1 leading-relaxed">
              Explore real-world software, cybersecurity labs, homelab infrastructure, and hardware built by South Louisiana Community College students.
            </p>
          </div>

          <button
            id="showcase-submit-project-btn"
            onClick={onOpenSubmitModal}
            className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-sm transition cursor-pointer self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Submit Project</span>
          </button>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="space-y-3 mb-7">
          {/* Search bar */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              id="search-projects-input"
              type="text"
              placeholder="Search by title, author, Python, React, Cisco..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-[#0a1626] border border-[#16273f] text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                    isSelected
                      ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                      : 'bg-[#0a1626] text-slate-400 border border-[#16273f] hover:text-white hover:bg-[#102036]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-14 bg-[#0a1626]/60 rounded-xl border border-[#142338] p-6">
            <div className="w-10 h-10 rounded-full bg-[#102036] flex items-center justify-center mx-auto text-slate-400 mb-2.5">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">No Projects Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-3">
              We couldn't find any projects matching your filter. Be the first to publish one!
            </p>
            <button
              onClick={onOpenSubmitModal}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition"
            >
              Submit a Project Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map((project) => {
              const badge = getCategoryBadge(project.category);
              const isCommentsOpen = activeCommentProjectId === project.id;
              const isLiked = likedProjects[project.id];

              return (
                <div
                  key={project.id}
                  id={`project-card-${project.id}`}
                  className="rounded-xl bg-[#0a1626] border border-[#152740] hover:border-sky-500/40 transition-all flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md group"
                >
                  <div className="p-5 space-y-3.5">
                    
                    {/* Card Header: Category & Status */}
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${badge.bg}`}>
                        {badge.label}
                      </span>
                      {project.status === 'seeking_members' ? (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                          Seeking Collaborators
                        </span>
                      ) : project.status === 'completed' ? (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#102036] text-slate-300 border border-[#16273f]">
                          Completed
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Active Dev
                        </span>
                      )}
                    </div>

                    {/* Title & Tagline */}
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-xs text-slate-300 font-medium mt-0.5">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Full Description */}
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#060e1a] border border-[#142338] text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Author Profile Info */}
                    <div className="pt-2.5 border-t border-[#142338] flex items-center gap-2.5">
                      <img
                        src={project.author.avatar}
                        alt={project.author.name}
                        className="w-7 h-7 rounded-full object-cover border border-[#16273f] bg-[#060e1a]"
                        referrerPolicy="no-referrer"
                      />
                      <div className="text-xs">
                        <div className="font-semibold text-slate-200">{project.author.name}</div>
                        <div className="text-[10px] text-slate-400">
                          {project.author.role} • {project.author.campus} ({project.author.graduationYear})
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Card Bottom Footer: Links & Interactions */}
                  <div className="bg-[#060e1a]/80 px-5 py-2.5 border-t border-[#142338] flex items-center justify-between text-xs">
                    {/* External links */}
                    <div className="flex items-center gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-white flex items-center gap-1 font-medium transition"
                          title="View GitHub Repository"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Code</span>
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium transition"
                          title="View Live Demo"
                        >
                          <Globe className="w-3.5 h-3.5" />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>

                    {/* Like & Comments Toggle */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleLike(project.id)}
                        className={`flex items-center gap-1 transition cursor-pointer ${
                          isLiked ? 'text-rose-400 font-bold' : 'text-slate-400 hover:text-rose-400'
                        }`}
                        title="Upvote Project"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-400 text-rose-400' : ''}`} />
                        <span>{project.likes + (isLiked ? 1 : 0)}</span>
                      </button>

                      <button
                        onClick={() => setActiveCommentProjectId(isCommentsOpen ? null : project.id)}
                        className="flex items-center gap-1 text-slate-400 hover:text-sky-300 transition cursor-pointer"
                        title="View Feedback & Comments"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{project.comments.length}</span>
                        {isCommentsOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>

                  {/* Expandable Comments Drawer */}
                  {isCommentsOpen && (
                    <div className="bg-[#060e1a] p-3.5 border-t border-[#142338] space-y-2.5">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                        Peer Feedback & Comments ({project.comments.length})
                      </div>

                      {project.comments.length === 0 ? (
                        <p className="text-xs text-slate-500 italic">No comments yet. Leave a word of encouragement!</p>
                      ) : (
                        <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                          {project.comments.map((c) => (
                            <div key={c.id} className="p-2 rounded-lg bg-[#0a1626] border border-[#142338] text-xs">
                              <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5">
                                <span className="font-bold text-slate-200">{c.author}</span>
                                <span>{c.createdAt}</span>
                              </div>
                              <p className="text-slate-300 text-xs">{c.text}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Add Comment Input */}
                      <form onSubmit={(e) => handlePostComment(e, project.id)} className="space-y-1.5 pt-1">
                        <input
                          type="text"
                          placeholder="Your Name (optional)"
                          value={commenterName}
                          onChange={(e) => setCommenterName(e.target.value)}
                          className="w-full px-2.5 py-1 rounded bg-[#0a1626] border border-[#142338] text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
                        />
                        <div className="flex gap-1.5">
                          <input
                            type="text"
                            placeholder="Add constructive feedback..."
                            value={commentInput}
                            onChange={(e) => setCommentInput(e.target.value)}
                            className="flex-1 px-2.5 py-1 rounded bg-[#0a1626] border border-[#142338] text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
                          />
                          <button
                            type="submit"
                            className="px-3 py-1 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1 cursor-pointer"
                          >
                            <Send className="w-3 h-3" />
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
