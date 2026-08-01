import cdgLogo from '../assets/CDG-optimized.jpg';
import cipherLogo from '../assets/Cipher-optimized.jpg';
import cssLogo from '../assets/CSS-optimized.jpg';
import peerFacilitatorsLogo from '../assets/peer_facilitators.jpg';

export interface SchoolOrganization {
  id: string;
  name: string;
  logo?: string;
  role?: string;
  period?: string;
  location?: string;
  description?: string;
  activities?: string[];
}

export const schoolOrganizations: SchoolOrganization[] = [
  {
    id: 'peer-facilitators',
    name: 'CCS Peer Facilitators',
    role: 'Assistant Business Manager',
    period: 'Current',
    location: 'Central Philippine University',
    logo: peerFacilitatorsLogo,
    description:
      "We are the CCS Peer Facilitators, dedicated to supporting students within the College of Computer Studies by listening to their concerns, offering encouragement, and connecting them with the school's Guidance Office whenever professional assistance is needed.",
  },
  {
    id: 'computer-science-society',
    name: 'Computer Science Society',
    role: 'Communications Officer',
    period: 'SY 2026-2027',
    location: ' Central Philippine University',
    description:'The Computer Science Society is a student organization under the College of Computer Studies dedicated to supporting and empowering Computer Science students. The organization promotes academic growth, technical skills, collaboration, leadership, and innovation through workshops, competitions, seminars, community activities, and technology-driven projects.',
    logo: cssLogo,
  },
  {
    id: 'cdg',
    name: 'Centralian Developer Group',
    role: 'Operations Associate',
    period: 'SY 2026-2027',
    location: 'Central Philippine University',
    description: 'The Centralian Developer Group (CDG) is a multidisciplinary community of high school and collegiate students committed to advancing knowledge through peer-to-peer learning, fostering professional and personal networks, and developing innovative solutions to address local challenges through technology and development.',
    logo: cdgLogo,
  },
  {
    id: 'cipher',
    name: 'CPU - The Cipher',
    role: ' Applying for Photo Editor',
    location: 'Central Philippine University',
    description: 'Central Philippine University’s Official College of Computer Studies Student Publication and Media Outlet founded in 2017.',
    logo: cipherLogo,
  },
];
