import {
  SET_THEME,
  SET_RESOLUTION,
  SET_TIMESTAMP_FORMAT,
  SET_TIMEZONE,
  TOGGLE_LOCATION_TAGGING,
  ThemeMode,
  Resolution,
  TimestampFormat,
} from "../types/settingsActionTypes";

export const setTheme = (theme: ThemeMode) => ({
  type: SET_THEME,
  payload: theme,
});

export const setResolution = (resolution: Resolution) => ({
  type: SET_RESOLUTION,
  payload: resolution,
});

export const setTimestampFormat = (format: TimestampFormat) => ({
  type: SET_TIMESTAMP_FORMAT,
  payload: format,
});

export const setTimezone = (timezone: string) => ({
  type: SET_TIMEZONE,
  payload: timezone,
});

export const toggleLocationTagging = () => ({
  type: TOGGLE_LOCATION_TAGGING,
});