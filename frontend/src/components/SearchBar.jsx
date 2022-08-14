import React, { useReducer, useContext, useState, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import tw from 'twin.macro';
import { css } from 'styled-components/macro';
import TextField from '@mui/material/TextField';
import Collapse from '@mui/material/Collapse';
import SearchIcon from '@mui/icons-material/Search';
import ShopContext from '../pages/Home.jsx';

const Container = tw.div`
    flex justify-between
`
const InputForm = tw.form`
    items-center justify-center flex rounded items-center 
`

const Wrapper = tw.div`
    flex items-center justify-center 
`

const SearchLeft = tw.div`
`

const SearchField = tw.div`
`

const SearchInput = tw.input`
    font-sans font-semibold text-xl w-36 sm:w-60 md:w-72 lg:w-[32rem] xl:w-[36rem] 2xl:w-[40rem] h-6 md:h-9 rounded border-transparent rounded rounded-r-none outline-none focus:border-yellow-400 focus:border-opacity-50
`

const SearchRight = tw.div`
`

const SearchBarContainer = tw.div`
    p-2
`
const Span1 = tw.span`
`
const ButtonInput = tw.button`
    cursor-pointer items-center flex bg-yellow-400 border-transparent rounded rounded-l-none h-[1.89rem] md:h-[2.58rem] transition duration-300 hover:bg-yellow-500
`

function ControlledInput({ onUpdate }) {
    const [value, setState] = useState();
    const handleChange = e => {
        setState(e.target.value);
        onUpdate(e.target.value);
    };
    return <SearchInput value={value} onChange={handleChange} id="searchtextbox" class="nav-input nav-progressive-attribute" type="text" autocomplete="off" placeholder="" aria-label="Search"/>;
}

const SearchBar = ({searchTerm, setSearchTerm}) => {

    const localTerm = useRef("");

    const handleClick = () => {
        setSearchTerm(localTerm.current)
    }

    return (
        <Container>
            <InputForm>
                <Wrapper>
                    <SearchField>
                        <ControlledInput
                            onUpdate={val => {
                                localTerm.current = val;
                            }}
                        />
                        
                    </SearchField>
                    <SearchRight>
                        <Span1>
                            <ButtonInput onClick={handleClick}>
                                <SearchIcon />
                            </ButtonInput>
                        </Span1>
                    </SearchRight>
                </Wrapper>
            </InputForm>
        </Container>
    )
}
export default SearchBar;
