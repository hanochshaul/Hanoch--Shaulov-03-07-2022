import { createSlice } from '@reduxjs/toolkit'

interface SettingsState {
  isCelsius: boolean,
  isNightMode: boolean
}

const initialState: SettingsState = {
  isCelsius: localStorage.getItem('isCelsius') === 'true',
  isNightMode: localStorage.getItem('isNightMode') === 'true'
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleUnit: (state) => {
      state.isCelsius = !state.isCelsius;
      localStorage.setItem('isCelsius', String(state.isCelsius));
    },
    toggleMode: (state) => {
      state.isNightMode = !state.isNightMode;
      localStorage.setItem('isNightMode', String(state.isNightMode));
    },
  },
})

export const { toggleUnit, toggleMode } = settingsSlice.actions

export default settingsSlice.reducer