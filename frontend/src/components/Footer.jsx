import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { css } from 'styled-components/macro'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

const Container = tw.div`
    relative flex bg-yellow-200 h-[-10.5rem] py-[2.5rem]
`
const Left = styled.div`
    flex: 1;
`

const Center = tw.div`
    table-column justify-center items-center text-center
`

const Right = styled.div`
    flex: 1;
`

const Title = styled.h3`
    margin-bottom: 30px;
`

const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`

const Footer = () => {
    return (
        <Container>
            <Left>
            </Left>
            <Center>
                <Title>Contact</Title>                
                <ContactItem>
                    <LocationOnIcon style={{}}/> 7069 Brookfield Plaza, Springfield, VA 22150
                </ContactItem>
                <ContactItem>
                    <PhoneIcon style={{}}/> (703) 912-3164
                </ContactItem>
            </Center>
            <Right></Right>
        </Container>
    )
}

export default Footer;