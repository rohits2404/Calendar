# Interactive Calendar

A premium-quality, production-ready interactive calendar web app built with React, TypeScript, and Tailwind CSS v4. Inspired by the aesthetic of a physical wall calendar — clean, elegant, and tactile.

## Live Demo

Deployed on Netlify. `https://calendlley.netlify.app` URL.

---

## Design Choices

### Wall Calendar Aesthetic
The layout is intentionally structured as three distinct panels — a hero image, a calendar grid, and a notes section — mirroring the spatial arrangement of a physical wall calendar. Subtle shadows and a warm paper-toned palette reinforce the analog feel.

### Hero Images Per Month
Each of the 12 months maps to a curated Unsplash photograph that evokes the season and mood of that time of year (cherry blossoms for April, a beach for June, autumn foliage for October, snow for December). Images lazy-load and cross-fade with a smooth scale animation when the month changes.

### Date Range Selection
Clicking a date sets the start; clicking another sets the end. The range, start, and end each have distinct visual states. A live hover preview shows the prospective range before committing. The range label and day count are displayed in the range badge above the grid.

### Notes System
Three note scopes — per day, per date range, and per month — cover the most natural ways people annotate a calendar. Notes are color-coded with six options, editable in-place, and persisted automatically to `localStorage`. No backend is required.

### Seasonal Theming
The Spring / Summer / Autumn / Winter buttons in the toolbar apply a CSS variable–based theme that shifts the primary accent color across the entire UI. The season is auto-set based on the current month and updates as you navigate. Dark mode is handled the same way — a single `dark` class on `<html>` combined with CSS custom properties.

### Animation
Framer Motion powers the month transition (a subtle 3D page-flip effect), hero image cross-fades, date cell hover scales, note card enter/exit animations, and the range badge slide-in. Animations are kept purposeful and short to avoid feeling gratuitous.

### State Management
Zustand with the `persist` middleware handles all calendar state. It is lightweight, has zero boilerplate, and the `partialize` option lets us selectively persist only what matters (notes, dark mode, current month) while keeping transient state (hovered date, animation direction) ephemeral.

### Tailwind CSS v4
All theming is done with CSS custom properties under `@theme inline` — no `tailwind.config.js` file. Seasonal and dark-mode overrides are plain CSS class rules that swap the HSL variable values, keeping the approach simple and deterministic.

---

## Tech Stack

| Layer | Choice |
|---|---|
| UI Framework | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (CSS-variable theming, no config file) |
| Animation | Framer Motion |
| State | Zustand (with `persist` middleware) |
| Bundler | Vite 8 |
| Routing | React-Router-Dom |
| Package manager | bun |
| Persistence | `localStorage` via Zustand persist |

---

## Project Structure

```
artifacts/calendar-app/
├── src/
│   ├── components/
│   │   ├── CalendarGrid.tsx   # 7-column date grid, keyboard nav, month animation
│   │   ├── DateCell.tsx       # Individual day cell with range/holiday/note states
│   │   ├── HeroImage.tsx      # Monthly photo with cross-fade transition
│   │   ├── HolidayTooltip.tsx # Fixed tooltip shown when hovering a holiday
│   │   ├── NotesPanel.tsx     # Day / range / month notes with inline editing
│   │   ├── RangeSelector.tsx  # Selected range badge with day count
│   │   ├── ThemeManager.tsx   # Applies dark + seasonal CSS classes to <html>
│   │   └── Toolbar.tsx        # Season switcher + dark mode toggle
│   ├── data/
│   │   ├── holidays.ts        # US holidays 2024–2026 as static JSON
│   │   └── monthImages.ts     # Unsplash URLs + season mapping per month
│   ├── pages/
│   │   └── CalendarPage.tsx   # Root layout: image | grid | notes
│   ├── store/
│   │   └── calendarStore.ts   # Zustand store — all state + derived selectors
│   ├── hooks/
│   │   └── use-month-image-prefetch.ts
|   ├── utils/
│   │   └── dateUtils.ts       # Pure date helpers (no external date library)
│   ├── types.ts               # Shared TypeScript interfaces
│   ├── index.css              # Tailwind v4 theme, seasonal CSS variables
│   ├── main.tsx
│   └── App.tsx
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## Running Locally

### Prerequisites

- Node.js 20+
- bun 1.3.10

### Setup

```bash
# Clone the repository
git clone https://github.com/rohits2404/Calendar
cd calendar

# Install all workspace dependencies
bun install

# Start the calendar app dev server
bun run dev
```

The app will be available at `http://localhost:<PORT>` (the port is printed in the terminal).

### Build for Production

```bash
bun run build
```

---

## Features

### Core
- **Wall calendar aesthetic** — hero image + grid + notes in a single unified card
- **Date range selection** — click start, click end; smooth animated highlight
- **Notes** — per day, per range, per month; color-coded; persisted to `localStorage`
- **Responsive** — desktop: three-panel side by side; mobile: stacked vertically

### Advanced
- **Monthly hero images** — 12 curated photographs, one per month, lazy-loaded
- **Seasonal themes** — Spring / Summer / Autumn / Winter color palettes
- **Light / Dark mode** — toggle; persisted between sessions
- **Holiday markers** — 50+ US holidays (2024–2026) with hover tooltips
- **Page-flip animation** — 3D perspective transition between months
- **Keyboard navigation** — `←` / `→` months, `T` today, `Esc` clear selection
- **Note badges** — colored dots on days that have notes
- **Range preview** — live hover highlights prospective range before click
- **Note editing** — click any note card to edit text and color inline
- **Conflict-safe** — selecting a new start always resets the range cleanly

---

## Keyboard Shortcuts

| Key | Action |
|---|---|
| `←` | Previous month |
| `→` | Next month |
| `T` | Jump to today |
| `Esc` | Clear date selection |
| `Enter` / `Space` | Select focused date |
| `⌘ + Enter` (in note) | Save note |
