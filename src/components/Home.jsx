import React from 'react';
import Hero from './Hero';
import WhyChooseUs from './WhyChooseUs';
import FeaturedTask from './FeaturedTask';
import Slider from './Slider';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <FeaturedTask></FeaturedTask>
            <Slider></Slider>
            <WhyChooseUs></WhyChooseUs>
        </div>
    );
};

export default Home;