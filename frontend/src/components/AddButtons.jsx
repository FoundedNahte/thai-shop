import React, { useState } from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';
import { css } from 'styled-components/macro';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const ButtonTheme = createTheme({
    palette: {
        default: {
            main: "#3B82F6",
            contrastText: "#FFFFFF",
        }
    }
})

const Container = tw.div`
    py-5
`

const CounterSpan = tw.span`
    text-black
`

const AddButtons = () => {
    
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => {
        if (quantity < 100)
            setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    return (
        <Container>
            <ThemeProvider theme={ButtonTheme}>
                <ButtonGroup size="small" aria-label="small outlined button group">
                    <Button variant="contained" color="default" onClick={handleDecrement}>-</Button>
                    <Button disabled><CounterSpan>{quantity}</CounterSpan></Button>
                    <Button variant="contained" color="default" onClick={handleIncrement}>+</Button>
                    <Button variant="contained" color="default">Add to Cart</Button>
                </ButtonGroup>
            </ThemeProvider>
        </Container>
    )
}

export default AddButtons;