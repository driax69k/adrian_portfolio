# Portfolio Color Palette Guide

## Best Direction: Electric Lime Editorial

The strongest palette for this portfolio is **warm off-white, near-black, and
electric lime**. It matches the site's bold type, technical mono labels, sharp
UI, and developer-focused personality while remaining memorable without
feeling overly colorful.

The visual identity should come from contrast and disciplined lime accents,
not from adding more brand colors.

## Core Palette

| Role | Name | Hex | Use |
| --- | --- | --- | --- |
| Light canvas | Warm Paper | `#F4F4EB` | Hero, About, Experience, modal backgrounds |
| Dark canvas | Ink Black | `#080808` | Skills, Contact, loading screen, footer |
| Raised dark surface | Graphite | `#121212` | Projects section, cards, panels |
| Primary accent | Electric Lime | `#9EF01A` | CTAs, active states, markers, small highlights |
| Accent hover | Deep Lime | `#72C600` | Hover/pressed fills on light backgrounds |
| Accent surface | Lime Mist | `#DFF6B2` | Featured section or quiet highlighted panel |
| Text on light | Ink Black | `#080808` | Headings and primary body text |
| Muted text on light | Olive Gray | `#5B5D55` | Supporting copy and metadata |
| Text on dark | White | `#FFFFFF` | Headings and primary copy |
| Muted text on dark | Silver | `#A3A39B` | Supporting copy and metadata |

## Recommended Balance

Use the palette at roughly **60 / 30 / 10**:

- **60% canvas:** Warm Paper or Ink Black.
- **30% surfaces:** Graphite, Lime Mist, or subtle neutral overlays.
- **10% accent:** Electric Lime and Deep Lime.

Electric Lime is most memorable when it is scarce. Use it to direct attention,
not for long paragraphs or every card.

## Section Recipe

This mapping follows the portfolio's current light-to-dark rhythm.

| Section | Background | Primary text | Accent |
| --- | --- | --- | --- |
| Navbar | Translucent Warm Paper / Ink Black | `#080808` / `#FFFFFF` | `#9EF01A` |
| Hero | `#F4F4EB` | `#080808` | `#9EF01A` |
| Marquee | `#080808` and `#9EF01A` bands | `#FFFFFF` / `#080808` | `#9EF01A` |
| About | `#F4F4EB` | `#080808` | `#9EF01A` |
| Skills | `#080808` | `#FFFFFF` | `#9EF01A` |
| Projects | `#121212` | `#FFFFFF` | `#9EF01A` |
| Experience | `#F4F4EB` | `#080808` | `#9EF01A` |
| School Organizations | `#DFF6B2` | `#080808` | `#9EF01A` |
| Contact | `#080808` | `#FFFFFF` | `#9EF01A` |
| Footer | `#080808` | `#FFFFFF` | `#9EF01A` |

Alternating light and dark sections gives the long page a clear reading rhythm.
Avoid placing several full lime sections next to one another.

## Accessible Pairings

| Foreground | Background | Contrast | Guidance |
| --- | --- | ---: | --- |
| `#080808` | `#F4F4EB` | 18.11:1 | Excellent for all text |
| `#080808` | `#9EF01A` | 14.24:1 | Excellent for buttons and badges |
| `#080808` | `#72C600` | 9.34:1 | Excellent for hover/pressed buttons |
| `#080808` | `#DFF6B2` | 17.13:1 | Excellent for featured sections |
| `#FFFFFF` | `#121212` | 18.73:1 | Excellent for all text |
| `#A3A39B` | `#080808` | 7.89:1 | Good for supporting text |
| `#5B5D55` | `#F4F4EB` | 6.04:1 | Good for body text |
| `#72C600` | `#FFFFFF` | 2.14:1 | Do not use for text |

Always use Ink Black text on lime fills. Deep Lime is a fill, border, or
decorative color—not small text on a light background.

## Component Rules

### Buttons

- Primary: Electric Lime fill with Ink Black text.
- Primary hover: Deep Lime fill with Ink Black text.
- Secondary on light: transparent with an Ink Black border and text.
- Secondary on dark: transparent with a white border and text.
- Keyboard focus: a visible Electric Lime ring, with enough offset to separate
  it from the component.

### Cards

- On dark canvas: Graphite or a very subtle white overlay with a 10–15% white
  border.
- On light canvas: Warm Paper or a subtle white overlay with a 10–15% black
  border.
- Limit lime to one strong detail per card: an icon, status dot, top rule, or
  hover state.
- Keep shadows neutral; reserve lime glow for active interactive elements.

### Type

- Use Ink Black headings and Olive Gray supporting copy on Warm Paper.
- Use white headings and Silver supporting copy on Ink Black or Graphite.
- Use Electric Lime for short mono labels on dark sections.
- Never set paragraphs in lime.

## CSS Tokens

Use semantic tokens so the palette can be adjusted without searching through
every component.

```css
:root {
  --color-canvas-light: #f4f4eb;
  --color-canvas-dark: #080808;
  --color-surface-dark: #121212;

  --color-accent: #9ef01a;
  --color-accent-hover: #72c600;
  --color-accent-soft: #dff6b2;

  --color-text-on-light: #080808;
  --color-text-muted-on-light: #5b5d55;
  --color-text-on-dark: #ffffff;
  --color-text-muted-on-dark: #a3a39b;
}
```

Example:

```css
.primary-button {
  color: var(--color-text-on-light);
  background: var(--color-accent);
}

.primary-button:hover {
  background: var(--color-accent-hover);
}
```

## Colors to Consolidate

The current source contains several nearly identical shades. Standardizing
them will make the design feel more intentional and simplify maintenance.

| Current colors | Consolidate to |
| --- | --- |
| `#050505`, `#090909`, `#0B0B0B` | `#080808` for canvas or `#121212` for raised surfaces |
| `#101010`, `#151515`, `#171717` | `#121212` |
| `#F7F7EF` | `#F4F4EB` |
| `#9ACB48`, `#B7F34B` | `#9EF01A` or an opacity of it |
| `#78C800` | `#72C600` |
| `#D9F2A1` | `#DFF6B2` |

Technology logo colors can remain authentic because they identify a tool, not
the portfolio brand.

The current Open Graph image uses cyan and navy, while the live interface uses
lime and near-black. Recoloring the Open Graph image and any remaining
placeholder artwork to this palette would make shared links feel consistent
with the site.

## Final Recommendation

Keep **Electric Lime Editorial** as the single brand system. It is already the
site's most distinctive visual cue. The biggest improvement will come from
standardizing neutral shades and using lime more selectively—not from choosing
a different accent color.
