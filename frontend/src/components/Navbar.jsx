import React from 'react';
import createTheme from '@mui/material/styles/createTheme';
import { ThemeProvider } from '@mui/material';
import tw from 'twin.macro';
import { css } from 'styled-components/macro';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import InputAdornment from '@mui/material/InputAdornment';
import Logo from './Logo.jsx';
import {Link} from 'react-router-dom';
import Categories from '../components/Categories';
import SideMenu from '../components/SideMenu';
import SearchBar from '../components/SearchBar';
import LogoPng from '../assets/logo-cropped.png';

const Container = tw.div`
  relative bg-indigo-300
`

const Wrapper = tw.div`
  justify-between flex  sm:py-1 md:py-2 items-center border-0 border-b-8 border-[#e3e836] border-double
`
  
const Left = tw.div`
  flex items-start place-items-start justify-start w-1/4 sm:max-w-md
`

const LogoContainer = tw.div`
  items-start m-5 items-start justify-start m-0 p-2 block
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

const Center = tw.div`
  flex justify-center items-center w-1/4 sm:w-1/3 md:w-1/2 m-5
`
const Right = tw.div`
  flex-shrink flex items-end w-1/4 justify-end
`

const MenuItem = tw.div`
  cursor-pointer text-xl font-medium
`

const MenuWrapper = tw.div`
  invisible md:visible
`

const ImageWrapper = tw.img`
  w-24 h-10 block sm:w-36 sm:h-14
`
const ImageA = tw.a`

`
const Navbar = () => {

    const categoriesInput = {
      categories: [
        {
          name: "Fruit",
          items: [],
        },
        {
          name: "Dried Products",
          items: [
            {
              name: "Thai Dessert",
            },
          ],
        },
        {
          name: "Sauce",
          items: [
            {
              name: "Chili Sauce",
            },
          ]
        }
      ]
    };

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Link to="/home">
                      <LogoContainer>
                        <a class="navbar-brand" aria-label="Thai Shop Logo" href="http://localhost:8000/" title="Thai Shop">
                          <ImageWrapper src={LogoPng} alt="Thai Shop" />
                        </a>
                      </LogoContainer>
                    </Link>
                </Left>
                <Center>
                  <SearchBar />
                </Center>
                <Right>
                  <SideMenu input={categoriesInput}/>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar;
