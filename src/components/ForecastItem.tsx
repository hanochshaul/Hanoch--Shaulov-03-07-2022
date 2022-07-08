import { Box, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { showTemperatureByUnit } from "../helpers/temperature";
import { Weather } from "../interfaces/weather.interface";
import { useAppSelector } from "../redux/hooks";
import StyledForecastItemContainer from "../styles/StyledForecastItem";
import WeatherImage from "./WeatherImage";

interface ForecastItemProps {
    weatherDay: Weather;
}

const ForecastItem : FC<ForecastItemProps> = (props) => {
    const { isCelsius } = useAppSelector((state) => state.settings);

    return (
        <StyledForecastItemContainer elevation={12}>
            <Typography color='textPrimary' variant="h4">{new Date(props.weatherDay.date).toLocaleString('default', { weekday: 'short' })}</Typography>
            <WeatherImage weatherIcon={props.weatherDay.weatherIcon}/>
            <Box fontSize={30}>
                <Stack>
                    <Typography color='textPrimary' variant="h5">{showTemperatureByUnit(isCelsius, props.weatherDay.temperature)}</Typography>
                    <Typography color='textPrimary' variant="h5">{props.weatherDay.weatherText}</Typography>
                </Stack>
            </Box>
        </StyledForecastItemContainer>
    );
}

export default ForecastItem;