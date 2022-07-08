import { Checkbox, styled } from "@mui/material";

const StyledFavoriteButton = styled(Checkbox)(({ theme }) => ({
    height: 80,
    width: 80,
    
    color: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    '&.Mui-checked': {
        color: 'red',
    },
    '& svg': {
        transform: 'scale(2)'
    },
    '&.Mui-disabled': {
        color: 'transparent',
    }
}));

export default StyledFavoriteButton;


