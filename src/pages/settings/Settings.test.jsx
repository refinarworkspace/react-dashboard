import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { beforeEach, describe, expect, it } from 'vitest';

import { createAppStore } from '../../app/store';
import {
  DISPLAY_NAME_STORAGE_KEY,
  EMAIL_NOTIFICATIONS_STORAGE_KEY,
  THEME_STORAGE_KEY,
  WEEKLY_SUMMARY_STORAGE_KEY,
} from '../../features/settings/settingsStorage';
import Settings from './Settings';

describe('settings form', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('saves the display name and applies the selected theme', () => {
    const store = createAppStore();

    render(
      <Provider store={store}>
        <Settings />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Display name'), {
      target: { value: 'Alex Morgan' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save settings' }));

    expect(localStorage.getItem(DISPLAY_NAME_STORAGE_KEY)).toBe('Alex Morgan');
    expect(store.getState().settings.displayName).toBe('Alex Morgan');
    expect(screen.getByRole('status')).toHaveTextContent('Settings saved.');

    fireEvent.click(screen.getByRole('switch', { name: 'Dark theme' }));

    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    expect(store.getState().settings.theme).toBe('dark');

    fireEvent.click(screen.getByRole('switch', { name: 'Email notifications' }));
    fireEvent.click(screen.getByRole('switch', { name: 'Weekly summary' }));

    expect(localStorage.getItem(EMAIL_NOTIFICATIONS_STORAGE_KEY)).toBe('false');
    expect(localStorage.getItem(WEEKLY_SUMMARY_STORAGE_KEY)).toBe('true');
    expect(store.getState().settings.emailNotifications).toBe(false);
    expect(store.getState().settings.weeklySummary).toBe(true);
  });
});
