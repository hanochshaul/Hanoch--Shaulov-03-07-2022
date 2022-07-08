import { Box, Paper, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { showTemperatureByUnit } from "../helpers/temperature";
import { City } from "../interfaces/city.interface";
import { Forecast } from "../interfaces/forecast.interface";
import { Weather } from "../interfaces/weather.interface";
import { addToFavorites, removeFromFavorites } from "../redux/favorites";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { StyledWeatherInfo } from "../styles/StyledWeatherInfo";
import FavoriteButton from "./FavoriteButton";
import WeatherDate from "./WeatherDate";
import WeatherForecast from "./WeatherForecast";
import WeatherImage from "./WeatherImage";

interface WeatherInfoProps {
        cityData: City;
        weatherData: Weather;
        forecastData: Forecast;
}

const WeatherInfo: FC<WeatherInfoProps> = (props) => {
        const { isCelsius } = useAppSelector((state) => state.settings);
        const { favorites } = useAppSelector((state) => state.favorites);
        const dispatch = useAppDispatch();

        const onFavoriteChange = (checked: boolean) => {
                if (checked) {
                        dispatch(addToFavorites({ city: props.cityData, weather: props.weatherData }));
                }
                else {
                        dispatch(removeFromFavorites(props.cityData.key));
                }

        };

        return (
                <Paper elevation={6} sx={{ pb: 2, m: 0 }}>
                        <Stack direction={'row'} sx={{ justifyContent: 'space-between' }}>
                                <StyledWeatherInfo>
                                        <Typography
                                                color='textPrimary'
                                                variant="h2"
                                                noWrap
                                                sx={{
                                                        fontWeight: 700,
                                                }}
                                        >
                                                {props.cityData.name}, {props.cityData.country}
                                        </Typography>

                                        <WeatherDate date={props.weatherData.date} />
                                        <Stack direction='row'>
                                                <WeatherImage weatherIcon={props.weatherData.weatherIcon} />
                                                <Box fontSize={100} color='textPrimary'>
                                                        {showTemperatureByUnit(isCelsius, props.weatherData.temperature)}
                                                        <Box fontSize={30} color='textPrimary'>
                                                                {props.weatherData.weatherText}
                                                        </Box>
                                                </Box>
                                        </Stack>

                                </StyledWeatherInfo>

                                <Box sx={{ margin: 4 }}>
                                        <FavoriteButton
                                                onChange={onFavoriteChange}
                                                isFavorite={favorites.findIndex(item => item.city.key === props.cityData.key) !== -1} />
                                </Box>
                        </Stack>

                        <WeatherForecast forecast={props.forecastData} />
                </Paper>

        );
}

export default WeatherInfo;