const API_KEY = localStorage.getItem('weather_api_key') ?? 'Lo5oaJdGeMe9TFAcC40buQJAEBdIEibu';
const API_HOST = 'https://dataservice.accuweather.com';
const API_VERSION = 'v1';

export const cityByLocationApiUrl = (latitude: number, longitude: number) => `${API_HOST}/locations/${API_VERSION}/cities/geoposition/search?apikey=${API_KEY}&q=${latitude},${longitude}`;
export const currentWeatherApiUrl = (key: string) => `${API_HOST}/currentconditions/${API_VERSION}/${key}?apikey=${API_KEY}`;
export const autoCompleteApiUrl = (text: string) => `${API_HOST}/locations/${API_VERSION}/cities/autocomplete?apikey=${API_KEY}&q=${text}`;
export const citySearchApiUrl = (text: string) => `${API_HOST}/locations/${API_VERSION}/cities/search?apikey=${API_KEY}&q=${text}`;
export const forecastApiUrl = (key: string) => `${API_HOST}/forecasts/${API_VERSION}/daily/5day/${key}?apikey=${API_KEY}&metric=true`;