import Hero from './Hero';
import WhyChooseUs from './WhyChooseUs';
import FeaturedTask from './FeaturedTask';
import Slider from './Slider';
import ReviewSection from './ReviewSection';
import Tasks from './Tasks';



const Home = () => {

    return (
        <div>
            <title>Home || Task Match</title>
            <Hero></Hero>
            <FeaturedTask></FeaturedTask>
            <Slider></Slider>
            <WhyChooseUs></WhyChooseUs>
            <ReviewSection></ReviewSection>
            <Tasks></Tasks>
          
        </div>
    );
};

export default Home;
