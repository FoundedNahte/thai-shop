import React from 'react';
import createTheme from '@mui/material/styles/createTheme';
import { ThemeProvider } from '@mui/material';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TextField from '@mui/material/TextField';
import Badge from '@mui/material/Badge';
import InputAdornment from '@mui/material/InputAdornment';
import Logo from './Logo.jsx';

const Container = styled.div`
    height: 60px;
`

const Wrapper = styled.div`
    padding: 20px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 5px solid #e3e836;
`

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`

const categoryMenu = styled.label`
    font-size: 20px;
    cursor: pointer;
`

const Input = styled.input`
    border: none;
    align-items: center;
    width: 600px;
`

const Center = styled.div`
    flex: 2;
    text-align: center;
    align-items: center;
`

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

const MenuItem = styled.div`
    font-size: 20px;
    cursor: pointer;
    margin: 25px;
`

const Navbar = () => {
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Logo
                      style={{ height: '50px', width: '300px' }}
                      alt="website logo"
                    />
                </Left>
                <Center>
                  <TextField fullWidth 
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon/>
                        </InputAdornment>
                      ),
                      style: {
                        borderRadius: "50px",
                        border: "3px solid gray",
                      }
                    }}
                    id="SearchBar" />
                </Center>
                <Right>
                  <MenuItem>
                    CATEGORIES
                  </MenuItem>
                  <MenuItem>
                    SIGN IN
                  </MenuItem>
                  <MenuItem>
                    <Badge badgeContent={4} color="primary">
                      <ShoppingCartIcon />
                    </Badge>
                  </MenuItem>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar;