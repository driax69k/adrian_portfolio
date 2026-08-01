# Alternative Portfolio Palette Prompt

## Recommended Direction: Midnight Cobalt Studio

This is the strongest alternative to the current lime palette. Midnight navy
keeps the technical, premium feel; cobalt adds energy and confidence; warm
ivory prevents the site from feeling cold; and coral adds a small amount of
personality without competing with project content.

### Palette

| Role | Name | Hex |
| --- | --- | --- |
| Dark canvas | Midnight Navy | `#081426` |
| Raised dark surface | Harbor Navy | `#10213A` |
| Light canvas | Warm Ivory | `#F7F2E8` |
| Primary accent | Electric Cobalt | `#315BFF` |
| Accent hover | Deep Cobalt | `#2447D8` |
| Soft accent surface | Cobalt Mist | `#DCE6FF` |
| Secondary accent | Signal Coral | `#FF6B5E` |
| Text on light | Charcoal Navy | `#111827` |
| Muted text on light | Slate | `#526070` |
| Text on dark | White | `#FFFFFF` |
| Muted text on dark | Cloud Blue | `#AAB8CC` |

Signal Coral is a secondary accent only. Reserve it for availability dots,
small status labels, or one memorable detail per screen. Cobalt remains the
main interactive color.

## Copy/Paste Prompt

Copy everything inside the block below and paste it into a new request.

```text
Replace the current Electric Lime color system in my portfolio with a new
palette called "Midnight Cobalt Studio." Implement the palette throughout the
actual website, not only in a Markdown guide.

Use these exact colors and semantic roles:

- Dark canvas — Midnight Navy: #081426
- Raised dark surface — Harbor Navy: #10213A
- Light canvas — Warm Ivory: #F7F2E8
- Primary accent — Electric Cobalt: #315BFF
- Accent hover/pressed — Deep Cobalt: #2447D8
- Soft accent surface — Cobalt Mist: #DCE6FF
- Secondary accent — Signal Coral: #FF6B5E
- Text on light — Charcoal Navy: #111827
- Muted text on light — Slate: #526070
- Text on dark — White: #FFFFFF
- Muted text on dark — Cloud Blue: #AAB8CC

Design direction:

- Keep the portfolio's bold editorial layout, typography, animations, and
  existing content.
- Replace all lime, green, near-black, and warm-paper brand colors with the
  appropriate semantic colors from this new palette.
- Use Electric Cobalt as the only primary interactive accent for buttons,
  links, focus rings, active navigation, icons, timeline markers, and hover
  emphasis.
- Use Signal Coral very sparingly: availability/status indicators, a tiny
  badge, or one small visual detail per section. Do not use coral for primary
  buttons or large backgrounds.
- Preserve the current alternating light/dark page rhythm: Warm Ivory for the
  Hero, About, and Experience sections; Midnight Navy for Skills, Contact, and
  Footer; Harbor Navy for Projects; and Cobalt Mist for School Organizations.
- Use White on Electric Cobalt buttons. Use Charcoal Navy on Signal Coral and
  Cobalt Mist.
- Do not use cobalt, coral, or muted colors for long paragraphs.
- Consolidate duplicate hard-coded shades into semantic CSS variables or
  tokens wherever practical.
- Recolor the favicon, Open Graph image, profile placeholder, loading screen,
  navigation, project modal, buttons, cards, borders, glows, and focus states
  so the brand is consistent everywhere.
- Keep authentic technology-logo colors when they communicate a specific
  technology; do not recolor those icons into the brand palette.
- Maintain WCAG AA contrast, visible keyboard focus, responsive behavior, and
  prefers-reduced-motion support.
- Avoid changing layout, copy, data, animation timing, or component behavior
  unless a small color-related adjustment is necessary for readability.

Suggested global tokens:

:root {
  --color-canvas-dark: #081426;
  --color-surface-dark: #10213a;
  --color-canvas-light: #f7f2e8;
  --color-accent: #315bff;
  --color-accent-hover: #2447d8;
  --color-accent-soft: #dce6ff;
  --color-accent-secondary: #ff6b5e;
  --color-text-on-light: #111827;
  --color-text-muted-on-light: #526070;
  --color-text-on-dark: #ffffff;
  --color-text-muted-on-dark: #aab8cc;
}

After implementation, search the source and public assets for old brand hex
values such as #9EF01A, #72C600, #DFF6B2, #F4F4EB, and their case variants.
Remove intentional brand-color remnants while leaving third-party technology
logo colors alone. Then run the typecheck, lint, and production build. Report
which files changed, which old colors remain intentionally, and the validation
results.
```

## Verified Contrast Pairings

| Foreground | Background | Contrast |
| --- | --- | ---: |
| `#111827` | `#F7F2E8` | 15.90:1 |
| `#FFFFFF` | `#081426` | 18.45:1 |
| `#FFFFFF` | `#315BFF` | 5.16:1 |
| `#FFFFFF` | `#2447D8` | 7.08:1 |
| `#111827` | `#DCE6FF` | 14.20:1 |
| `#526070` | `#F7F2E8` | 5.76:1 |
| `#AAB8CC` | `#081426` | 9.17:1 |
| `#081426` | `#FF6B5E` | 6.60:1 |
