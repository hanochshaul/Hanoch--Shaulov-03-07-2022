import { Box, IconButton, List, ListItem, ListItemText, SwipeableDrawer } from "@mui/material";
import { ModeToggle, UnitToggle } from "../styles/StyledSettings";
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from "react";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { toggleMode, toggleUnit } from "../redux/settings";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const Settings = () => {
    const [open, setOpen] = useState(false);
    const { isCelsius, isNightMode } = useAppSelector((state) => state.settings);
    const dispatch = useAppDispatch();

    const handleSettingsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setOpen(prev => !prev);
    };

    const renderUnitToggle = (onChangeCallback?: () => void): JSX.Element => {
        return <UnitToggle checked={isCelsius} onChange={onChangeCallback} />;
    };

    const renderModeButton = (onChangeCallback?: () => void): JSX.Element => {
        return (
            <ModeToggle
                checked={!isNightMode}
                icon={<DarkModeOutlinedIcon />}
                checkedIcon={<LightModeOutlinedIcon />}
                onChange={onChangeCallback}
            />
        );
    };

    const renderSettingsMenu = (
        <SwipeableDrawer
            anchor={'right'}
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
        >
            <List>
                <ListItem button key='mode' onClick={() => dispatch(toggleMode())}>
                    {renderModeButton()}
                    <ListItemText primary='Mode' />
                </ListItem>
                <ListItem button key='unit' onClick={()=> dispatch(toggleUnit())}>
                    {renderUnitToggle()}
                    <ListItemText primary='Units' />
                </ListItem>
            </List>
        </SwipeableDrawer>
    );

    return (
        <>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }} >
                {renderModeButton(() => dispatch(toggleMode()))}
                {renderUnitToggle(()=> dispatch(toggleUnit()))}
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                    size="large"
                    aria-label="show settings"
                    aria-controls='settings-menu'
                    aria-haspopup="true"
                    onClick={handleSettingsMenuOpen}
                    color='inherit'
                >
                    <SettingsIcon />
                </IconButton>
            </Box>
            {renderSettingsMenu}
        </>
    );
}

export default Settings;