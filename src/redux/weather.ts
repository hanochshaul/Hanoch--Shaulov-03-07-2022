import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { City } from '../interfaces/city.interface'
import { cityByLocationApiUrl, citySearchApiUrl, currentWeatherApiUrl, forecastApiUrl } from '../api/api'
import { Location } from "../interfaces/location.interface";
import { Weather } from '../interfaces/weather.interface';
import { Forecast } from '../interfaces/forecast.interface';

interface WeatherState {
  isLoading: boolean;
  error: string | null;
  city: City | undefined;
  weather: Weather | undefined;
  forecast: Forecast | undefined;
}

const initialState: WeatherState = {
  isLoading: false,
  error: null,
  city: undefined,
  weather: undefined,
  forecast: undefined
}

const fetchData = async (api: string) => {
  const response = await fetch(api);

  if (response.status !== 200) {
    throw new Error('Failed to fetch from server')
  }

  return await response.json();
}

export const getCity = createAsyncThunk(
  'weather/getCity',
  async (text: string, thunkApi) => {
    let data;

    try {
      data = await fetchData(citySearchApiUrl(text));
    }
    catch {
      return thunkApi.rejectWithValue(
        'Failed to fetch data from server'
      );
    }

    const { Country, Key, LocalizedName } = data[0];
    const city: City = { name: LocalizedName, key: Key, country: Country.ID }
    return city;
  });

export const getCityByLocation = createAsyncThunk(
  'weather/getCityByLocation',
  async (location: Location, thunkApi) => {
    let data;

    try {
      data = await fetchData(cityByLocationApiUrl(location.latitude, location.longitude));
    }
    catch {
      return thunkApi.rejectWithValue(
        'Failed to fetch data from server'
      );
    }

    const { Country, Key, LocalizedName } = data;
    const city: City = { name: LocalizedName, key: Key, country: Country.ID }
    return city;
  });

export const getCurrentWeather = createAsyncThunk(
  'weather/currentWeather',
  async (text: string, thunkApi) => {
    let data;

    try {
      data = await fetchData(currentWeatherApiUrl(text));
    }
    catch {
      return thunkApi.rejectWithValue(
        'Failed to fetch data from server'
      );
    }

    const { Temperature, LocalObservationDateTime, WeatherText, WeatherIcon } = data[0];

    const weather: Weather = {
      date: LocalObservationDateTime,
      temperature: Math.round(Temperature.Metric.Value),
      weatherIcon: WeatherIcon,
      weatherText: WeatherText
    }

    return weather;
  });

export const getForecast = createAsyncThunk(
  'weather/getForecast',
  async (text: string, thunkApi) => {
    let data;

    try {
      data = await fetchData(forecastApiUrl(text));
    }
    catch {
      return thunkApi.rejectWithValue(
        'Failed to fetch data from server'
      );
    }

    const { DailyForecasts } = data;

    const weatherForcast = DailyForecasts.map((item: any) =>
    ({
      date: item.Date,
      isDayTime: false,
      temperature: Math.round(item.Temperature.Minimum.Value),
      weatherIcon: item.Day.Icon,
      weatherText: item.Day.IconPhrase
    })
    );

    const forecast: Forecast = {
      days: weatherForcast
    }

    return forecast;
  });

const getPending = (state: WeatherState) => {
  state.isLoading = true;
  state.error = null;
};

const getCityRejected = (state: WeatherState, action :PayloadAction<unknown>) => {
  if (action.payload) state.error = action.payload as string;
  state.isLoading = false;
  state.city = undefined;
};

const getCityFulfiled = (state: WeatherState, action :PayloadAction<City>) => {
  state.city = action.payload;
  state.isLoading = false;
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCity.pending, getPending);
    builder.addCase(getCity.fulfilled, getCityFulfiled);
    builder.addCase(getCity.rejected, getCityRejected);

    builder.addCase(getCityByLocation.pending, getPending);
    builder.addCase(getCityByLocation.fulfilled, getCityFulfiled);
    builder.addCase(getCityByLocation.rejected, getCityRejected);

    builder.addCase(getCurrentWeather.pending, getPending);

    builder.addCase(getCurrentWeather.fulfilled,
      (state, { payload }) => {
        state.weather = payload;
        state.isLoading = false;
      });

    builder.addCase(getCurrentWeather.rejected,
      (state, { payload }) => {
        if (payload) state.error = payload as string;
        state.isLoading = false;
      });

    builder.addCase(getForecast.pending, getPending);

    builder.addCase(getForecast.fulfilled,
      (state, { payload }) => {
        state.forecast = payload;
        state.isLoading = false;
      });

    builder.addCase(getForecast.rejected,
      (state, { payload }) => {
        if (payload) state.error = payload as string;
        state.isLoading = false;
      });
  },
})

export const { clearError } = weatherSlice.actions
export default weatherSlice.reducer
