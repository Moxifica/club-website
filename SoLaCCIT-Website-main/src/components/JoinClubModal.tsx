import React, { useState } from 'react';
import { 
  X, 
  UserPlus, 
  Check, 
  QrCode, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MemberRegistration } from '../types';
import { ClubLogo } from './ClubLogo';

interface JoinClubModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMemberRegistered?: (reg: MemberRegistration) => void;
}

export const JoinClubModal: React.FC<JoinClubModalProps> = ({
  isOpen,
  onClose,
  onMemberRegistered,
}) => {
  const [formData, setFormData] = useState<MemberRegistration>({
    fullName: '',
    email: '',
    studentId: '',
    concentration: 'Cyber Security & Network Defense',
    campus: 'Lafayette Main (Devalcourt)',
    graduationYear: '2026',
    interests: ['Cybersecurity / CTF', 'Linux & Homelab'],
    discordUsername: '',
    careerGoals: '',
  });

  const [registered, setRegistered] = useState(false);

  if (!isOpen) return null;

  const availableInterests = [
    'Cybersecurity / CTF',
    'Web & Full-Stack Development',
    'Linux & Proxmox Homelab',
    'Cloud (AWS / GCP / Azure)',
    'Cisco Networking & Routing',
    'AI & Data Science',
    'Hardware / Arduino & ESP32',
    'CompTIA / Cisco Certification Prep',
  ];

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => {
      const exists = prev.interests.includes(interest);
      return {
        ...prev,
        interests: exists
          ? prev.interests.filter((i) => i !== interest)
          : [...prev.interests, interest],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim()) return;

    if (onMemberRegistered) {
      onMemberRegistered(formData);
    }

    setRegistered(true);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleReset = () => {
    setRegistered(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#03070e]/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0a1626] border border-[#152740] rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#070e1a] border-b border-[#142338] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ClubLogo size="sm" variant="shield-only" />
            <div>
              <h3 className="font-bold text-white text-sm sm:text-base">Join the SoLAcc IT Club</h3>
              <p className="text-[11px] text-slate-400">100% Free membership open to all South Louisiana Community College students.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#102036] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {registered ? (
          /* Digital Student Club Membership Card Generator */
          <div className="p-6 sm:p-7 space-y-5">
            <div className="text-center space-y-1">
              <div className="w-10 h-10 bg-emerald-500/15 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30 mb-1.5">
                <Check className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white">Welcome to the SoLAcc IT Club!</h4>
              <p className="text-xs text-slate-300">Your registration has been confirmed. Here is your official Digital Student Pass.</p>
            </div>

            {/* Visual Digital Member Card */}
            <div className="relative rounded-xl bg-gradient-to-br from-[#060d17] via-[#09172a] to-[#061e24] p-5 border-2 border-sky-500/40 shadow-xl text-slate-100 space-y-4 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-2xl pointer-events-none" />
              
              {/* Card Top */}
              <div className="flex items-center justify-between border-b border-[#142338] pb-3">
                <div className="flex items-center gap-2.5">
                  <ClubLogo size="sm" variant="shield-only" />
                  <div>
                    <div className="flex items-center gap-1 font-extrabold text-xs tracking-tight text-white leading-none">
                      <span>SoLAcc</span>
                      <span className="text-sky-400">IT</span>
                      <span className="text-emerald-400">CLUB</span>
                    </div>
                    <div className="text-[9px] uppercase tracking-wider text-slate-400 font-mono mt-0.5">Verified Student Member Pass</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold">
                  ACTIVE • 2026
                </span>
              </div>

              {/* Card Center: Member Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                <div className="sm:col-span-2 space-y-2">
                  <div>
                    <div className="text-[9px] uppercase font-bold text-slate-500 font-mono">Member Name</div>
                    <div className="text-base font-extrabold text-white">{formData.fullName}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <div className="text-[9px] uppercase font-bold text-slate-500 font-mono">Track</div>
                      <div className="text-sky-400 font-semibold truncate text-xs">{formData.concentration}</div>
                    </div>
                    <div>
                      <div className="text-[9px] uppercase font-bold text-slate-500 font-mono">Campus</div>
                      <div className="text-slate-300 font-medium truncate text-xs">{formData.campus}</div>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-400 font-mono">
                    ID: {formData.studentId || 'SOLACC-IT-' + Math.floor(100000 + Math.random() * 900000)}
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center p-2.5 rounded-lg bg-[#060e1a] border border-[#142338] text-center">
                  <QrCode className="w-12 h-12 text-emerald-400" />
                  <span className="text-[8px] font-mono text-slate-400 mt-1">AUTHENTICATED</span>
                </div>
              </div>

              {/* Card Bottom perks */}
              <div className="pt-2 border-t border-[#142338] flex items-center justify-between text-[10px] text-slate-400 font-medium">
                <span>Access: Devalcourt Rm 214 Lab & Discord</span>
                <span className="text-sky-400 font-mono">Lafayette, LA</span>
              </div>
            </div>

            {/* Next Steps */}
            <div className="space-y-2 pt-1">
              <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider font-mono">Next Steps:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <a
                  href="https://discord.gg/solacc-it-club"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-[#060e1a] hover:bg-[#102036] border border-[#142338] text-slate-300 hover:text-white flex items-center justify-between transition"
                >
                  <span className="font-semibold text-emerald-400">1. Join Official Discord</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <div className="p-2.5 rounded-lg bg-[#060e1a] border border-[#142338] text-slate-300 flex items-center justify-between">
                  <span>2. Meeting: Thursdays @ 5:30 PM</span>
                  <span className="text-sky-400 text-[10px] font-mono">Rm 214</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={handleReset}
                className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-sm transition cursor-pointer"
              >
                Done & Return to Site
              </button>
            </div>

          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-3.5 max-h-[80vh] overflow-y-auto">
            
            {/* Student Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shae Bergeron"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#060e1a] border border-[#16273f] text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">SoLAcc Student Email *</label>
                <input
                  type="email"
                  required
                  placeholder="student@my.solacc.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#060e1a] border border-[#16273f] text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Concentration / Major *</label>
                <select
                  value={formData.concentration}
                  onChange={(e) => setFormData({ ...formData, concentration: e.target.value })}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-[#060e1a] border border-[#16273f] text-xs text-white focus:outline-none focus:border-sky-500"
                >
                  <option value="Cyber Security & Network Defense">Cyber Security & Network Defense</option>
                  <option value="Application Development">Application Development</option>
                  <option value="Cloud Computing & SysAdmin">Cloud Computing & SysAdmin</option>
                  <option value="Systems Support & Helpdesk">Systems Support & Helpdesk</option>
                  <option value="General IT / Non-Major">General IT / Non-Major</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Campus</label>
                <select
                  value={formData.campus}
                  onChange={(e) => setFormData({ ...formData, campus: e.target.value })}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-[#060e1a] border border-[#16273f] text-xs text-white focus:outline-none focus:border-sky-500"
                >
                  <option value="Lafayette Main (Devalcourt)">Lafayette Main (Devalcourt)</option>
                  <option value="Lafayette Main (Ardoin)">Lafayette Main (Ardoin)</option>
                  <option value="New Iberia Campus">New Iberia Campus</option>
                  <option value="Acadian Campus (Crowley)">Acadian Campus (Crowley)</option>
                  <option value="T.H. Harris (Opelousas)">T.H. Harris (Opelousas)</option>
                  <option value="Evangeline (St. Martinville)">Evangeline (St. Martinville)</option>
                  <option value="Franklin Campus">Franklin Campus</option>
                  <option value="Ward H. Nash (Ville Platte)">Ward H. Nash (Ville Platte)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Expected Grad Year</label>
                <input
                  type="text"
                  placeholder="e.g. 2026"
                  value={formData.graduationYear}
                  onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-[#060e1a] border border-[#16273f] text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Discord Username (for role access)</label>
              <input
                type="text"
                placeholder="e.g. @shaebergeron or cajundev"
                value={formData.discordUsername}
                onChange={(e) => setFormData({ ...formData, discordUsername: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg bg-[#060e1a] border border-[#16273f] text-xs text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* Interest Checkboxes */}
            <div className="space-y-1.5 pt-1">
              <label className="block text-xs font-semibold text-slate-300">
                Select Your Tech Interests (check all that apply):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {availableInterests.map((interest) => {
                  const checked = formData.interests.includes(interest);
                  return (
                    <label
                      key={interest}
                      onClick={() => handleInterestToggle(interest)}
                      className={`p-2 rounded-lg border text-xs flex items-center gap-2 cursor-pointer transition ${
                        checked
                          ? 'bg-sky-500/10 border-sky-500/40 text-sky-300 font-medium'
                          : 'bg-[#060e1a] border-[#142338] text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => {}}
                        className="text-sky-500 rounded"
                      />
                      <span className="text-[11px]">{interest}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Career Goals */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                What are your main tech career goals? (optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Pass CompTIA Security+, land an internship at CGI or Perficient..."
                value={formData.careerGoals}
                onChange={(e) => setFormData({ ...formData, careerGoals: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg bg-[#060e1a] border border-[#16273f] text-xs text-white focus:outline-none focus:border-sky-500"
              />
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
                Submit & Generate Member ID
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
