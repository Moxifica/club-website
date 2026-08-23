import React from 'react';
import { 
  MapPin, 
  Mail, 
  Calendar, 
  ExternalLink, 
  Sparkles
} from 'lucide-react';
import { ClubLogo } from './ClubLogo';

interface FooterProps {
  onOpenJoinModal: () => void;
  onOpenAiAdvisor: () => void;
  onNavigateSection: (section: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenJoinModal,
  onOpenAiAdvisor,
  onNavigateSection,
}) => {
  return (
    <footer className="bg-[#040810] text-slate-400 text-xs border-t border-[#142338]">
      
      {/* Discord & Community CTA Strip */}
      <div className="bg-[#07111e] border-b border-[#142338] py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left">
          <div>
            <span className="text-sky-400 font-mono font-bold uppercase tracking-wider text-[11px]">
              Active Discord & Lab Community
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
              Ready to build, learn, and launch your tech career?
            </h3>
            <p className="text-xs text-slate-300 max-w-xl mt-1">
              Join 85+ students across all 7 SoLAcc campuses. Get instant access to our Discord channels, homelab servers, and workshop recordings.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
            <button
              onClick={onOpenJoinModal}
              className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-sm transition cursor-pointer"
            >
              Join SoLAcc IT Club (Free)
            </button>
            <a
              href="https://discord.gg/solacc-it-club"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-lg bg-[#0a1626] hover:bg-[#102036] text-slate-200 border border-[#16273f] text-xs font-semibold transition flex items-center gap-1.5"
            >
              <span>Discord Server</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1 & 2: Branding & Location */}
          <div className="lg:col-span-2 space-y-3.5">
            <ClubLogo size="md" variant="horizontal" />

            <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
              Empowering students across South Louisiana with hands-on skills in Cybersecurity, Software Engineering, Cloud Systems, and Network Administration.
            </p>

            <div className="space-y-1 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>Lafayette Main Campus • Devalcourt Hall Rm 214</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Bi-Weekly Thursdays @ 5:30 PM CST (Hybrid)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span className="text-slate-300">itclub@solacc.edu • shaebergeron@my.solacc.edu</span>
              </div>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-2.5">
            <div className="font-bold text-white uppercase text-[11px] tracking-wider font-mono">Navigation</div>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => onNavigateSection('home')}
                  className="hover:text-sky-400 transition cursor-pointer"
                >
                  Overview & Stats
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('projects')}
                  className="hover:text-sky-400 transition cursor-pointer"
                >
                  Projects Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('events')}
                  className="hover:text-sky-400 transition cursor-pointer"
                >
                  Workshops & Roadmap
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('members')}
                  className="hover:text-sky-400 transition cursor-pointer"
                >
                  Officers & Alumni
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('networking')}
                  className="hover:text-sky-400 transition cursor-pointer"
                >
                  Acadiana Tech Careers
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAiAdvisor}
                  className="text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>AI Tech Advisor</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Regional Campuses */}
          <div className="space-y-2.5">
            <div className="font-bold text-white uppercase text-[11px] tracking-wider font-mono">Regional Campuses</div>
            <ul className="space-y-1 text-[11px] text-slate-400">
              <li>• Lafayette Main (Ardoin & Devalcourt)</li>
              <li>• New Iberia Campus</li>
              <li>• Acadian Campus (Crowley)</li>
              <li>• T.H. Harris Campus (Opelousas)</li>
              <li>• Evangeline Campus (St. Martinville)</li>
              <li>• Franklin Campus</li>
              <li>• Ward H. Nash Campus (Ville Platte)</li>
            </ul>
          </div>

          {/* Col 5: Certifications & Industry Partners */}
          <div className="space-y-2.5">
            <div className="font-bold text-white uppercase text-[11px] tracking-wider font-mono">Partners & Links</div>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <a
                  href="https://www.solacc.edu/academics/divisions/stem-transportation-business/information-technology"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-sky-400 flex items-center gap-1"
                >
                  <span>SoLAcc IT Department</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://cgi.com/careers/us/lafayette"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-emerald-400 flex items-center gap-1"
                >
                  <span>CGI Innovation Center</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://academic-store.comptia.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-sky-400 flex items-center gap-1"
                >
                  <span>CompTIA Academic (50% Off)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://opportunitymachine.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-emerald-400 flex items-center gap-1"
                >
                  <span>Opportunity Machine</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 mt-8 border-t border-[#142338] flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} South Louisiana Community College IT Club.
          </div>
          <div className="flex items-center gap-2">
            <span>Advisor: Prof. Danielle Broussard</span>
            <span>•</span>
            <span>President: Shae Bergeron</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
