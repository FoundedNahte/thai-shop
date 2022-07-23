import React, {useState} from 'react';
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import tw from 'twin.macro';
import { css } from 'styled-components/macro';
import styled from 'styled-components';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const Container = tw.div`
`

const textSpan = tw.span`

`

const SideMenu = ({input}) => {
    
    const [open, setState] = useState(false);
    
    const [openCategory, setOpenCategory] = useState({});

    const boolArray = new Map();

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState(open);
    };
    
    function handleCategoryClick(id) {
        setOpenCategory((prevState => ({...prevState, [id]: !prevState[id]})))
    }
    
    return (
        <Container>
            <IconButton 
                edge="start" 
                color="inherit" 
                aria-label="open drawer" 
                onClick={toggleDrawer(true)}
                sx={{
                    mr: 2,
                }}
            >
                <MenuIcon />
            </IconButton>
            <Drawer 
                anchor="right" 
                open={open} 
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                <Box
                    sx={{
                        p: 2,
                        height: 1,
                    }}
                >
                    <IconButton sx={{ mb: 2 }}>
                        <CloseIcon onClick={toggleDrawer(false)} />
                    </IconButton>
                    
                    <Divider sx={{ mb: 2 }} />
                    
                    <List
                        araia-labelledby="list"
                        subheader={
                            <ListSubheader component="div" id="nested-list">
                                Shop
                            </ListSubheader>
                        }
                    >
                        {input.categories.map((entry, index) => {
                            if (entry.items.length > 0) {
                                return(
                                    <div>
                                        <ListItemButton onClick={() => handleCategoryClick(entry.name)}>
                                            <ListItemText primary={entry.name} />
                                            {openCategory[entry.name] ? <ExpandLess /> : <ExpandMore />}
                                        </ListItemButton>
                                        <Collapse in={openCategory[entry.name]} timeout="auto">
                                            <div key={entry.name} id="subcategory">
                                                <List>
                                                    {entry.items.map((subEntry, index) => {
                                                        return(
                                                            <ListItemButton id={subEntry.name} sx={{ pl: 4}}>
                                                                <ListItemText primary={subEntry.name} />
                                                            </ListItemButton>
                                                        );
                                                    })}
                                                </List>
                                            </div>
                                        </Collapse>
                                    </div>
                                );
                            } else {
                                return(
                                    <div>
                                        <ListItemButton>
                                            <ListItemText primary={entry.name} />
                                        </ListItemButton>
                                    </div>
                                );
                            }
                        })}
                    </List>
                </Box>
            </Drawer>
        </Container>
    )
}

export default SideMenu;