import React from 'react';
import createTheme from '@mui/material/styles/createTheme';
import { ThemeProvider } from '@mui/material';
import tw from 'twin.macro';
import { css } from 'styled-components/macro';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TextField from '@mui/material/TextField';
import Badge from '@mui/material/Badge';
import InputAdornment from '@mui/material/InputAdornment';
import Logo from './Logo.jsx';
import {Link} from 'react-router-dom';
import Categories from '../components/Categories';

const Container = tw.div`
  relative
`

const Wrapper = tw.div`
  justify-between flex sm:py-1 md:py-2 items-center border-0 border-b-8 border-[#e3e836] border-double
`
/*
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 5px solid #e3e836;
`

*/
  
const Left = tw.div`
  flex-1 flex items-center w-1/4
`

const LogoContainer = tw.div`
  flex items-center m-5
`

/*
const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`
*/

const categoryMenu = styled.label`
    font-size: 20px;
    cursor: pointer;
`

const Input = styled.input`
    border: none;
    align-items: center;
    width: 600px;
`

const Center = tw.div`
  flex items-center w-1/4 sm:w-1/3 md:w-1/2 m-5
`
/*
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
*/
const Right = tw.div`
  flex-shrink flex items-center w-1/4 justify-around
`

const MenuItem = tw.div`
  cursor-pointer text-xl font-medium
`
/*
const MenuItem = styled.div`
    font-size: 25px;
    cursor: pointer;
    margin: 25px;
`
*/

const Navbar = () => {
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Link to="/home">
                      <LogoContainer>
                        <Logo
                          style={{ preserveAspectRatio: "xMidYMid meet", viewBox: "0 0 700 550"}}
                          alt="website logo">
                        <Link to="/home"></Link>
                        </Logo>
                      </LogoContainer>
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
                        preserveAspectRatio: "xMidYMid meet",
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
        </Container>
    )
}

export default Navbar;
