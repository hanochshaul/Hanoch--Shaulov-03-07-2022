import { Container } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import FavoritesPage from "../pages/FavoritesPage";
import WeatherPage from "../pages/WeatherPage";
import StyledMainContent from "../styles/StyledMainContent";

const MainContent = () => {
    return (
        <StyledMainContent>
            <Routes>
                <Route path='/' element={<Navigate replace to='/weather' />} />
                <Route path='/weather' element={<WeatherPage />} />
                <Route path='/weather/:city' element={<WeatherPage />} />
                <Route path='/favorites' element={<FavoritesPage />} />
                <Route path='/*' element={<h1>Not Found</h1>} />
            </Routes>
        </StyledMainContent>
    );
}

export default MainContent;