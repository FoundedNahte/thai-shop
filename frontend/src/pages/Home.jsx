import React from 'react';
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import Footer from '../components/Footer';
import TabCardGrid from '../components/treset/TabCardGrid.js';

const Home = () => {
    return (
        <div>
          <Navbar />
          <TabCardGrid />
          <Footer />
        </div>
    )
}

export default Home;