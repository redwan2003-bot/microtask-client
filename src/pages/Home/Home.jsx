import Banner from "../../components/Home/Banner";
import BestWorkers from "../../components/Home/BestWorkers";
import Testimonials from "../../components/Home/Testimonials";
import HowItWorks from "../../components/Home/HowItWorks";
import PlatformStats from "../../components/Home/PlatformStats";
import CallToAction from "../../components/Home/CallToAction";

const Home = () => {
    return (
        <div>
            <div className="container mx-auto px-4 lg:px-12">
                <Banner />
                <BestWorkers />
            </div>
            <HowItWorks />
            <div className="container mx-auto px-4 lg:px-12">
                <Testimonials />
            </div>
            <PlatformStats />
            <CallToAction />
        </div>
    );
};

export default Home;
