import { Box, Paper, styled } from "@mui/material";

const FavoritesPageBox = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > :not(style)': {
        margin: 14,
        width: 200,
        minWidth: 200,
        height: 280,
    }}));

const FavoritePaper = styled(Paper)(() => ({
    textAlign: 'center',
    padding: 10
}));

export {FavoritesPageBox, FavoritePaper};