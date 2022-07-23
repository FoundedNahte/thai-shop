import React, {useState} from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import tw from 'twin.macro';
import { css } from 'styled-components/macro';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';

const Container = tw.div`
    flex justify-between
`

const SearchBarContainer = tw.div`
    p-2
`

const SearchBar = ({searchQuery}) => {
    
    const [open, setState] = useState(false);

    const toggleSearchBar = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        
        setState(open);
    }

    return (
        <Container>
            <Collapse in={open} timeout="auto" orientation="vertical" anchor="left">
                <SearchBarContainer>
                    <TextField>
                    </TextField>
                </SearchBarContainer>
            </Collapse>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="open searchbar"
                onClick={toggleSearchBar(!open)}
                sx={{
                    mr: 2,
                }}
            >
                <SearchIcon />
            </IconButton>
        </Container>
    )
}

export default SearchBar;
