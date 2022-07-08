import { configureStore } from '@reduxjs/toolkit'
import settingsReducer from './settings';
import favoritesReducer from './favorites';
import weatherReducer from './weather'

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    settings: settingsReducer,
    favorites: favoritesReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;