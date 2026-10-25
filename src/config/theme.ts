/** All brand colors. Components use CSS variables populated from this file. */
export const THEME = {
  paper: '#fcf8ef',
  cream: '#f2ecdf',
  primary: '#823b2d',
  primaryHover: '#642b21',
  ink: '#322c24',
  accent: '#86591c',
  muted: '#6c665b',
  line: '#dfd7c8',
  soft: '#eee3d2',
  dark: '#352c24',
  success: '#3e6744',
  successBg: '#e8efdf',
};
export function applyTheme() {
  const variables = { ...THEME, green: THEME.primary, gold: THEME.accent };
  Object.entries(variables).forEach(([key, value]) =>
    document.documentElement.style.setProperty(`--${key}`, value),
  );
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME.primary);
}
