import {
  SET_THEME,
  SET_RESOLUTION,
  SET_TIMESTAMP_FORMAT,
  SET_TIMEZONE,
  TOGGLE_LOCATION_TAGGING,
  SettingsState,
} from '../types/settingsActionTypes';

const initialState: SettingsState = {
  theme: 'system',
  resolution: '1080p',
  timestampFormat: 'DD/MM/YYYY HH:mm',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  locationTagging: false,
};

const settingsReducer = (state = initialState, action: any): SettingsState => {
  switch (action.type) {
    case SET_THEME:
      return { ...state, theme: action.payload };
    case SET_RESOLUTION:
      return { ...state, resolution: action.payload };
    case SET_TIMESTAMP_FORMAT:
      return { ...state, timestampFormat: action.payload };
    case SET_TIMEZONE:
      return { ...state, timezone: action.payload };
    case TOGGLE_LOCATION_TAGGING:
      return { ...state, locationTagging: !state.locationTagging };
    default:
      return state;
  }
};

export default settingsReducer;
