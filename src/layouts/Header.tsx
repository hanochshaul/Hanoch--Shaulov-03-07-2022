import Settings from "../components/Settings";
import NavigationBar from "../components/NavigationBar";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { styleLogo, styleLogoSmall } from "../styles/StyledHeader";

const Header = () => {
    return (
        <AppBar position="static">
            <Container maxWidth={false}>
                <Toolbar disableGutters>
                    <WbSunnyIcon sx={styleLogo} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        WEATHER TASK
                    </Typography>

                    <NavigationBar />

                    <WbSunnyIcon sx={styleLogoSmall} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        WEATHER TASK
                    </Typography>
                    
                    <Settings />

                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;