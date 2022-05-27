import React from 'react';
import styled from 'styled-components'; 
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import StorePictureOne from './StorePictureOne.jsx';

const Container = styled.div`
    width: 100%;
    height: 50vh;
    display: flex;
    position: relative;
    overflow: hidden;
    align-items: center;
`
const Wrapper = styled.div`
    margin-left: 20px;
    padding: 20px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 100%;
    width: 100%;
`

const ImgContainer = styled.div`
    height: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Image = styled.img`
    height: 80%;
    width: 70%;
`

const Slider = () => {
    return (
        <Container>
            <ImgContainer>
                <StorePictureOne />
            </ImgContainer>
        </Container>
    )
}

export default Slider;