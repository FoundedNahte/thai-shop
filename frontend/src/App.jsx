import React from 'react';
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import SignIn from "./pages/SignIn";
import Cart from "./pages/Cart";
import {Route, Routes, BrowserRouter} from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/home" element = {<Home/>}/>
         <Route path="/shop" element = {<Shop/>}/>
         <Route path="/signin" element = {<SignIn/>}/>
         <Route path="/cart" element = {<Cart/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
