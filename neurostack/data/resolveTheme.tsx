import { THEMES, ThemeKey } from "./themes";

export function resolveTheme(themeKey?: string) {
  if (!themeKey) return null;
  return THEMES[themeKey as ThemeKey] ?? null;
}
