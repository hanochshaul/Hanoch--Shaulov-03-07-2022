import { FC } from "react";
import ForecastItem from "./ForecastItem";
import { Navigation } from "swiper";
import { SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Container } from "@mui/system";
import { SwiperContainer } from "../styles/StyledWeatherForecast";
import { Forecast } from "../interfaces/forecast.interface";

interface IForecastProps {
        forecast: Forecast;
}

const WeatherForecast: FC<IForecastProps> = (props) => {
        return (
                <Container>
                        <SwiperContainer
                                slidesPerView={2}
                                spaceBetween={30}
                                navigation={true}
                                modules={[Navigation]}
                                breakpoints={{
                                        700: {
                                                slidesPerView: 3,
                                        },
                                        900: {
                                                slidesPerView: 4,
                                        },
                                        1100: {
                                                slidesPerView: 5,
                                        }

                                }}
                        >
                                {props.forecast && props.forecast.days.map((day, i) =>
                                        <SwiperSlide key={i.toString()}>
                                                <ForecastItem weatherDay={day}/>
                                        </SwiperSlide>
                                )}
                        </SwiperContainer>
                </Container>
        );
}

export default WeatherForecast;