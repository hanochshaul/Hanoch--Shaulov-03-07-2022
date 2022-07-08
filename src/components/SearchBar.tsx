import { FC, useState } from 'react';
import { Container, Divider, IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';

interface ISearchBarProps {
    searchCallback?: (searchTerm: string) => void;
    gpsLocationCallback?: () => void
}

const SearchBar: FC<ISearchBarProps> = (props) => {
    const [searchTerm, setSearchTerm] = useState('');

    const onChangeInput = (e: any) => {
         const { value } = e.target;
         setSearchTerm(value);
    }
    const doSearch = () => {
        if(props.searchCallback) {
            props.searchCallback(searchTerm);
        }

         setSearchTerm("");
    }
    return (
        <Container sx={{ p: '2px 4px', display: 'flex', width: 400, mb: 5, borderStyle: 'solid' }}>
            <InputBase
                sx={{ ml: 1, flex: 1, fontSize:24, }}
                placeholder="Search City"
                inputProps={{ 'aria-label': 'Search City' }}
                value={searchTerm}
                onChange={onChangeInput}
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" onClick={doSearch}>
                <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton color="primary" sx={{ p: '10px' }} aria-label="geo location" onClick={props.gpsLocationCallback}>
                <GpsFixedIcon />
            </IconButton>
        </Container>
    );
}

export default SearchBar;