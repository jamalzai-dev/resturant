/** All brand colors. Components use CSS variables populated from this file. */
export const THEME = {
  paper: '#f7f1e6',
  cream: '#e8dcc7',
  primary: '#e9a90c',
  primaryHover: '#cc8f06',
  ink: '#242321',
  accent: '#76530a',
  muted: '#625b52',
  line: '#dcd0bd',
  soft: '#efe4d2',
  dark: '#242321',
  success: '#3e6744',
  successBg: '#e8efdf',
};
export function applyTheme() {
  const variables = { ...THEME, green: THEME.ink, gold: THEME.accent };
  Object.entries(variables).forEach(([key, value]) =>
    document.documentElement.style.setProperty(`--${key}`, value),
  );
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME.primary);
}
