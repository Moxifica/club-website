import React, { useState } from 'react';
import { X, Users, Check } from 'lucide-react';
import { CollabPost } from '../types';

interface CollabBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitPost: (post: CollabPost) => void;
}

export const CollabBoardModal: React.FC<CollabBoardModalProps> = ({
  isOpen,
  onClose,
  onSubmitPost,
}) => {
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [category, setCategory] = useState<CollabPost['category']>('hackathon_team');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !authorName.trim() || !description.trim()) return;

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const newPost: CollabPost = {
      id: `collab-${Date.now()}`,
      title: title.trim(),
      authorName: authorName.trim(),
      authorEmail: authorEmail.trim() || 'student@my.solacc.edu',
      category,
      description: description.trim(),
      tags: tags.length > 0 ? tags : ['SoLAcc', 'Tech Collab'],
      repliesCount: 0,
      createdAt: 'Just now',
    };

    onSubmitPost(newPost);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setTitle('');
      setAuthorName('');
      setDescription('');
      setTagsInput('');
    }, 1300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#03070e]/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#0a1626] border border-[#152740] rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-3.5 bg-[#070e1a] border-b border-[#142338] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Post a Student Collaboration Request</h3>
              <p className="text-[11px] text-slate-400">Find hackathon teammates, study buddies, or project co-builders.</p>
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
          <div className="p-8 text-center space-y-2.5">
            <div className="w-10 h-10 bg-emerald-500/15 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
              <Check className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Collaboration Request Posted!</h4>
            <p className="text-xs text-slate-300">
              Your request is now live on the Student Collaboration Board for peers to reach out.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Post Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Looking for 1 teammate for HackAcadiana (Frontend / UI)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-[#060e1a] border border-[#16273f] text-xs text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shae Bergeron"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#060e1a] border border-[#16273f] text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-[#060e1a] border border-[#16273f] text-xs text-white focus:outline-none focus:border-sky-500"
                >
                  <option value="hackathon_team">Hackathon Team</option>
                  <option value="study_group">Cert Study Group</option>
                  <option value="project_partner">Project Co-Builder</option>
                  <option value="help_wanted">Troubleshooting / Lab Help</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Your SoLAcc Email or Discord</label>
              <input
                type="text"
                placeholder="student@my.solacc.edu or @discord_tag"
                value={authorEmail}
                onChange={(e) => setAuthorEmail(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-[#060e1a] border border-[#16273f] text-xs text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Details & What You Need *</label>
              <textarea
                rows={3}
                required
                placeholder="Describe what you are building or studying, how much time commitment, and what skills are helpful..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-[#060e1a] border border-[#16273f] text-xs text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Tags (comma separated)</label>
              <input
                type="text"
                placeholder="e.g. React, Security+, Python, Hackathon"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-[#060e1a] border border-[#16273f] text-xs text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="pt-2 border-t border-[#142338] flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-sm transition cursor-pointer"
              >
                Publish Request
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
