import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  Lightbulb, 
  FileText, 
  HelpCircle, 
  MessageSquare, 
  Copy, 
  Check, 
  Bot, 
  RefreshCw
} from 'lucide-react';
import { ClubLogo } from './ClubLogo';

interface AiTechAdvisorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiTechAdvisor: React.FC<AiTechAdvisorProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<'project_idea' | 'resume_bullet' | 'interview_prep' | 'general'>('project_idea');
  const [prompt, setPrompt] = useState('');
  const [context] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = {
    project_idea: [
      'Cybersecurity homelab project for CompTIA Security+',
      'Full-stack civic app for South Louisiana commuters',
      'Cloud automation & Docker container monitoring tool',
      'IoT environmental sensor network with ESP32',
    ],
    resume_bullet: [
      'Built a 3-node Proxmox homelab with pfSense firewall and VLAN isolation',
      'Configured Active Directory domain controller and managed 50 user permissions',
      'Created a full-stack React and Python packet sniffer for campus lab',
    ],
    interview_prep: [
      'Troubleshooting a user who cannot connect to the local network or internet',
      'Explain the difference between TCP and UDP with real-world examples',
      'How would you investigate a suspected ransomware infection on an endpoint?',
    ],
    general: [
      'What certifications should I prioritize as a 1st year SoLAcc IT student?',
      'How should I prepare for the upcoming CGI info session and interviews?',
      'Can you explain the IT career tracks available at South Louisiana Community College?',
    ],
  };

  const handleGenerate = async (customPrompt?: string) => {
    const activePrompt = customPrompt || prompt;
    if (!activePrompt.trim()) return;

    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch('/api/ai/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode,
          prompt: activePrompt,
          context: context || 'SoLAcc IT Student',
        }),
      });

      const data = await res.json();
      if (data.success && data.content) {
        setResponse(data.content);
      } else {
        setResponse(data.error || 'Unable to generate advice right now. Please try again.');
      }
    } catch (err: any) {
      console.error(err);
      setResponse('Connection error. Please ensure the dev server is active and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!response) return;
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#03070e]/85 backdrop-blur-md">
      <div className="relative w-full max-w-3xl bg-[#0a1626] border border-[#152740] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-3.5 bg-[#070e1a] border-b border-[#142338] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ClubLogo size="sm" variant="shield-only" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-sm sm:text-base">SoLAcc AI Tech Advisor</h3>
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  GEMINI POWERED
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Career advice, project pitch generator, and IT interview coach for SoLAcc students.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#102036] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="px-5 pt-3 pb-2 bg-[#060e1a] border-b border-[#142338] flex items-center gap-1.5 overflow-x-auto scrollbar-thin">
          <button
            onClick={() => { setMode('project_idea'); setResponse(null); }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              mode === 'project_idea'
                ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-[#102036]'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Project Pitch Generator</span>
          </button>

          <button
            onClick={() => { setMode('resume_bullet'); setResponse(null); }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              mode === 'resume_bullet'
                ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-[#102036]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>IT Resume Enhancer</span>
          </button>

          <button
            onClick={() => { setMode('interview_prep'); setResponse(null); }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              mode === 'interview_prep'
                ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-[#102036]'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Technical Interview Prep</span>
          </button>

          <button
            onClick={() => { setMode('general'); setResponse(null); }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              mode === 'general'
                ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-[#102036]'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Ask Advisor Q&A</span>
          </button>
        </div>

        {/* Body Content & Chat View */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          
          {/* Quick Prompts Pills */}
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">
              Suggested Topics for {mode.replace('_', ' ')}:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {quickPrompts[mode].map((qp, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setPrompt(qp);
                    handleGenerate(qp);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-[#060e1a] hover:bg-[#102036] border border-[#142338] hover:border-sky-500/40 text-[11px] text-slate-300 text-left transition cursor-pointer"
                >
                  ⚡ {qp}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <div className="space-y-1.5 pt-1">
            <label className="block text-xs font-semibold text-slate-300">
              {mode === 'project_idea' && 'What IT track or technology are you interested in building?'}
              {mode === 'resume_bullet' && 'Paste your rough project or technical experience description:'}
              {mode === 'interview_prep' && 'Enter the IT role or technical concept you want to practice:'}
              {mode === 'general' && 'What would you like to ask the SoLAcc IT Club Advisor?'}
            </label>

            <div className="flex gap-2">
              <textarea
                rows={2}
                placeholder={
                  mode === 'project_idea'
                    ? 'e.g. Building an automated Python network packet monitor or React dashboard...'
                    : mode === 'resume_bullet'
                    ? 'e.g. I set up a Proxmox virtual server in the club lab with VLANs and pfSense...'
                    : 'Ask anything about IT career paths, certifications, or tech prep...'
                }
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-lg bg-[#060e1a] border border-[#16273f] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
              />

              <button
                onClick={() => handleGenerate()}
                disabled={loading || !prompt.trim()}
                className="px-4 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Generate</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* AI Response Box */}
          {loading && (
            <div className="p-5 rounded-xl bg-[#060e1a] border border-[#142338] flex items-center justify-center gap-2.5 text-slate-400 text-xs">
              <Sparkles className="w-4 h-4 text-sky-400 animate-pulse" />
              <span>Analyzing SoLAcc IT curriculum and crafting tailored response...</span>
            </div>
          )}

          {response && !loading && (
            <div className="p-4 rounded-xl bg-[#060e1a] border border-sky-500/30 text-xs text-slate-200 space-y-2.5 relative group">
              <div className="flex items-center justify-between border-b border-[#142338] pb-2">
                <div className="flex items-center gap-1.5 text-sky-400 font-bold">
                  <Bot className="w-4 h-4" />
                  <span>Advisor Recommendations</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="px-2 py-0.5 rounded bg-[#0a1626] hover:bg-[#102036] border border-[#142338] text-[10px] text-slate-300 flex items-center gap-1 transition cursor-pointer"
                  title="Copy to Clipboard"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Rendered content */}
              <div className="prose prose-invert prose-xs max-w-none text-slate-300 leading-relaxed whitespace-pre-line text-xs">
                {response}
              </div>
            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="px-5 py-2.5 bg-[#060e1a] border-t border-[#142338] text-[10px] text-slate-500 flex items-center justify-between">
          <span>South Louisiana Community College • Information Technology</span>
          <span className="font-mono text-emerald-400">Devalcourt Hall Rm 214</span>
        </div>

      </div>
    </div>
  );
};
