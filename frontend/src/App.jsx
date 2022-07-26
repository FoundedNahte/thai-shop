import React from 'react';
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import SignIn from "./pages/SignIn";
import Cart from "./pages/Cart";
import ProductPage from "./pages/ProductPage";
import {Route, Routes, BrowserRouter} from 'react-router-dom';

const App = () => {
  const ItemInput = {
    items: [
      {
        imageSrc:
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
        title: "Veg Mixer",
        content: "Tomato Salad & Carrot",
        price: "$5.99",
        rating: "5.0",
        reviews: "87",
        url: "http://localhost:3000/"
      }
    ]
  }
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element = {<ProductPage item={ItemInput.items[0]}/>}/>
         <Route path="/home" element = {<Home/>}/>
         <Route path="/shop" element = {<Shop/>}/>
         <Route path="/signin" element = {<SignIn/>}/>
         <Route path="/cart" element = {<Cart/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
