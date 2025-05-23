import Hero from './Hero';
import WhyChooseUs from './WhyChooseUs';
import FeaturedTask from './FeaturedTask';
import Slider from './Slider';
import ReviewSection from './ReviewSection';
import Tasks from './Tasks';
import TechMatchNeeds from './TechMatchNeeds';



const Home = () => {

    return (
        <div>
            <title>Home || Task Match</title>
            <Hero></Hero>
            <FeaturedTask></FeaturedTask>
            <Slider></Slider>
            <TechMatchNeeds></TechMatchNeeds>
            <WhyChooseUs></WhyChooseUs>
            <Tasks></Tasks>
            <ReviewSection></ReviewSection>
          
        </div>
    );
};

export default Home;
