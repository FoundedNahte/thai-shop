import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';



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