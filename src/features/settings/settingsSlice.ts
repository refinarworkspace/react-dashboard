import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import {
  readDisplayName,
  readThemePreference,
  type ThemePreference,
} from './settingsStorage';

type SettingsState = {
  displayName: string;
  theme: ThemePreference;
};

const loadSettings = (): SettingsState => ({
  displayName: readDisplayName(),
  theme: readThemePreference(),
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
  },
});

export const { setDisplayName, setTheme } = settingsSlice.actions;

export default settingsSlice.reducer;
