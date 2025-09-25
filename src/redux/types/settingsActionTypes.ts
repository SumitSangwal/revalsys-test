export const SET_THEME = "SET_THEME";
export const SET_RESOLUTION = "SET_RESOLUTION";
export const SET_TIMESTAMP_FORMAT = "SET_TIMESTAMP_FORMAT";
export const SET_TIMEZONE = "SET_TIMEZONE";
export const TOGGLE_LOCATION_TAGGING = "TOGGLE_LOCATION_TAGGING";

export type ThemeMode = "system" | "light" | "dark";
export type Resolution = "auto" | "720p" | "1080p" | "4K";
export type TimestampFormat = 'DD/MM/YYYY HH:mm' | 'MM-DD-YYYY hh:mm A';

export interface SettingsState {
  theme: ThemeMode;
  resolution: Resolution;
  timestampFormat: TimestampFormat;
  timezone: string;
  locationTagging: boolean;
}