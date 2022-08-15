import React, { useReducer, createContext, useState, useEffect } from 'react';
import styoled from 'styled-components';
import tw from 'twin.macro';
import { css } from 'styled-components/macro';
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import Footer from '../components/Footer';
import TabCardGrid from '../components/CardGrid/TabCardGrid.js';
import axios from "axios";

const CheckboxContainer = tw.div`
  hidden sm:flex
`

const testData = { 
  items: [
  {
    imageSrc:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
    title: "Veg Mixer",
    brand: "Unknown",
    content: "Tomato Salad & Carrot",
    price: "$5.99",
    rating: "5.0",
    reviews: "87",
    url: "http://localhost:3000/"
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1432139555190-58524dae6a55?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
    title: "Macaroni",
    brand: "Unknown",
    content: "Cheese Pizza",
    price: "$2.99",
    rating: "4.8",
    reviews: "32",
    url: "#"
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327??ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
    title: "Nelli",
    brand: "Unknown",
    content: "Hamburger & Fries",
    price: "$7.99",
    rating: "4.9",
    reviews: "89",
    url: "#"
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
    title: "Jalapeno Poppers",
    brand: "Unknown",
    content: "Crispy Soyabeans",
    price: "$8.99",
    rating: "4.6",
    reviews: "12",
    url: "#"
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1473093226795-af9932fe5856?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
    title: "Cajun Chicken",
    brand: "Unknown",
    content: "Roasted Chicken & Egg",
    price: "$7.99",
    rating: "4.2",
    reviews: "19",
    url: "#"
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1550461716-dbf266b2a8a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
    title: "Chillie Cake",
    brand: "Unknown",
    content: "Deepfried Chicken",
    price: "$2.99",
    rating: "5.0",
    reviews: "61",
    url: "#"
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
    title: "Guacamole Mex",
    brand: "Unknown",
    content: "Mexican Chilli",
    price: "$3.99",
    rating: "4.2",
    reviews: "95",
    url: "#"
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1565310022184-f23a884f29da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
    title: "Carnet Nachos",
    brand: "Unknown",
    content: "Chilli Crispy Nachos",
    price: "$3.99",
    rating: "3.9",
    reviews: "26",
    url: "#"
  }
]
};
// Stores for query parameters
export const ShopContext = createContext();

function filterReducer(state, newBit) {
  return state | (1 << newBit);
}

export function constructLink(newBit, newTerm) {
  var temp = "http://localhost:8000/search?";
  if (newBit != 0) {
    temp += "categories=" + newBit;
  }
  if (newTerm != "") {
    temp += "search=" + newTerm;
  }
  return temp;
}

const Home = () => {
    const [filter, setFilter] = useReducer(filterReducer, 0);
    const [searchTerm, setSearchTerm] = useState("");
    const [link, setLink] = useState(constructLink(filter, searchTerm));
    
    useEffect(() => {
      setLink(constructLink(filter, searchTerm));
    }, [filter, searchTerm]);

    return (
        <div>
          <span>{link}</span>
          <span>{filter}</span>
          <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
          <TabCardGrid filter={filter} setFilter={setFilter} input={testData} />
          <Footer />
        </div>
    )
}

export default Home;


