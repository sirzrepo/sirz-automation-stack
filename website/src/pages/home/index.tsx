import Hero from "./components/hero";
import OurProjects from "./components/projects";
import WhoAreWe from "./components/whoWeAre";
import OurExpertise from "./components/ourExpertise";
import WhySirz from "./components/whySirz";
import SirzIsGreat from "./components/sirzIsGreat";
import OurBlog from "./components/ourBlog";
import GetInTouch from "./components/getInTouch";
import CustomerReviews from "./components/customerReviews";

export default function Home() {
    return (
        <div className="">
            <Hero />
            <WhoAreWe />
            <OurExpertise />
            <WhySirz />
            <SirzIsGreat />
            <OurProjects />
            <OurBlog />
            <GetInTouch />
            <CustomerReviews />
        </div>
    );
}
