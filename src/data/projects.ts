import type { Project, ProjectCategory } from '../types';

export const projectCategories: Array<{
  key: ProjectCategory;
  label: string;
}> = [
  { key: 'all', label: 'All' },
  { key: 'web', label: 'Web' },
  { key: 'mobile', label: 'Mobile' },
  { key: 'desktop', label: 'Desktop' },
  { key: 'ai', label: 'AI' },
];

// Add a liveUrl when a public interactive demo becomes available. Until then,
// each project card offers a pre-filled email request for private demo access.
export const projects: Project[] = [
  {
    id: 'css-tutorial-clinic-dashboard',
    title: 'CSS Tutorial Clinic Dashboard (Ongoing)',
    description:
      'A focused student dashboard for learning points, rank, attendance, instructor notes, upcoming sessions, and recent activity.',
    technologies: ['React', 'Tailwind CSS', 'Supabase', 'TypeScript'],
    year: '2026',
    features: [
      'A unified student view for learning points, rank, and attendance.',
      'Instructor notes, upcoming tutorial sessions, and recent activity in one dashboard.',
      'Responsive, typed interface components backed by Supabase data.',
    ],
    impact: [
      'Helps students understand their progress without checking several separate records.',
      'Makes instructor feedback and upcoming commitments easier to act on.',
      'Gives tutorial staff a clearer foundation for consistent student communication.',
    ],
    category: 'web',
    featured: false,
  },
  {
    id: '8finity',
    title: '8Finity',
    description:
      'A luxury-styled agency website for 8Finity Elite Solutions, presenting virtual-assistance and outsourcing services through a polished, responsive experience.',
    technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    year: '2026',
    features: [
      'A premium black-and-gold landing experience with responsive navigation and motion-led presentation.',
      'Clear service showcases for digital marketing, social media, customer service, sales, appointment setting, and executive assistance.',
      'Company, team, and contact sections that guide prospective clients from brand discovery to inquiry.',
    ],
    impact: [
      'Gives 8Finity Elite Solutions a cohesive digital presence for its virtual-assistance and outsourcing services.',
      'Makes the agency’s capabilities, team, and positioning easier for prospective clients to understand.',
      'Creates a focused path for visitors to explore services and start a business inquiry.',
    ],
    category: 'web',
    featured: true,
  },
  {
    id: 'floodio',
    title: 'Floodio',
    description:
       'Our team presented this Flutter emergency communication app at the University of the Philippines Visayas Komsai Hack, where it earned 1st Runner-Up and Most Innovative Hack.',
    technologies: ['Flutter', 'Dart', 'Bluetooth', 'Wi-Fi Direct'],
    year: '2026',
    features: [
      'Store-and-forward emergency messaging designed for unstable or unavailable internet access.',
      'Nearby-device communication through Bluetooth and Wi-Fi Direct.',
      'A focused mobile workflow for composing, receiving, and relaying urgent messages.',
    ],
    impact: [
      'Our presentation of Floodio earned the team 1st Runner-Up and Most Innovative Hack recognition at the UP Visayas Komsai Hack.',
      'Keeps essential communication moving when conventional networks are disrupted.',
      'Extends the reach of urgent messages through nearby participating devices.',
    ],
    category: 'mobile',
    featured: true,
  },
  {
    id: 'python-inventory-system',
    title: 'Python Inventory System',
    description:
      'A Python desktop system for managing products, sales, expenses, inventory records, and clear accounting summaries.',
    technologies: ['Python', 'Tkinter', 'CSV', 'OOP'],
    year: '2026',
    features: [
      'Product and stock management with clear inventory status updates.',
      'Sales and expense recording through a focused Tkinter desktop interface.',
      'CSV-based persistence and reusable object-oriented application structure.',
    ],
    impact: [
      'Replaces scattered manual records with one dependable desktop workflow.',
      'Improves visibility into stock movement, sales, and day-to-day expenses.',
      'Produces straightforward summaries that support faster accounting checks.',
    ],
    category: 'desktop',
    featured: false,
  },
  {
    id: 'ecolap-challenge',
    title: 'EcoLap Challenge',
    description:
      'A gamified mobility application that rewards environmentally friendly transportation choices and promotes lower carbon emissions.',
    technologies: ['React', 'Firebase'],
    year: '2026',
    features: [
      'Mobility challenges that reward environmentally responsible travel choices.',
      'Progress tracking and Firebase-backed updates across the user experience.',
      'A gamified interface built to keep sustainability goals visible and engaging.',
    ],
    impact: [
      'Turns lower-carbon transportation into an approachable personal challenge.',
      'Reinforces sustainable habits through visible goals and feedback.',
      'Creates opportunities for shared challenges that expand individual action into community participation.',
    ],
    category: 'web',
    featured: false,
  },
];
