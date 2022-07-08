import { createTheme, ThemeProvider } from '@mui/material';
import Header from './layouts/Header';
import MainContent from './layouts/MainContent';
import { useAppSelector } from './redux/hooks';
import StyledDashboard from './styles/StyledWeatherDashboard';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function WeatherDashboard() {
  const { isNightMode } = useAppSelector((state) => state.settings);

  return (
    <ThemeProvider theme={isNightMode ? darkTheme : lightTheme} >
      <StyledDashboard>
        <Header />
        <MainContent />
      </StyledDashboard>
   </ThemeProvider>
  );
}

export default WeatherDashboard;
