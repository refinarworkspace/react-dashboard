import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import {
  readDisplayName,
  readEmailNotificationsPreference,
  readThemePreference,
  readWeeklySummaryPreference,
  type ThemePreference,
} from './settingsStorage';

type SettingsState = {
  displayName: string;
  theme: ThemePreference;
  emailNotifications: boolean;
  weeklySummary: boolean;
};

const loadSettings = (): SettingsState => ({
  displayName: readDisplayName(),
  theme: readThemePreference(),
  emailNotifications: readEmailNotificationsPreference(),
  weeklySummary: readWeeklySummaryPreference(),
});

const settingsSlice = createSlice({
  name: 'settings',
  initialState: loadSettings,
  reducers: {
    setDisplayName(state, action: PayloadAction<string>) {
      state.displayName = action.payload;
    },
    setTheme(state, action: PayloadAction<ThemePreference>) {
      state.theme = action.payload;
    },
    setEmailNotifications(state, action: PayloadAction<boolean>) {
      state.emailNotifications = action.payload;
    },
    setWeeklySummary(state, action: PayloadAction<boolean>) {
      state.weeklySummary = action.payload;
    },
  },
});

export const {
  setDisplayName,
  setTheme,
  setEmailNotifications,
  setWeeklySummary,
} = settingsSlice.actions;

export default settingsSlice.reducer;
