# Purple Portfolio Palette Prompt

## Recommended Direction: Royal Violet Atelier

This is the strongest purple direction for the portfolio. Deep plum replaces
ordinary black, lavender ivory keeps light sections warm and readable, and
Royal Violet provides a polished creative-technology identity. A small Orchid
Pink accent adds personality without making the design feel overly playful.

### Palette

| Role | Name | Hex |
| --- | --- | --- |
| Dark canvas | Midnight Plum | `#120B24` |
| Raised dark surface | Aubergine | `#20133A` |
| Light canvas | Lavender Ivory | `#F8F5FC` |
| Primary accent | Royal Violet | `#7C3AED` |
| Accent hover/pressed | Deep Violet | `#6D28D9` |
| Soft accent surface | Lavender Mist | `#EDE9FE` |
| Secondary accent | Orchid Pink | `#EC4899` |
| Text on light | Plum Black | `#1F1633` |
| Muted text on light | Dusty Plum | `#62566F` |
| Text on dark | White | `#FFFFFF` |
| Muted text on dark | Lilac Gray | `#C4B5D4` |

Orchid Pink is only for small availability or status details. Royal Violet
remains the primary interaction color.

Royal Violet does not have enough contrast for small text directly on the dark
plum surfaces. Use Lavender Mist or white for small labels on dark sections,
while keeping violet for fills, borders, focus rings, icons, glows, and large
display text.

## Copy/Paste Prompt

Copy everything inside the block below and paste it into a new request.

```text
Replace the current Midnight Cobalt Studio color system in my portfolio with a
purple palette called "Royal Violet Atelier." Implement it throughout the
actual website, not only in a Markdown guide.

Use these exact colors and semantic roles:

- Dark canvas — Midnight Plum: #120B24
- Raised dark surface — Aubergine: #20133A
- Light canvas — Lavender Ivory: #F8F5FC
- Primary accent — Royal Violet: #7C3AED
- Accent hover/pressed — Deep Violet: #6D28D9
- Soft accent surface — Lavender Mist: #EDE9FE
- Secondary accent — Orchid Pink: #EC4899
- Text on light — Plum Black: #1F1633
- Muted text on light — Dusty Plum: #62566F
- Text on dark — White: #FFFFFF
- Muted text on dark — Lilac Gray: #C4B5D4

Design direction:

- Keep the portfolio's bold editorial layout, typography, responsive behavior,
  animations, content, and component behavior.
- Replace the current navy, cobalt, coral, ivory, lime, green, and near-black
  brand colors with the appropriate semantic colors from this palette.
- Use Royal Violet as the primary interactive accent for button fills, active
  navigation, focus rings, borders, icons, timeline markers, glows, and hover
  emphasis.
- Use Deep Violet for hover and pressed states. Use white text on both Royal
  Violet and Deep Violet button fills.
- Use Orchid Pink very sparingly for availability dots, status labels, or one
  tiny memorable detail per screen. Do not use it for primary buttons, large
  backgrounds, or paragraphs.
- Preserve the alternating section rhythm: Lavender Ivory for Hero, About, and
  Experience; Midnight Plum for Skills, Contact, loading screen, and Footer;
  Aubergine for Projects and raised dark cards; Lavender Mist for School
  Organizations and quiet highlighted panels.
- Use Plum Black headings and Dusty Plum body text on light surfaces. Use white
  headings and Lilac Gray body text on dark surfaces.
- Royal Violet is only 3.03–3.35:1 against the dark plum surfaces, so do not use
  it for small text on dark backgrounds. Use Lavender Mist or white for small
  dark-section labels, while keeping violet on non-text accents and display
  text large enough to meet the 3:1 large-text requirement.
- Do not use violet, pink, or muted colors for long paragraphs.
- Consolidate hard-coded brand colors into semantic Tailwind theme variables or
  CSS custom properties wherever practical.
- Recolor the favicon, Open Graph image, profile placeholder, loading screen,
  navbar, project modal, buttons, cards, borders, glows, focus states, selection,
  and scrollbar so every visible brand surface is consistent.
- Keep authentic technology-logo colors when they identify a specific tool.
- Preserve functional error and success colors when they communicate form
  state rather than portfolio branding.
- Maintain WCAG AA contrast, visible keyboard focus, responsive behavior, and
  prefers-reduced-motion support.
- Do not change layout, copy, data, animation timing, or navigation behavior
  unless a small color-related adjustment is required for readability.

Use these global tokens:

@theme {
  --color-canvas-dark: #120b24;
  --color-surface-dark: #20133a;
  --color-canvas-light: #f8f5fc;
  --color-accent: #7c3aed;
  --color-accent-hover: #6d28d9;
  --color-accent-soft: #ede9fe;
  --color-accent-secondary: #ec4899;
  --color-text-on-light: #1f1633;
  --color-text-muted-on-light: #62566f;
  --color-text-on-dark: #ffffff;
  --color-text-muted-on-dark: #c4b5d4;
}

After implementation, search src, public, and index.html for the previous brand
values and RGB glows, including #315BFF, #2447D8, #DCE6FF, #081426, #10213A,
#F7F2E8, #FF6B5E, #111827, #526070, #AAB8CC, rgba(49,91,255,...), and any
remaining Electric Lime palette values. Remove brand-color remnants while
leaving technology-logo and functional form-state colors alone.

Then run the typecheck, lint, and production build. Report which files changed,
which non-purple colors remain intentionally, the contrast-sensitive choices,
and all validation results.
```

## Verified Contrast Pairings

| Foreground | Background | Contrast | Guidance |
| --- | --- | ---: | --- |
| `#1F1633` | `#F8F5FC` | 15.94:1 | Primary text on light |
| `#FFFFFF` | `#120B24` | 19.11:1 | Primary text on dark |
| `#FFFFFF` | `#7C3AED` | 5.70:1 | Primary buttons |
| `#FFFFFF` | `#6D28D9` | 7.10:1 | Hover/pressed buttons |
| `#1F1633` | `#EDE9FE` | 14.49:1 | Text on soft sections |
| `#62566F` | `#F8F5FC` | 6.32:1 | Supporting text on light |
| `#C4B5D4` | `#120B24` | 9.92:1 | Supporting text on dark |
| `#120B24` | `#EC4899` | 5.42:1 | Small status labels |
| `#7C3AED` | `#F8F5FC` | 5.28:1 | Violet links on light |

## Final Recommendation

Choose Royal Violet Atelier if you want the portfolio to feel more creative,
design-led, and AI-oriented than the current cobalt direction. It remains
professional because most of the interface is still built from plum and ivory;
violet and orchid are reserved for deliberate emphasis.
