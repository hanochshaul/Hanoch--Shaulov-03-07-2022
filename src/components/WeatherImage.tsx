import { FC } from "react";

interface WaetherImageProps {
    weatherIcon: number;
}

const WeatherImage: FC<WaetherImageProps> = (props) => {
    return (
        <div>
            <img src={process.env.PUBLIC_URL + `/images/${props.weatherIcon}.png`} height='150px' width="150px" />
        </div>
    );
}

export default WeatherImage;