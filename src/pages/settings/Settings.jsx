import React, { useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Widget from '../../components/Widget';
import { setDisplayName, setTheme } from '../../features/settings/settingsSlice';
import {
  applyThemePreference,
  saveDisplayName,
  saveThemePreference,
} from '../../features/settings/settingsStorage';
import s from './Settings.module.scss';

const Settings = () => {
  const dispatch = useAppDispatch();
  const savedDisplayName = useAppSelector((state) => state.settings.displayName);
  const accountName = useAppSelector((state) => state.auth.session?.user.name);
  const theme = useAppSelector((state) => state.settings.theme);
  const [displayName, setDisplayNameValue] = useState(
    savedDisplayName || accountName || 'Administrator'
  );
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const normalizedName = displayName.trim();
    if (!normalizedName) {
      return;
    }

    saveDisplayName(normalizedName);
    dispatch(setDisplayName(normalizedName));
    setDisplayNameValue(normalizedName);
    setIsSaved(true);
  };

  const handleThemeChange = (event) => {
    const nextTheme = event.target.checked ? 'dark' : 'light';

    saveThemePreference(nextTheme);
    applyThemePreference(nextTheme);
    dispatch(setTheme(nextTheme));
  };

  return (
    <div className={s.root}>
      <Breadcrumb>
        <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
        <BreadcrumbItem active>Settings</BreadcrumbItem>
      </Breadcrumb>
      <h1 className="mb-lg">Settings</h1>

      <Row>
        <Col lg={7} md={9}>
          <Widget title={<h5>Personal preferences</h5>}>
            <Form aria-label="Settings form" onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="settings-display-name">Display name</Label>
                <Input
                  aria-describedby="settings-display-name-help"
                  autoComplete="nickname"
                  id="settings-display-name"
                  name="displayName"
                  onChange={(event) => {
                    setDisplayNameValue(event.target.value);
                    setIsSaved(false);
                  }}
                  required
                  value={displayName}
                />
                <div className="form-text" id="settings-display-name-help">
                  This name appears in the dashboard header.
                </div>
              </FormGroup>

              <Button color="danger" type="submit">
                Save settings
              </Button>
              {isSaved ? (
                <p aria-live="polite" className="text-success mt-sm mb-0" role="status">
                  Settings saved.
                </p>
              ) : null}
            </Form>

            <hr className={s.divider} />

            <section aria-labelledby="settings-appearance-title" className={s.appearance}>
              <div>
                <h2 id="settings-appearance-title">Appearance</h2>
                <p>Choose the theme used across the dashboard.</p>
              </div>
              <div className="form-check form-switch">
                <Input
                  checked={theme === 'dark'}
                  className="form-check-input"
                  id="settings-dark-theme"
                  name="theme"
                  onChange={handleThemeChange}
                  role="switch"
                  type="checkbox"
                />
                <Label check for="settings-dark-theme">
                  Dark theme
                </Label>
              </div>
            </section>
          </Widget>
        </Col>
      </Row>
    </div>
  );
};

export default Settings;
