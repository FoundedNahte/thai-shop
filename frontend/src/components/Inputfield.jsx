import React, { useImperativeHandle } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { css } from 'styled-components/macro';

const SearchInput = tw.input`
    font-sans font-semibold text-xl w-36 sm:w-60 md:w-72 lg:w-[32rem] xl:w-[36rem] 2xl:w-[40rem] h-6 md:h-9 rounded border-transparent rounded rounded-r-none outline-none focus:border-yellow-400 focus:border-opacity-50
`

const Inputfield = ({localTerm}) => {
    
    useImperativeHandle

    return (
        <SearchInput ref={localTerm} id="searchtextbox" class="nav-input nav-progressive-attribute" type="text" autocomplete="off" placeholder="" aria-label="Search" />
    )
}

export default Inputfield;