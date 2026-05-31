# DESIGN.md — GPT Image Studio Redesign

## Direction

Turn the app from an “API utility panel” into an **AI image creation studio**: cinematic, focused, dark-first, with image results as the hero and parameters as supporting controls.

Inspirations: Runway, Cursor, Linear, modern model playgrounds. Avoid direct brand copying.

## Visual Theme

- Mood: premium creative workspace, calm but powerful.
- Density: keep power-user controls available, but progressively reveal advanced options.
- Main metaphor: a dark canvas with luminous image cards and a command composer.
- Default mode should feel polished even before any image exists.

## Colors

Use semantic Tailwind tokens where possible.

### Dark-first palette

- App background: `#070A12`
- Background radial glow 1: `rgba(124, 92, 255, 0.22)`
- Background radial glow 2: `rgba(56, 189, 248, 0.12)`
- Elevated surface: `#0F1422`
- Surface 2: `#151B2C`
- Surface glass: `rgba(15, 20, 34, 0.72)`
- Border subtle: `rgba(255, 255, 255, 0.08)`
- Border active: `rgba(124, 92, 255, 0.55)`
- Text primary: `#F8FAFC`
- Text secondary: `#A7B0C4`
- Text muted: `#677089`
- Primary accent: `#7C5CFF`
- Secondary accent: `#38BDF8`
- Success: `#22C55E`
- Warning: `#F59E0B`
- Danger: `#EF4444`

### Light palette

Light mode may exist, but the product identity is dark. If supporting light:

- App background: `#F6F8FC`
- Elevated surface: `#FFFFFF`
- Border subtle: `rgba(15, 23, 42, 0.08)`
- Primary accent: `#6D5DFB`

## Typography

- UI font: Inter / Geist / HarmonyOS Sans SC / system sans.
- Use tighter title tracking and clear hierarchy.
- Titles: 600–800 weight.
- Body: 400–500 weight.
- Controls and badges: 11–13px, medium weight.

## Layout Principles

1. **Creation first**: prompt composer and generated images are primary.
2. **Parameters second**: API/profile/model/size/quality should be visually quieter.
3. **Gallery as canvas**: image cards should breathe; metadata should not dominate.
4. **Progressive disclosure**: advanced API knobs belong in modals, drawers, popovers, or compact chips.
5. **Responsive**: mobile keeps composer accessible and image cards large.

## Main Shell

- Fixed glass header, 64px-ish height desktop.
- Header background: translucent dark glass with blur and subtle bottom border.
- App background: dark base plus soft radial gradients.
- Content max width remains okay, but cards need more negative space.
- Bottom input bar becomes a premium command composer, centered and elevated.

## Components

### Header

- Brand label: “GPT Image Studio” or app-specific fork name.
- Add a small gradient icon or badge.
- Mode switcher should look like segmented pills, not plain buttons.
- Settings/help/history are ghost icon buttons with hover glow.

### Composer / InputBar

- Looks like an AI chat composer:
  - rounded 28–32px
  - glass surface
  - gradient focus ring
  - large prompt field
  - attached reference images as elegant chips/thumbnails
  - primary generate button as gradient pill
- Keep secondary controls compact as chips below/inside composer.
- Upload/reference/mask controls should feel like creation tools, not form fields.

### Image Cards / Task Cards

- Cards: rounded 20–24px, dark glass, subtle border.
- Image preview is dominant.
- On hover: lift 2–4px, border glow, reveal actions.
- Metadata appears as small floating badges over image or in a compact row.
- Avoid large blocks of gray text under every image.

### Empty State

- Must be beautiful:
  - central hero card
  - short title like “Describe an image to begin”
  - example prompt chips
  - subtle gradient/orb background

### Modals

- Use consistent glass surfaces and 24–28px radii.
- Overlay blur should be strong enough to focus attention.
- Primary actions gradient; destructive actions remain red but restrained.

## Motion

- 150–250ms transitions.
- Hover lift should be subtle.
- Loading/generating states can use soft shimmer or animated gradient borders.
- Respect reduced motion.

## Do

- Use consistent semantic tokens.
- Prefer dark glass + subtle borders over flat gray panels.
- Make images bigger and controls quieter.
- Keep expert features reachable.

## Don’t

- Don’t turn every control into a bright button.
- Don’t expose all parameters with equal weight.
- Don’t use harsh pure black/white contrast everywhere.
- Don’t copy another product’s exact branding.

## First Implementation Pass

1. Retheme global CSS variables and body background.
2. Restyle header to glass/studio style.
3. Restyle task cards and empty state.
4. Restyle composer as a command bar.
5. Then reorganize settings/API controls if needed.
