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
    visible sm:hidden bg-gray-300 w-full
`

const TopWrapper = tw.div`
   inline justify-center items-center w-full
`

const LowerWrapper = tw.div`
    flex-col justify-center
`

const ImageWrapper = tw.div`
    flex items-center justify-center
`

const InformationWrapper = tw.div`
    hidden sm:table m-auto w-20 justify-start items-start text-left w-full p-10
`

const Header = tw.h3`
    font-sans text-left text-3xl px-5
`

const Text = tw.p`
    font-sans py-5 text-left px-5 text-lg
`

const DisplayImage = tw.img`
    max-w-4xl w-full
`

const ButtonWrapper = tw.div`
    px-5
`

const MainContainer = tw.div`
    hidden sm:contents justify-center items-center h-full w-full
`

const SingleProductContainer = tw.div`
    flex w-full
`

const SingleProduct = ({item}) => {
    return (
        <SingleProductContainer>
            <MainContainer>
                <CheckboxMenu />
                <TopWrapper>
                    <ImageWrapper>
                        <DisplayImage src={item.imageSrc} />
                    </ImageWrapper>
                    <InformationWrapper>
                        <Header>{item.title}</Header>
                        <Text>{item.brand}</Text>
                        <Text>{item.content}</Text>
                        <Text>{item.price}</Text>
                        <ButtonWrapper>
                            <AddButtons />
                        </ButtonWrapper>
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