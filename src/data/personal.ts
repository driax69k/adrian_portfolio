import type {
  NavLink,
  PersonalInfo,
  QuickInfo,
  SocialLink,
  Stat,
} from '../types';
import profileImage from '../assets/me.jpg';

export const personalInfo: PersonalInfo = {
  name: 'Adrian Cordero',
  initials: 'AC',
  title: 'Frontend Developer & UI/UX Designer',
  shortBio:
    'I build modern and practical digital experiences that combine thoughtful design, clean code, and real-world problem solving.',
  longBio: [
    'I’m a Computer Science student, who enjoys turning ideas into intuitive, visually engaging, and functional digital experiences. I focus on creating responsive websites, user-centered interfaces, and well-crafted products designed to solve real-world needs.',
    'I’m especially interested in combining thoughtful design with modern frontend technologies and AI integration. From designing seamless user experiences to developing interactive interfaces and integrating intelligent features, every project is an opportunity to learn, collaborate, and build something meaningful that people can genuinely use.',
  
  ],
  location: 'Iloilo City, Philippines',
  email: 'adriancordero.business@gmail.com',
  availability: 'Open to internships, freelance & collaborations',
  resumeUrl: '/adrian-cordero-resume-placeholder.txt',
  profileImage,
};

export const createEmailComposeUrl = ({
  subject = 'Portfolio inquiry',
  body,
}: {
  subject?: string;
  body?: string;
} = {}) => {
  const parameters = new URLSearchParams({
    view: 'cm',
    fs: '1',
    to: personalInfo.email,
    su: subject,
  });

  if (body) parameters.set('body', body);

  return `https://mail.google.com/mail/?${parameters.toString()}`;
};

export const emailComposeUrl = createEmailComposeUrl();

export const heroRoles = [
  'Web Developer',
  'UI/UX Designer',
  'Frontend Developer',
  'AI Integration',
];

export const navLinks: NavLink[] = [
  { label: 'Me', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Orgs', href: '#organizations' },
  { label: 'Contact', href: '#contact' },
];

export const socialLinks: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/driax69k', icon: 'github' },
  { name: 'Instagram', url: 'https://www.instagram.com/aids.cordero/?hl=en', icon: 'instagram' },
  { name: 'Facebook', url: 'https://www.facebook.com/adrian.cordero.332345/', icon: 'facebook' },
  { name: 'Email', url: emailComposeUrl, icon: 'mail' },
];

export const quickInfo: QuickInfo[] = [
  { label: 'Based in', value: personalInfo.location, icon: 'location' },
  { label: 'Studying', value: 'IT / Computer Science', icon: 'education' },
  { label: 'Focused on', value: 'Full-Stack Development', icon: 'code' },
  { label: 'Currently', value: 'Open to Opportunities', icon: 'spark' },
];

// Replace these placeholder values with your real milestones.
export const stats: Stat[] = [
  { label: 'Projects Completed', value: '5' },
  { label: 'Ongoing Projects', value: '2' },
  { label: 'Year Learning', value: '1' },
  { label: 'Team Projects', value: '4' },
];
