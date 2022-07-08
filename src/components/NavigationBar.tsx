import { Box, Button, IconButton, List, ListItem, ListItemText, SwipeableDrawer } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';

const NavigationBar = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const pages = [{ name: 'Weather', navigation: '/' }, { name: 'Favorites', navigation: 'favorites' }];

    return (
        <>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={() => setOpen(prev => !prev)}
                >
                    <MenuIcon />
                </IconButton>
                <SwipeableDrawer
                    anchor={'left'}
                    open={open}
                    onOpen={() => setOpen(true)}
                    onClose={() => setOpen(false)}
                >
                    <List>
                        {pages.map((page) => (
                            <ListItem component={Link} to={page.navigation} button key={page.name}>
                                <ListItemText primary={page.name}  />
                            </ListItem>
                        ))}
                    </List>
                </SwipeableDrawer>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                    <Button
                        key={page.name}
                        onClick={() => navigate(page.navigation)}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        {page.name}
                    </Button>
                ))}
            </Box>

        </>
    );
}

export default NavigationBar;


