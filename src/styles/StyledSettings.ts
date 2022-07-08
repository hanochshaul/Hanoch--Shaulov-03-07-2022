import { Switch, styled, Checkbox } from '@mui/material';

const UnitToggle = styled(Switch)(({ theme }) => ({
  margin: 10,
  width: 62,
  height: 30,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: "3px 1px",
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(28px)',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    color: '#fff',
    margin: "0 4px",
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 24,
    height: 24,
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20,
    "&:after, &:before": {
      color: "white",
      fontSize: "16px",
      position: "absolute",
      top: "3px"
    },
    "&:after": {
      content: "'°F'",
      left: "10px"
    },
    "&:before": {
      content: "'°C'",
      right: "10px"
    },
  },
}));

const ModeToggle = styled(Checkbox)(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
  '&.Mui-checked': {
    color: 'orange',
  },
  '& svg': {
    transform: 'scale(1.2)'
  },
  '&.Mui-disabled': {
    color: 'transparent',
  }
}));

export { UnitToggle, ModeToggle };