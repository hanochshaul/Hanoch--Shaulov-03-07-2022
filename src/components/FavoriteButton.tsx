import { FC, useState } from "react";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import StyledFavoriteButton from "../styles/StyledFavoriteButton";

interface IFavoriteButtonProps {
    isFavorite?: boolean;
    onChange?: (checked: boolean) => void;
}

const FavoriteButton: FC<IFavoriteButtonProps> = (props) => {
    const [isFavorite, setFavorite] = useState(props.isFavorite);

    const onToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFavorite(e.target.checked);

        if (props.onChange) {
            props.onChange(e.target.checked);
        }
    }

    return (
        <StyledFavoriteButton
            checked={isFavorite}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            onChange={onToggle}
        />
    );
}

export default FavoriteButton;