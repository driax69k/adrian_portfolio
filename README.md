# Adrian Cordero — Developer Portfolio

A modern, responsive portfolio built with React, TypeScript, Vite, Tailwind CSS, GSAP, and ScrollTrigger. It includes a short loader, animated hero, active navigation, project previews, editable journey and organization timelines, a server-backed contact form, reduced-motion support, and optimized local artwork.

## Run locally

Requirements:

- Node.js 20.19+ or 22.12+
- npm

```bash
npm install
npm run dev
```

Vite will print the local URL, usually `http://localhost:5173`.

## Quality checks

```bash
npm run typecheck
npm run lint
npm run build
npm run preview
```

The production output is written to `dist/`.

## Project structure

```text
src/
├── assets/                  # Imported source assets
├── components/
│   ├── layout/              # Navbar and footer
│   ├── sections/            # Portfolio page sections
│   └── ui/                  # Reusable buttons, fields, cards, headings
├── data/                    # Editable portfolio content
├── hooks/                   # Media, scroll, and magnetic-button hooks
├── types/                   # Shared TypeScript interfaces
├── utils/                   # GSAP registration and helpers
├── App.tsx
├── main.tsx
└── index.css

public/
├── og-image.svg
├── favicon.svg
└── adrian-cordero-resume-placeholder.txt
```

## Edit personal information

The main content is intentionally centralized:

- `src/data/personal.ts` — name, bio, email, location, social links, roles, navigation, statistics, and development process
- `src/data/projects.ts` — project descriptions, categories, technology tags, and optional live links
- `src/data/skills.ts` — skill categories, names, icons, and accent colors
- `src/data/experience.ts` — education, projects, hackathons, and organization entries
- `src/types/index.ts` — shared data shapes

Personal details, social URLs, statistics, and timeline items can be updated in
the data files without changing the section components.

### Profile image

Replace `src/assets/me.jpg` with an optimized image using the same filename, or
import a new image and update `profileImage` in `src/data/personal.ts`. Keep a
known width and height to prevent layout shift.

### Resume

1. Add your PDF to `public/`, for example `public/adrian-cordero-resume.pdf`.
2. Change `resumeUrl` in `src/data/personal.ts` to:

```ts
resumeUrl: '/adrian-cordero-resume.pdf',
```

### Social and project links

Replace the safe root URLs in the data files with your real GitHub, LinkedIn, Facebook, repository, and demo URLs.

## Add a project

1. Open `src/data/projects.ts`.
2. Add an object to the `projects` array:

```ts
{
  id: 'unique-project-id',
  title: 'Project Name',
  description: 'A concise explanation of the problem and solution.',
  technologies: ['React', 'TypeScript'],
  year: '2026',
  features: ['Primary project feature'],
  impact: ['Outcome created by the project'],
  category: 'web', // web | mobile | desktop | ai
  liveUrl: 'https://your-demo.example',
  featured: false,
}
```

The `id` identifies the project and its floating case-study window. `liveUrl`
is optional. Without one, the project window provides a pre-filled email
request for a private live interactive link.

## Connect the contact form

The contact form submits to the Vercel Function in `api/contact.ts`. The
function validates each request and sends the message through the Resend API.

1. Create a Resend account and API key.
2. Copy `.env.example` to `.env.local` for local development.
3. Set `RESEND_API_KEY` to the API key.
4. Set `CONTACT_TO_EMAIL` to the inbox that should receive messages.
5. For initial testing, keep `CONTACT_FROM_EMAIL` set to
   `Adrian Cordero Portfolio <onboarding@resend.dev>`. Resend permits this
   sender only when delivering to the email associated with your Resend
   account.
6. For production delivery, verify a domain in Resend and replace
   `CONTACT_FROM_EMAIL` with an address on that domain.

Add the same three variables in Vercel under **Project Settings → Environment
Variables**, then redeploy the site. Run `vercel dev` instead of the standard
Vite development command when testing the serverless API locally.

Do not prefix the API key with `VITE_` and never commit it. Variables beginning
with `VITE_` are exposed to browser code.

## Animation and accessibility

- GSAP and ScrollTrigger are registered once in `src/utils/gsap.ts`.
- Component animations are scoped with `gsap.context()` and reverted during cleanup.
- ScrollTrigger refreshes after initial content and font loading, and after project filters change.
- Motion uses transforms and opacity rather than layout-heavy properties.
- `prefers-reduced-motion` disables or simplifies complex animation.
- Native smooth scrolling is used to avoid scroll-jacking and third-party scroller synchronization issues.

## SEO

Update `index.html` when you have a final production domain and social preview image. The page already includes a title, description, author, Open Graph, Twitter card, theme color, favicon, and semantic heading structure.
