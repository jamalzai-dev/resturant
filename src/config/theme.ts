/** Centralized warm dark palette; aliases preserve existing configuration consumers. */
const palette = {
  'bg-main': '#1b1b1b',
  'bg-elevated': '#242424',
  'bg-card': '#292929',
  'bg-hover': '#333333',
  'accent-primary': '#ff7a1a',
  'accent-hover': '#ff923f',
  'accent-soft': '#38291f',
  'text-primary': '#f7f5f2',
  'text-secondary': '#bab4ac',
  'text-muted': '#a7a19a',
  'border-subtle': '#48433f',
  'on-accent': '#20170f',
  success: '#81cf97',
  danger: '#f17d76',
};
export const THEME = {
  ...palette,
  paper: palette['bg-main'],
  cream: palette['bg-elevated'],
  soft: palette['bg-card'],
  primary: palette['accent-primary'],
  primaryHover: palette['accent-hover'],
  ink: palette['text-primary'],
  muted: palette['text-secondary'],
  accent: palette['accent-primary'],
  line: palette['border-subtle'],
  dark: palette['bg-main'],
  successBg: '#233529',
};
export function applyTheme() {
  Object.entries(THEME).forEach(([key, value]) =>
    document.documentElement.style.setProperty('--' + key, value),
  );
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME.paper);
}
