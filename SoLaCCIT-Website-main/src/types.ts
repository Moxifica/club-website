export type ProjectCategory = 
  | 'all'
  | 'cybersecurity'
  | 'web_dev'
  | 'cloud_network'
  | 'ai_hardware'
  | 'mobile';

export interface ProjectComment {
  id: string;
  author: string;
  avatar?: string;
  text: string;
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'cybersecurity' | 'web_dev' | 'cloud_network' | 'ai_hardware' | 'mobile';
  author: {
    name: string;
    role: string;
    avatar: string;
    campus: string;
    graduationYear: string;
  };
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  likes: number;
  comments: ProjectComment[];
  status: 'active' | 'completed' | 'seeking_members';
  createdAt: string;
  featured?: boolean;
}

export type EventCategory = 'all' | 'workshop' | 'speaker' | 'hackathon' | 'study_jam' | 'social';

export interface ClubEvent {
  id: string;
  title: string;
  category: 'workshop' | 'speaker' | 'hackathon' | 'study_jam' | 'social';
  date: string; // YYYY-MM-DD
  time: string; // e.g. "5:30 PM - 7:00 PM CST"
  location: string; // e.g. "Devalcourt Hall Rm 214 / Discord Voice"
  isVirtual: boolean;
  meetingLink?: string;
  description: string;
  speaker?: {
    name: string;
    title: string;
    company: string;
    avatar?: string;
  };
  rsvpCount: number;
  capacity?: number;
  prerequisites?: string[];
  agenda?: string[];
  resources?: Array<{ label: string; url: string }>;
}

export interface Member {
  id: string;
  name: string;
  role: 'Officer' | 'Member' | 'Alumni' | 'Faculty Advisor';
  title: string;
  concentration: string;
  campus: string;
  bio: string;
  skills: string[];
  certifications: string[];
  avatar: string;
  githubUrl?: string;
  linkedinUrl?: string;
  email?: string;
  isMentor: boolean;
  mentorTopic?: string;
}

export interface CareerOpportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Internship' | 'Full-time' | 'Part-time' | 'Apprenticeship';
  salaryRange?: string;
  description: string;
  requirements: string[];
  applyUrl: string;
  postedDate: string;
  isLocalPartner: boolean;
  partnerBadge?: string;
}

export interface StudyCircle {
  id: string;
  title: string;
  certName: string;
  iconName: string;
  currentTopic: string;
  meetingSchedule: string;
  leadMember: string;
  activeParticipants: number;
  studyDocsUrl: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface CollabPost {
  id: string;
  title: string;
  authorName: string;
  authorEmail: string;
  category: 'hackathon_team' | 'project_help' | 'study_buddy' | 'gear_swap';
  description: string;
  tags: string[];
  repliesCount: number;
  createdAt: string;
}

export interface MemberRegistration {
  fullName: string;
  email: string;
  studentId: string;
  concentration: string;
  campus: string;
  graduationYear: string;
  interests: string[];
  discordUsername: string;
  careerGoals: string;
}
