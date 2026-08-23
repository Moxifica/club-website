import React, { useState } from 'react';
import { X, Layers, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Project } from '../types';

interface ProjectSubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitProject: (project: Project) => void;
}

export const ProjectSubmitModal: React.FC<ProjectSubmitModalProps> = ({
  isOpen,
  onClose,
  onSubmitProject,
}) => {
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Project['category']>('cybersecurity');
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('IT Student');
  const [campus, setCampus] = useState('Lafayette Main (Devalcourt)');
  const [graduationYear, setGraduationYear] = useState('2026');
  const [techStackInput, setTechStackInput] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [status, setStatus] = useState<Project['status']>('active');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !authorName.trim()) {
      return;
    }

    const techStack = techStackInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const newProject: Project = {
      id: `proj-${Date.now()}`,
      title: title.trim(),
      tagline: tagline.trim() || title.trim(),
      description: description.trim(),
      category,
      author: {
        name: authorName.trim(),
        role: authorRole.trim(),
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(authorName)}`,
        campus,
        graduationYear,
      },
      techStack: techStack.length > 0 ? techStack : ['Python', 'Linux', 'Tailwind CSS'],
      githubUrl: githubUrl.trim() || undefined,
      liveUrl: liveUrl.trim() || undefined,
      likes: 1,
      comments: [],
      status,
      createdAt: new Date().toISOString().split('T')[0],
      featured: false,
    };

    onSubmitProject(newProject);
    setSubmitted(true);

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
    });

    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setTitle('');
      setTagline('');
      setDescription('');
      setAuthorName('');
      setTechStackInput('');
      setGithubUrl('');
      setLiveUrl('');
    }, 1300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#03070e]/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0a1626] border border-[#152740] rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="px-6 py-3.5 bg-[#070e1a] border-b border-[#142338] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm sm:text-base">Submit a Student Tech Project</h3>
              <p className="text-[11px] text-slate-400">Showcase your homelab setup, script, web app, or capstone to the club & recruiters.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#102036] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-10 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-500/15 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">Project Published to Showcase!</h4>
            <p className="text-xs text-slate-300">
              Your project is now live for peers, faculty, and local Louisiana employers to view.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-3 max-h-[80vh] overflow-y-auto">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Proxmox Cluster & VLAN Lab"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#060e1a] border border-[#16273f] text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Category / Domain *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-[#060e1a] border border-[#16273f] text-xs text-white focus:outline-none focus:border-sky-500"
                >
                  <option value="cybersecurity">Cybersecurity & CTF</option>
                  <option value="homelab">Homelab & Systems</option>
                  <option value="software">Software & Web Dev</option>
                  <option value="cloud">Cloud & Infrastructure</option>
                  <option value="networking">Networking & Routing</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Short Tagline *</label>
              <input
                type="text"
                placeholder="e.g. 3-node enterprise hypervisor lab with automated pfSense failover"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-[#060e1a] border border-[#16273f] text-xs text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Project Overview & Architecture *</label>
              <textarea
                rows={3}
                required
                placeholder="Explain what the project does, key technical architecture decisions, challenges solved..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-[#060e1a] border border-[#16273f] text-xs text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Creator Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shae Bergeron"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-[#060e1a] border border-[#16273f] text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Student Role / Track</label>
                <input
                  type="text"
                  placeholder="e.g. Cybersecurity Major"
                  value={authorRole}
                  onChange={(e) => setAuthorRole(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-[#060e1a] border border-[#16273f] text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Campus</label>
                <input
                  type="text"
                  placeholder="e.g. Lafayette Main"
                  value={campus}
                  onChange={(e) => setCampus(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-[#060e1a] border border-[#16273f] text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Tech Stack & Tools (comma separated)</label>
              <input
                type="text"
                placeholder="e.g. Proxmox VE, pfSense, WireGuard, Docker, TrueNAS"
                value={techStackInput}
                onChange={(e) => setTechStackInput(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-[#060e1a] border border-[#16273f] text-xs text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">GitHub Repo URL (optional)</label>
                <input
                  type="url"
                  placeholder="https://github.com/username/project"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#060e1a] border border-[#16273f] text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Live Demo or Docs URL (optional)</label>
                <input
                  type="url"
                  placeholder="https://myproject.tech or demo link"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#060e1a] border border-[#16273f] text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-3 border-t border-[#142338] flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-sm transition cursor-pointer"
              >
                Submit Project
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
