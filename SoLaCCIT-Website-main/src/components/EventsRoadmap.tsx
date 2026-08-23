import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  Video, 
  CheckCircle2, 
  Download, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  Sparkles 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ClubEvent, EventCategory } from '../types';

interface EventsRoadmapProps {
  events: ClubEvent[];
  onRsvpEvent: (eventId: string) => void;
}

export const EventsRoadmap: React.FC<EventsRoadmapProps> = ({
  events,
  onRsvpEvent,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('all');
  const [activeTab, setActiveTab] = useState<'events' | 'roadmap'>('events');
  const [rsvpedEvents, setRsvpedEvents] = useState<Record<string, boolean>>({});
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);

  const categories: { id: EventCategory; label: string }[] = [
    { id: 'all', label: 'All Events' },
    { id: 'speaker', label: 'Industry Speakers' },
    { id: 'workshop', label: 'Workshops' },
    { id: 'hackathon', label: 'Hackathons & CTF' },
    { id: 'study_jam', label: 'Cert Study Jams' },
    { id: 'social', label: 'Socials & Tours' },
  ];

  const filteredEvents = events.filter((ev) => {
    return selectedCategory === 'all' || ev.category === selectedCategory;
  });

  const handleRsvp = (eventId: string) => {
    const isAlready = rsvpedEvents[eventId];
    setRsvpedEvents((prev) => ({ ...prev, [eventId]: !isAlready }));
    onRsvpEvent(eventId);

    if (!isAlready) {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.7 },
      });
    }
  };

  const downloadIcsFile = (event: ClubEvent) => {
    const startDate = event.date.replace(/-/g, '') + 'T173000';
    const endDate = event.date.replace(/-/g, '') + 'T193000';
    
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//SoLAcc IT Club//Event Calendar//EN',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      `SUMMARY:${event.title} - SoLAcc IT Club`,
      `DESCRIPTION:${event.description.replace(/\n/g, ' ')}`,
      `LOCATION:${event.location}`,
      `DTSTART:${startDate}`,
      `DTEND:${endDate}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${event.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getEventBadge = (category: ClubEvent['category']) => {
    switch (category) {
      case 'speaker':
        return { label: 'Industry Speaker', bg: 'bg-sky-500/10 text-sky-400 border-sky-500/20' };
      case 'workshop':
        return { label: 'Hands-on Lab', bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' };
      case 'hackathon':
        return { label: 'Hackathon & CTF', bg: 'bg-amber-500/10 text-amber-400 border-amber-500/20' };
      case 'study_jam':
        return { label: 'Study Jam', bg: 'bg-sky-500/10 text-sky-300 border-sky-500/20' };
      case 'social':
        return { label: 'Tech Social', bg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' };
      default:
        return { label: 'Club Meetup', bg: 'bg-slate-500/10 text-slate-400 border-slate-500/20' };
    }
  };

  return (
    <section id="events" className="py-14 bg-[#060d17] text-slate-100 border-b border-[#142338]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 tracking-wider uppercase mb-1.5 font-mono">
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Events, Workshops & Roadmap</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Upcoming Tech Meetups & Plans
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl mt-1 leading-relaxed">
              Join hands-on technical labs, guest talks with local IT employers like CGI, and certification study jams. All meetings feature hybrid Discord participation!
            </p>
          </div>

          {/* View Toggle Tabs */}
          <div className="flex rounded-lg bg-[#0a1626] border border-[#16273f] p-1 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('events')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer ${
                activeTab === 'events'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Event Schedule
            </button>
            <button
              onClick={() => setActiveTab('roadmap')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer ${
                activeTab === 'roadmap'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Semester Roadmap
            </button>
          </div>
        </div>

        {activeTab === 'events' ? (
          <>
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 scrollbar-thin">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                        : 'bg-[#0a1626] text-slate-400 border border-[#16273f] hover:text-white hover:bg-[#102036]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Events List */}
            <div className="space-y-4">
              {filteredEvents.map((event) => {
                const badge = getEventBadge(event.category);
                const isRsvped = rsvpedEvents[event.id];
                const isExpanded = expandedEventId === event.id;

                return (
                  <div
                    key={event.id}
                    id={`event-card-${event.id}`}
                    className="rounded-xl bg-[#0a1626] border border-[#152740] hover:border-sky-500/40 transition-all overflow-hidden shadow-sm p-5"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                      
                      {/* Left: Date Badge */}
                      <div className="lg:col-span-2 flex lg:flex-col items-center justify-center p-3.5 rounded-lg bg-[#060e1a] border border-[#142338] text-center gap-2 lg:gap-0">
                        <span className="text-xs uppercase font-bold text-sky-400 tracking-wider font-mono">
                          {new Date(event.date + 'T12:00:00').toLocaleString('en-US', { month: 'short' })}
                        </span>
                        <span className="text-2xl sm:text-3xl font-extrabold text-white">
                          {new Date(event.date + 'T12:00:00').getDate()}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">2026</span>
                      </div>

                      {/* Middle: Main Event Details */}
                      <div className="lg:col-span-7 space-y-2.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${badge.bg}`}>
                            {badge.label}
                          </span>
                          {event.isVirtual && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20 flex items-center gap-1">
                              <Video className="w-3 h-3" />
                              <span>Hybrid / Discord</span>
                            </span>
                          )}
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-white hover:text-sky-300 transition-colors">
                          {event.title}
                        </h3>

                        <p className="text-xs text-slate-300 leading-relaxed">
                          {event.description}
                        </p>

                        {/* Meta Tags: Time & Location */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-400 pt-0.5">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-sky-400" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{event.location}</span>
                          </div>
                        </div>

                        {/* Speaker Information if available */}
                        {event.speaker && (
                          <div className="pt-1.5 flex items-center gap-2">
                            <img
                              src={event.speaker.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'}
                              alt={event.speaker.name}
                              className="w-6 h-6 rounded-full object-cover border border-[#16273f]"
                              referrerPolicy="no-referrer"
                            />
                            <div className="text-xs">
                              <span className="font-semibold text-slate-200">{event.speaker.name}</span>
                              <span className="text-slate-400 text-[11px]"> • {event.speaker.title} ({event.speaker.company})</span>
                            </div>
                          </div>
                        )}

                        {/* Expandable Details: Agenda & Resources */}
                        {isExpanded && (
                          <div className="pt-3 border-t border-[#142338] space-y-2.5 text-xs">
                            {event.agenda && event.agenda.length > 0 && (
                              <div>
                                <div className="font-bold text-slate-300 mb-1">Meeting Agenda:</div>
                                <ul className="space-y-0.5 text-slate-400 list-disc list-inside">
                                  {event.agenda.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {event.prerequisites && (
                              <div>
                                <div className="font-bold text-slate-300 mb-1">Prerequisites:</div>
                                <div className="flex flex-wrap gap-1">
                                  {event.prerequisites.map((p, idx) => (
                                    <span key={idx} className="px-2 py-0.5 rounded bg-[#060e1a] border border-[#142338] text-[10px] text-slate-300">
                                      ✓ {p}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {event.resources && (
                              <div className="flex flex-wrap gap-1.5 pt-0.5">
                                {event.resources.map((res, idx) => (
                                  <a
                                    key={idx}
                                    href={res.url}
                                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#060e1a] border border-[#142338] text-sky-400 hover:text-sky-300 text-[11px] font-medium"
                                  >
                                    <FileText className="w-3 h-3" />
                                    <span>{res.label}</span>
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Right Column: RSVP Actions & Calendar Download */}
                      <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col items-stretch justify-center gap-2 pt-1 lg:pt-0">
                        {/* RSVP button */}
                        <button
                          onClick={() => handleRsvp(event.id)}
                          className={`w-full py-2 px-3.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                            isRsvped
                              ? 'bg-emerald-500 text-slate-950 shadow-sm'
                              : 'bg-emerald-500/15 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 border border-emerald-500/30'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{isRsvped ? 'You are RSVPed!' : 'RSVP for Event'}</span>
                        </button>

                        {/* Add to Calendar (.ics) */}
                        <button
                          onClick={() => downloadIcsFile(event)}
                          className="w-full py-1.5 px-3 rounded-lg bg-[#060e1a] hover:bg-[#102036] border border-[#142338] text-slate-300 hover:text-white text-xs font-medium flex items-center justify-center gap-1.5 transition cursor-pointer"
                          title="Download .ics Calendar Event"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Add to Calendar (.ics)</span>
                        </button>

                        {/* Details Toggle */}
                        <button
                          onClick={() => setExpandedEventId(isExpanded ? null : event.id)}
                          className="w-full py-1 text-slate-400 hover:text-slate-200 text-[11px] font-medium flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>{isExpanded ? 'Hide Agenda' : 'View Agenda'}</span>
                          {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </button>

                        <div className="text-center text-[10px] text-slate-400">
                          <Users className="w-3 h-3 inline mr-1 text-slate-400" />
                          <span className="font-medium text-slate-300">
                            {event.rsvpCount + (isRsvped ? 1 : 0)} attending
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          /* Semester Roadmap View */
          <div className="bg-[#0a1626] border border-[#152740] rounded-xl p-5 sm:p-7 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">Spring 2026 Semester IT Club Roadmap</h3>
              <p className="text-xs text-slate-400 mt-0.5">Strategic milestones covering technical tracks, hackathons, and certifications across all SoLAcc campuses.</p>
            </div>

            <div className="relative border-l-2 border-[#16273f] ml-3.5 space-y-6 pl-5">
              
              {/* Milestone 1 */}
              <div className="relative group">
                <div className="absolute -left-[27px] top-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#0a1626]" />
                <div className="text-xs font-mono text-emerald-400 font-bold">JANUARY - FEBRUARY</div>
                <h4 className="text-sm sm:text-base font-bold text-white mt-0.5">Club Kickoff & Homelab Cluster Deployment</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Launched the 3-node Proxmox student lab in Devalcourt Hall 214. Began initial CompTIA Security+ study groups.
                </p>
                <div className="mt-1.5 inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Completed & Active</span>
                </div>
              </div>

              {/* Milestone 2 */}
              <div className="relative group">
                <div className="absolute -left-[27px] top-0.5 w-3.5 h-3.5 rounded-full bg-sky-400 border-2 border-[#0a1626]" />
                <div className="text-xs font-mono text-sky-400 font-bold">MARCH 2026</div>
                <h4 className="text-sm sm:text-base font-bold text-white mt-0.5">CGI Innovation Center Visit & HackAcadiana</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Guest talk with CGI Cloud Architects, hands-on Linux/Bash masterclass, and 24-hour civic hackathon with $2,500 in student prizes.
                </p>
                <div className="mt-1.5 inline-flex items-center gap-1 text-[11px] text-sky-400 font-medium">
                  <Sparkles className="w-3 h-3" />
                  <span>In Progress</span>
                </div>
              </div>

              {/* Milestone 3 */}
              <div className="relative group">
                <div className="absolute -left-[27px] top-0.5 w-3.5 h-3.5 rounded-full bg-slate-600 border-2 border-[#0a1626]" />
                <div className="text-xs font-mono text-slate-400 font-bold">APRIL 2026</div>
                <h4 className="text-sm sm:text-base font-bold text-white mt-0.5">Opportunity Machine Tech Crawl & CompTIA Exam Blitz</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Touring downtown Lafayette tech incubators, 50% discount certification exam vouchers distributed for active club members.
                </p>
              </div>

              {/* Milestone 4 */}
              <div className="relative group">
                <div className="absolute -left-[27px] top-0.5 w-3.5 h-3.5 rounded-full bg-slate-600 border-2 border-[#0a1626]" />
                <div className="text-xs font-mono text-slate-400 font-bold">MAY 2026</div>
                <h4 className="text-sm sm:text-base font-bold text-white mt-0.5">End of Year Showcase & 2026-2027 Officer Elections</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Student demo day with industry judges, graduating member recognition, and voting for next year's executive board.
                </p>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
