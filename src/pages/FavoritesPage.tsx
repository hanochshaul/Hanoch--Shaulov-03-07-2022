import { Alert, Box, CircularProgress, Container, Snackbar, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WeatherImage from "../components/WeatherImage";
import { showTemperatureByUnit } from "../helpers/temperature";
import { clearError, updateFavoritesData } from "../redux/favorites";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { FavoritePaper, FavoritesPageBox } from "../styles/StyledFavoritePage";
import StyledWeatherPage from "../styles/StyledWeatherPage";

const FavoritesPage = () => {
        const { favorites, error, isLoading } = useAppSelector((state) => state.favorites);
        const { isCelsius } = useAppSelector((state) => state.settings);
        const dispatch = useAppDispatch();
        const navigate = useNavigate();

        useEffect(() => {
                dispatch(updateFavoritesData(favorites))
        }, []);

        return (
                <FavoritesPageBox>
                        {error && <Snackbar open autoHideDuration={1500} onClose={() => dispatch(clearError())} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                                <Alert severity="error" sx={{ width: '100%' }}>
                                        {error?.toString()}
                                </Alert>
                        </Snackbar>}
                        {isLoading && <StyledWeatherPage>
                                <CircularProgress />
                        </StyledWeatherPage>}
                        {!isLoading && favorites.map((favorite) =>
                                <FavoritePaper elevation={6} key={favorite.city.key}
                                        onClick={() => navigate(`/weather/${favorite.city.name}`)}>
                                        <Typography color='textPrimary' variant="h5">{favorite.city.name}</Typography>
                                        <WeatherImage weatherIcon={favorite.weather.weatherIcon} />
                                        <Box fontSize={30}>
                                                <Stack>
                                                        <Typography color='textPrimary' variant="h5">{showTemperatureByUnit(isCelsius, favorite.weather.temperature)}</Typography>
                                                        <Typography color='textPrimary' variant="h5">{favorite.weather.weatherText}</Typography>
                                                </Stack>
                                        </Box>
                                </FavoritePaper>

                        )}
                </FavoritesPageBox>
        );
}

export default FavoritesPage;