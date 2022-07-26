import React from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';
import { css } from 'styled-components/macro';

const Wrapper = tw.div`
    justify-center items-center
`
const Container = tw.div`
    justify-center items-center w-1/2
`

const ImageContainer = styled.div`
    ${props => css`background-image: url("${props.imageSrc}");`}
    ${tw`bg-center bg-cover relative rounded-t`}
`

const Header = tw.h3`

`
const InformationContainer = tw.div`

`

const SingleProduct = ({item}) => {
    return (
        <Container>
            <Wrapper>
                <Header>
                    {item.name}
                </Header>
                <ImageContainer>
                    <img src={item.imageSrc} />
                </ImageContainer>
                <InformationContainer>
                    
                </InformationContainer>
            </Wrapper>
        </Container>
    )
}

export default SingleProduct;