import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import postsReducer from '../features/posts/postsSlice';
import settingsReducer from '../features/settings/settingsSlice';
import uiReducer from '../features/ui/uiSlice';

export const createAppStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      posts: postsReducer,
      settings: settingsReducer,
      ui: uiReducer,
    },
  });

export type AppStore = ReturnType<typeof createAppStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const store = createAppStore();
