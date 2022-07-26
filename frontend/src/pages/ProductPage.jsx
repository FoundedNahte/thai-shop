import React, { useState } from 'react';

import Navbar from '../components/Navbar';
import SingleProduct from '../components/SingleProduct';
import Footer from '../components/Footer';

const ProductPage = ({item}) => {
    
    return (
        <div>
            <Navbar />
            <SingleProduct item={item}/>
            <Footer/>
        </div>
    )
}

export default ProductPage;