import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

const Container = tw.div`relative`;

const CarcContainer = tw.div`mt-10 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 sm:pr-10 md:pr-6 lg:pr-12`;

const CardImageContainer = styled.div`
    ${props => css`background-image: url("${props.imageSrc}");`}
    ${tw`h-56 x1:h-64 bg-center bg-cover relative rounded-t`}
`;

const CardGrid = () => {
    const [tabs, setTabs, activeTab, setActiveTab] = useState();
    
    useEffect(()=> {
        getCategories()
        .then(data => {
            setTabs(data)
        })
    })
    
    return (
        <div><BButton /></div>
    )
}

// Test Data
const getCategories = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                Categories: [
                    "Sauce",
                    "Fruit",
                    "Snacks",
                    "Drinks",
                    "Rice",
                ]
            })
        }, 1500)
    })
};

export default CardGrid;