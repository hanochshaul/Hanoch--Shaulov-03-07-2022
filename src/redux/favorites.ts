import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { currentWeatherApiUrl } from '../api/api';
import { City } from '../interfaces/city.interface';
import { Weather } from '../interfaces/weather.interface';

const localFavorites = localStorage.getItem('favorites');

interface FavoriteCityWeather {
  city: City;
  weather: Weather;
}

interface FavoritesState {
  favorites: FavoriteCityWeather[];
  isLoading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  favorites: localFavorites ? JSON.parse(localFavorites) : [],
  isLoading: false,
  error: null,
}

const getData = async (url: string) => {
  let response;
  try {
    response = await axios.get(url);
  }
  catch {
    throw new Error('Failed to fetch data from server');
  }

  return response.data;
}

export const updateFavoritesData = createAsyncThunk(
  'favorites/updateData',
  async (favorites: FavoriteCityWeather[], thunkApi) => {
    let promises: any[] = [];
    const allFavorites = [...favorites];
    favorites.forEach((favoriteData) => { promises.push(getData(currentWeatherApiUrl(favoriteData.city.key))) });

    try {
      await Promise.all(promises)
      .then((responses) => {
        responses.forEach((data, index) => {
          const { Temperature, LocalObservationDateTime, WeatherText, WeatherIcon } = data[0];

          const weather: Weather = {
            date: LocalObservationDateTime,
            temperature: Math.round(Temperature.Metric.Value),
            weatherIcon: WeatherIcon,
            weatherText: WeatherText
          }

          allFavorites[index] = {city:allFavorites[index].city, weather: weather}
        })
      })
    }
    catch(error) {
      return thunkApi.rejectWithValue(
        error
      );
    }
    
    return allFavorites;
  });

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<FavoriteCityWeather>) => {
      state.favorites.push(action.payload);

      const json = JSON.stringify(state.favorites);
      localStorage.setItem('favorites', json);
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {

      state.favorites = state.favorites.filter((value) =>
        value.city.key === action.payload
      );

      const json = JSON.stringify(state.favorites);
      localStorage.setItem('favorites', json);
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(updateFavoritesData.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(updateFavoritesData.fulfilled,
      (state, { payload }) => {

        state.favorites = payload;
        state.isLoading = false;
        const json = JSON.stringify(state.favorites);
        localStorage.setItem('favorites', json);
      });

    builder.addCase(updateFavoritesData.rejected,
      (state, { payload }) => {
        if (payload) state.error = payload as string;
        state.isLoading = false;
      });
  },
})

export const { addToFavorites, removeFromFavorites, clearError } = favoritesSlice.actions

export default favoritesSlice.reducer