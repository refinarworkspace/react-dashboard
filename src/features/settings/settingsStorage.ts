export type ThemePreference = 'light' | 'dark';

export const DISPLAY_NAME_STORAGE_KEY = 'dashboard.displayName';
export const THEME_STORAGE_KEY = 'dashboard.theme';
export const EMAIL_NOTIFICATIONS_STORAGE_KEY = 'dashboard.emailNotifications';
export const WEEKLY_SUMMARY_STORAGE_KEY = 'dashboard.weeklySummary';

const readBooleanPreference = (key: string, defaultValue: boolean) => {
  if (typeof window === 'undefined') {
    return defaultValue;
  }

  const storedValue = window.localStorage.getItem(key);
  return storedValue === null ? defaultValue : storedValue === 'true';
};

const saveBooleanPreference = (key: string, enabled: boolean) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(key, String(enabled));
  }
};

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

export const readEmailNotificationsPreference = () =>
  readBooleanPreference(EMAIL_NOTIFICATIONS_STORAGE_KEY, true);

export const readWeeklySummaryPreference = () =>
  readBooleanPreference(WEEKLY_SUMMARY_STORAGE_KEY, false);

export const saveEmailNotificationsPreference = (enabled: boolean) =>
  saveBooleanPreference(EMAIL_NOTIFICATIONS_STORAGE_KEY, enabled);

export const saveWeeklySummaryPreference = (enabled: boolean) =>
  saveBooleanPreference(WEEKLY_SUMMARY_STORAGE_KEY, enabled);

export const applyThemePreference = (theme: ThemePreference) => {
  if (typeof document !== 'undefined') {
    document.documentElement.dataset.theme = theme;
  }
};
