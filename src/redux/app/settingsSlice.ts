import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type SettingsState = {
  locale: 'en' | 'vi';
  animationsEnabled: boolean;
};

const initialState: SettingsState = {
  locale: 'en',
  animationsEnabled: true,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLocale: (state, action: PayloadAction<SettingsState['locale']>) => {
      state.locale = action.payload;
    },
    setAnimationsEnabled: (state, action: PayloadAction<boolean>) => {
      state.animationsEnabled = action.payload;
    },
  },
});

export const { setLocale, setAnimationsEnabled } = settingsSlice.actions;
export default settingsSlice.reducer;
