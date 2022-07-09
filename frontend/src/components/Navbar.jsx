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
import {Link} from 'react-router-dom';
import Categories from '../components/Categories';

const Container = styled.div`
    height: 60px;
    position: relative;
`

const Wrapper = styled.div`
    padding: 10px 20px;
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
    justify-content: space-around;
`

const MenuItem = styled.div`
    font-size: 25px;
    cursor: pointer;
    margin: 25px;
`

const Navbar = () => {
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Link to="/home">
                      <Logo
                        style={{ height: '50px', width: '300px' }}
                        alt="website logo">
                      <Link to="/home"></Link>
                      </Logo>
                    </Link>
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
                    <Link to="/shop">SHOP</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/signin">SIGN IN</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to ="/cart">
                      <Badge badgeContent={4} color="primary">
                        <ShoppingCartIcon />
                      </Badge>
                    </Link>
                  </MenuItem>
                </Right>
            </Wrapper>
			<Categories/>
        </Container>
    )
}

export default Navbar;
