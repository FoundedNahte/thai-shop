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

const CheckboxMenu = ({filter, setFilter, currentDataLength, totalItems}) => {
    
    const categories = [
        "Bamboo/Corn/Mushrooms",
        "Beverages/Juices",
        "Candies/Snacks",
        "Canned Coconut Milk",
        "Canned Fruits & Vegetables",
        "Curry & Paste",
        "Dried Products",
        "Frozen Products",
        "Instant Noodles",
        "Other Canned Products",
        "Pickled & Preserved Products",
        "Rice",
        "Rice Products/Beans/Starch",
        "Sauces/Spices/Seasonings",
        "Utensils & Non-Food Products",
    ];

    const [state, setState] = useState({
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false,
        12: false,
        13: false,
        14: false,
    });

    const [localFilter, setLocalFilter] = useState(0);

    const handleChange = (event, index) => {
        if (event.target.checked == true) {
            setLocalFilter(localFilter | (1 << index));
            setState({
                ...state,
                [index]: false,
            });
        } else {
            setLocalFilter(localFilter & (~(1 << index)));
            setState({
                ...state,
                [index]: true,
            });
        }
        setFilter(localFilter);
    };

    return (
        <Container>
            <HeaderWrapper>
                <HeaderText>{localFilter}</HeaderText>
                <HeaderText>Showing {currentDataLength} out of {totalItems}</HeaderText>
                <TextWrapper>
                    <FilterAltIcon sx={{ fontSize: "40px" }}/><HeaderText>Filter</HeaderText>
                </TextWrapper>
            </HeaderWrapper>
            <FormGroup>
                {categories.map((category, index) => {
                    
                    return <FormControlLabel control={<Checkbox checked={} onChange={(e) => {handleChange(e, index)}} name={category}/>} label={<Text>{category}</Text>} />
                })}
            </FormGroup>
        </Container>
    )
}

export default CheckboxMenu;