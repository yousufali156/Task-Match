import React from 'react';
import Hero from './Hero';
import WhyChooseUs from './WhyChooseUs';
import FeaturedTask from './FeaturedTask';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <FeaturedTask></FeaturedTask>
            <WhyChooseUs></WhyChooseUs>
        </div>
    );
};

export default Home;