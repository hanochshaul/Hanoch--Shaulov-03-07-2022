import { Box } from "@mui/system";
import SearchBar from "../components/SearchBar";
import WeatherInfo from "../components/WeatherInfo";
import { useEffect, useState } from "react";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import { useParams } from "react-router-dom";
import { Location } from "../interfaces/location.interface";
import StyledWeatherPage from "../styles/StyledWeatherPage";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { clearError, getCity, getCityByLocation, getCurrentWeather, getForecast } from "../redux/weather";

const WeatherPage = () => {
     const { city, weather, forecast, error, isLoading } = useAppSelector((state) => state.weather);
     const dispatch = useAppDispatch();
     const params = useParams();
     const [location, setLocation] = useState<Location>();

     useEffect(() => {
          !city && onSearch('Tel Aviv')
     }, []);

     useEffect(() => {
          if (params) {
               onSearch(params['city']);
          }
     }, [params]);

     useEffect(() => {
          location && dispatch(getCityByLocation(location));
     }, [location]);

     useEffect(() => {
          city && getCityWeather(city.key);
     }, [city]);

     const getCityWeather = async (cityKey: string) => {
          if (cityKey) {
               dispatch(getCurrentWeather(cityKey));
               dispatch(getForecast(cityKey));
          }
     }

     const onSearch = async (searchTerm?: string) => {
          if (searchTerm) {
               dispatch(getCity(searchTerm));
          }
     };

     const onGpsLocation = async () => {
          if (!navigator.geolocation) {
               console.log('Geolocation is not supported by your browser');
          } else {
               navigator.geolocation.getCurrentPosition((position) => {
                    setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude })
               }, () => {
               });
          }
     }

     return (
          <Box>
               {error && <Snackbar open autoHideDuration={1500} onClose={()=> dispatch(clearError())} anchorOrigin={{ vertical:'bottom', horizontal: 'center' }}>
                    <Alert severity="error" sx={{ width: '100%' }}>
                         {error?.toString()}
                    </Alert>
               </Snackbar>}
               <SearchBar searchCallback={onSearch} gpsLocationCallback={onGpsLocation} />
               {isLoading && <StyledWeatherPage>
                    <CircularProgress />
               </StyledWeatherPage>}
               {!isLoading && city && weather && forecast && <WeatherInfo cityData={city} weatherData={weather} forecastData={forecast} />}
          </Box>
     );
}

export default WeatherPage;