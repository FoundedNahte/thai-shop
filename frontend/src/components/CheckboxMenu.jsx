import React, { useState } from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';
import { css } from 'styled-components/macro';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const Container = tw.div`
    justify-center items-center py-20 bg-indigo-50
`

const Text = tw.span`
    font-semibold font-sans text-xs sm:text-lg
`

const HeaderWrapper = tw.div`
    border-0 border-b-8 border-opacity-30 border-yellow-200 border-solid
`

const HeaderText = tw.span`
    font-sans font-bold text-center text-lg py-2
`

const TextWrapper = tw.div`
    flex items-center
`

const CheckboxMenu = ({currentDataLength, totalItems}) => {
    
    return (
        <Container>
            <HeaderWrapper>
                <HeaderText>Showing {currentDataLength} out of {totalItems}</HeaderText>
                <TextWrapper>
                    <FilterAltIcon sx={{ fontSize: "40px" }}/><HeaderText>Filter</HeaderText>
                </TextWrapper>
            </HeaderWrapper>
            <FormGroup>
                <FormControlLabel control={<Checkbox />} label={<Text>Bamboo/Corn/Mushrooms</Text>} />
                <FormControlLabel control={<Checkbox />} label={<Text>Beverages/Juices</Text>} />
                <FormControlLabel control={<Checkbox />} label={<Text>Candies/Snacks</Text>} />
                <FormControlLabel control={<Checkbox />} label={<Text>Canned Coconut Milk</Text>} />
                <FormControlLabel control={<Checkbox />} label={<Text>Canned Fruits & Vegetables</Text>} />
                <FormControlLabel control={<Checkbox />} label={<Text>Curry & Paste</Text>} />
                <FormControlLabel control={<Checkbox />} label={<Text>Dried Products</Text>} />
                <FormControlLabel control={<Checkbox />} label={<Text>Frozen Products</Text>} />
                <FormControlLabel control={<Checkbox />} label={<Text>Instant Noodles</Text>} />
                <FormControlLabel control={<Checkbox />} label={<Text>Other Canned Products</Text>} />
                <FormControlLabel control={<Checkbox />} label={<Text>Pickled & Preserved Products</Text>} />
                <FormControlLabel control={<Checkbox />} label={<Text>Rice</Text>} />
                <FormControlLabel control={<Checkbox />} label={<Text>Rice Products/Beans/Starch</Text>} />
                <FormControlLabel control={<Checkbox />} label={<Text>Sauces/Spices/Seasonings</Text>} />
                <FormControlLabel control={<Checkbox />} label={<Text>Utensils & Non-Food Products</Text>} />
            </FormGroup>
        </Container>
    )
}

export default CheckboxMenu;