import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { css } from 'styled-components/macro'
import Divider from '@mui/material/Divider';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import LogoPng from '../assets/logo-cropped.png'

const Section = styled.footer`
  margin: 0;
  background: linear-gradient(to right, #1e3a8a, #4338ca);
  color: white;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10vw;
  padding: 4vw;
  p {
    font-size: 1.1rem;
    line-height: 2rem;
    letter-spacing: 0.1rem;
  }
  ul {
    display: flex;
    list-style-type: none;
    gap: 4vw;
    margin-top: 2vw;
    li {
      padding: 0.8rem;
      border-radius: 2rem;
      background-color: white;
      transition: 0.3s ease-in-out;
      cursor: pointer;
      &:hover {
        background-color: black;
        svg {
          transform: scale(1.2);
        }
      }
      svg {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fc4958;
        font-size: 1.6rem;
        transition: 0.3s ease-in-out;
        &:hover {
        }
      }
    }
  }
  img {
    filter: brightness(0) invert(1);
    width: 10vw;
  }
  .container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    h3 {
      font-size: 2rem;
    }
  }
  @media screen and (min-width: 260px) and (max-width: 1080px) {
    grid-template-columns: 1fr;
    .container {
      img {
        height: 4rem;
        width: 10rem;
      }
    }
  }
`;

const LowerFooter = styled.div`
  margin: 0;
  text-align: center;
  background-color: azure;
  color: black;
  padding: 1rem;
  h2 {
    span {
      color: DarkGoldenRod;
      text-transform: uppercase;
    }
  }
  @media screen and (min-width: 260px) and (max-width: 450px) {
    h2 {
      span {
        display: block;
      }
    }
  }
`;

const Footer = () => {
    return (
        <div className="footer">
            <Section>
                <div className="brand container">
                    <img src={LogoPng} alt="" />
                    <h3>Hours of Operation:</h3>
                    <p>Saturday..10AM-6PM<br/>
                        Monday..10AM-6PM<br/>
                        Tuesday..CLOSED<br/>
                        Wednesday..10AM-6PM<br/>
                        Thursday..10AM-6PM<br/>
                        Friday..10AM-6PM<br/>
                        Saturday..10AM-6PM
                    </p>
                </div>
                <div className="about container">
                    <div className="title">
                        <h3>About Us</h3>
                    </div>
                    <p>
                        A locally owned Thai grocery store established in 1995. We sell ingredients, food, and snacks related to Thai cuisine.
                    </p>
                </div>
                <div className="contact container">
                    <div className="title">
                        <h3>Contact Us</h3>
                    </div>
                    <p>
                        <PhoneIcon style={{}}/> (703) 912-3164
                    </p>
                    <p>
                        <LocationOnIcon style={{}}/> 7069 Brookfield Plaza, Springfield, VA 22150
                    </p>
                </div>
            </Section>
            <LowerFooter className="lower__footer">
                <h2>
                    Copyright &copy; 2022 <span>Thai Shop</span>
                </h2>
            </LowerFooter>
        </div>
    )
}

export default Footer;