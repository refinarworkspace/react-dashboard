export type ThemePreference = 'light' | 'dark';

export const DISPLAY_NAME_STORAGE_KEY = 'dashboard.displayName';
export const THEME_STORAGE_KEY = 'dashboard.theme';

export const readDisplayName = () => {
  if (typeof window === 'undefined') {
    return '';
  }

  return window.localStorage.getItem(DISPLAY_NAME_STORAGE_KEY) ?? '';
};

export const readThemePreference = (): ThemePreference => {
  if (typeof window === 'undefined') {
    return 'light';
  }

  return window.localStorage.getItem(THEME_STORAGE_KEY) === 'dark' ? 'dark' : 'light';
};

export const saveDisplayName = (displayName: string) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(DISPLAY_NAME_STORAGE_KEY, displayName);
  }
};

export const saveThemePreference = (theme: ThemePreference) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }
};

export const applyThemePreference = (theme: ThemePreference) => {
  if (typeof document !== 'undefined') {
    document.documentElement.dataset.theme = theme;
  }
};
