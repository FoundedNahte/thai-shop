import React from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';
import { css } from 'styled-components/macro';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import Button from '@mui/material/Button';
import AddButtons from './AddButtons';
import CheckboxMenu from './CheckboxMenu';

const ButtonTheme = createTheme({
    palette: {
        default: {
            main: '#3B82F6',
            contrastText: '#FFFFFF',
        }
    }
})

const MobileContainer = tw.div`
    visible sm:hidden bg-gray-300
`

const TopWrapper = tw.div`
   flex justify-center items-center
`

const LowerWrapper = tw.div`
    flex-col justify-center
`

const ImageWrapper = tw.div`
    grid w-auto pr-40 items-center justify-center
`

const InformationWrapper = tw.div`
    hidden sm:table m-auto w-20 justify-end items-end text-left
`

const Header = tw.h3`
    font-sans text-left text-3xl px-5
`

const Text = tw.p`
    font-sans py-5 text-left px-5 text-lg
`

const DisplayImage = tw.img`
    sm:w-full items-center justify-center w-full
`

const ButtonWrapper = tw.div`
    px-5
`

const MainContainer = tw.div`
    hidden sm:contents justify-center items-center
`

const SingleProductContainer = tw.div`
    flex
`

const SingleProduct = ({item}) => {
    return (
        <SingleProductContainer>
            <MainContainer>
                <TopWrapper>
                    <ImageWrapper>
                        <DisplayImage src={item.imageSrc} />
                    </ImageWrapper>
                    <InformationWrapper>
                        <Header>{item.title}</Header>
                        <Text>{item.content}</Text>
                        <Text>{item.price}</Text>
                    </InformationWrapper>
                </TopWrapper>
            </MainContainer>
            <MobileContainer>
                <TopWrapper>
                    <ImageWrapper>
                        <DisplayImage src={item.imageSrc} />
                    </ImageWrapper>
                </TopWrapper>
                <LowerWrapper>
                    <Header>
                        {item.title}
                    </Header>
                    <Text>
                        {item.content}
                    </Text>
                    <Text>
                        {item.price}
                    </Text>
                    <ButtonWrapper>
                        <AddButtons />
                    </ButtonWrapper>
                </LowerWrapper>
            </MobileContainer>
        </SingleProductContainer>
    )
}

export default SingleProduct;