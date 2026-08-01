# Portfolio Color Palette Guide

## Recommended Direction: Electric Lime Editorial

The best palette for this portfolio is a focused combination of near-black,
warm off-white, and electric lime. It already matches the website's bold
typography, technical personality, and modern portfolio style.

The goal is not to add more colors. The goal is to use fewer colors more
consistently so every section feels like part of the same website.

## Core Palette

| Role | Color | Hex | Recommended use |
| --- | --- | --- | --- |
| Primary background | Ink Black | `#080808` | Hero, skills, contact, footer, project windows |
| Raised dark surface | Graphite | `#121212` | Cards and panels placed on Ink Black |
| Primary light background | Warm Paper | `#F4F4EB` | About, journey, and text-heavy sections |
| Brand accent | Electric Lime | `#9EF01A` | Main buttons, active states, icons, timeline markers |
| Accent hover | Deep Lime | `#72C600` | Hover and pressed states on light backgrounds |
| Accent surface | Lime Mist | `#DFF6B2` | Featured sections and soft highlighted panels |
| Main dark text | Ink Black | `#080808` | Text displayed on light backgrounds |
| Muted dark text | Olive Gray | `#5B5D55` | Supporting text on Warm Paper |
| Main light text | White | `#FFFFFF` | Headings displayed on dark backgrounds |
| Muted light text | Silver | `#A3A39B` | Supporting text on dark backgrounds |

## Why This Palette Works

- Electric lime gives the portfolio a memorable visual identity.
- Warm Paper is easier on the eyes than pure white and complements the lime.
- Near-black creates strong contrast without looking as harsh as pure black.
- The palette works well with the existing large headings and technical mono
  labels.
- The colors support both creative UI/UX work and software-development work.

## Recommended Color Balance

Use an approximate `60 / 30 / 10` balance:

- **60% neutral backgrounds:** Ink Black or Warm Paper.
- **30% supporting surfaces:** Graphite, white overlays, or Lime Mist.
- **10% Electric Lime:** buttons, markers, hover states, and important labels.

Electric Lime is most effective when it is limited. Avoid using it for long
paragraphs or large background areas unless the text placed on it is black.

## Accessible Text Pairings

| Text | Background | Contrast | Recommended |
| --- | --- | ---: | --- |
| `#080808` | `#F4F4EB` | 18.11:1 | Excellent |
| `#080808` | `#9EF01A` | 14.24:1 | Excellent for buttons |
| `#121212` | `#DFF6B2` | 16.02:1 | Excellent |
| `#5B5D55` | `#F4F4EB` | 6.04:1 | Good for body text |
| `#FFFFFF` | `#121212` | 18.73:1 | Excellent |
| `#A3A39B` | `#080808` | 7.89:1 | Good for supporting text |
| `#72C600` | `#FFFFFF` | 2.14:1 | Avoid for small text |

Use black text on lime buttons. Deep Lime should be used as a border,
decoration, or hover background rather than small text on white.

## Section Color Recipe

| Section | Background | Main text | Accent |
| --- | --- | --- | --- |
| Hero | `#080808` | `#FFFFFF` | `#9EF01A` |
| About | `#F4F4EB` | `#080808` | `#9EF01A` |
| Skills | `#080808` | `#FFFFFF` | `#9EF01A` |
| Projects | `#F4F4EB` | `#080808` | `#9EF01A` |
| Journey | `#F4F4EB` | `#080808` | `#9EF01A` |
| School Organizations | `#DFF6B2` | `#080808` | `#9EF01A` |
| Contact | `#080808` | `#FFFFFF` | `#9EF01A` |
| Footer | `#050505` | `#FFFFFF` | `#9EF01A` |

## Component Rules

### Buttons

- Primary: Lime background, black text, black or lime border.
- Primary hover: Deep Lime background, black text.
- Secondary dark: Transparent background, white border, white text.
- Secondary light: Transparent background, black border, black text.
- Always include a visible keyboard focus ring.

### Cards

- On dark sections: use `#121212` with a subtle white border.
- On light sections: use a white overlay or Warm Paper with a subtle black
  border.
- Use lime for one small detail such as an icon, badge, or top border.
- Avoid giving every card a strong lime background.

### Typography

- Headings on dark backgrounds: White.
- Paragraphs on dark backgrounds: Silver or white with reduced opacity.
- Headings on light backgrounds: Ink Black.
- Paragraphs on light backgrounds: Olive Gray.
- Mono labels: Electric Lime on dark sections and Ink Black on lime sections.

### Borders and Shadows

- Dark border: black at 10% to 20% opacity.
- Light border: white at 10% to 15% opacity.
- Keep shadows neutral rather than green.
- Use a lime glow only for important interactive states.

## Suggested CSS Tokens

Add these variables to the global stylesheet when the site is ready to be
standardized:

```css
:root {
  --color-ink: #080808;
  --color-graphite: #121212;
  --color-paper: #f4f4eb;
  --color-lime: #9ef01a;
  --color-lime-hover: #72c600;
  --color-lime-mist: #dff6b2;
  --color-text-dark-muted: #5b5d55;
  --color-text-light: #ffffff;
  --color-text-light-muted: #a3a39b;
}
```

Example usage:

```css
.primary-button {
  background: var(--color-lime);
  color: var(--color-ink);
}

.primary-button:hover {
  background: var(--color-lime-hover);
}
```

## Colors to Consolidate

The current project contains several colors that are visually very similar.
Reducing them to the core tokens will make future editing easier.

- Replace most `#050505`, `#090909`, `#0B0B0B`, `#101010`, `#151515`, and
  `#171717` surfaces with either Ink Black or Graphite.
- Replace most `#F7F7EF` backgrounds with Warm Paper.
- Replace most `#78C800`, `#9ACB48`, and `#B7F34B` accents with Electric Lime
  or Deep Lime.
- Keep blue, yellow, purple, and orange only when they identify a specific
  technology or category.

## Optional Alternative Palettes

If the brand direction changes later, replace the lime family with only one of
these accent families. Do not combine all of them.

### Midnight Cyan

- Accent: `#22D3EE`
- Hover: `#0891B2`
- Soft surface: `#CFFAFE`
- Mood: polished, technical, and futuristic.

### Graphite Amber

- Accent: `#FBBF24`
- Hover: `#D97706`
- Soft surface: `#FEF3C7`
- Mood: warm, confident, and editorial.

### Digital Violet

- Accent: `#A78BFA`
- Hover: `#7C3AED`
- Soft surface: `#EDE9FE`
- Mood: creative, experimental, and AI-focused.

## Final Recommendation

Keep Electric Lime as the main brand accent. It is already the most memorable
part of the website and works well with the current visual style. Standardize
the neutral colors, reserve lime for meaningful emphasis, and use the
alternative colors only for technology icons or project categories.
