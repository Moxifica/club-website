import React, { useState } from 'react';
import { X, Check, MessageSquare } from 'lucide-react';
import { Member } from '../types';

interface MemberConnectModalProps {
  member: Member | null;
  isOpen: boolean;
  onClose: () => void;
}

export const MemberConnectModal: React.FC<MemberConnectModalProps> = ({
  member,
  isOpen,
  onClose,
}) => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [purpose, setPurpose] = useState<'mentorship' | 'collab' | 'study' | 'general'>('mentorship');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (!isOpen || !member) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderEmail.trim() || !message.trim()) return;

    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
      setMessage('');
      setSenderName('');
      setSenderEmail('');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#03070e]/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#0a1626] border border-[#152740] rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-3.5 bg-[#070e1a] border-b border-[#142338] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src={member.avatar}
              alt={member.name}
              className="w-9 h-9 rounded-xl object-cover border border-[#16273f] bg-[#060e1a]"
              referrerPolicy="no-referrer"
            />
            <div>
              <h3 className="font-bold text-white text-sm">Connect with {member.name}</h3>
              <p className="text-xs text-sky-400">{member.title} • {member.campus}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#102036] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {sent ? (
          <div className="p-8 text-center space-y-2.5">
            <div className="w-10 h-10 bg-emerald-500/15 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
              <Check className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Connection Request Sent!</h4>
            <p className="text-xs text-slate-300">
              Your message has been routed to {member.name}'s SoLAcc email and Discord notification. They will follow up with you shortly!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-3">
            
            {member.isMentor && (
              <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">
                <span className="font-bold">Peer Mentor Topic:</span> {member.mentorTopic || 'IT Career & Course Guidance'}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jordan Arceneaux"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#060e1a] border border-[#16273f] text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your SoLAcc Email *</label>
                <input
                  type="email"
                  required
                  placeholder="student@my.solacc.edu"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#060e1a] border border-[#16273f] text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Reason for Connecting</label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value as any)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-[#060e1a] border border-[#16273f] text-xs text-white focus:outline-none focus:border-sky-500"
              >
                <option value="mentorship">Peer Mentorship / Course Advice</option>
                <option value="collab">Collaborate on a Tech Project / Lab</option>
                <option value="study">Study Together for Certifications (Security+, CCNA)</option>
                <option value="general">General Networking & Tech Chat</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Message *</label>
              <textarea
                rows={3}
                required
                placeholder="Introduce yourself, your SoLAcc campus, and what you'd like to chat about..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
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
                className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-sm transition cursor-pointer"
              >
                Send Request
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
