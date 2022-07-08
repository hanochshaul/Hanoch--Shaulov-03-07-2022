import { Typography } from "@mui/material";
import { FC } from "react";

interface WeatherDateProps {
    date: string;
}
const WeatherDate : FC<WeatherDateProps> = (props) => {
    return (
        <Typography variant="h6" noWrap color='textPrimary'>
            {new Date(props.date).toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric' })}
        </Typography>
    );
}

export default WeatherDate;