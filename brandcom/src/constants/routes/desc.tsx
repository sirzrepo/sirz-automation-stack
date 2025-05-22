import Layout from "../../components/layout/layout";
import Branding from "../../pages/branding";
import Contact from "../../pages/contact";
import DigitalMarketing from "../../pages/digitalMarketing";
import Ecommerce from "../../pages/ecommerce";
import Home from "../../pages/home";
import Services from "../../pages/services";
import Welcome from "../../pages/welcome";

export const ROUTES = {
    LAYOUT: {
        PATH: "/",
        ELEMENT: <Layout />
    },
    WELCOME: {
        PATH: "/welcome",
        ELEMENT: <Welcome />
    },
    HOME: {
        PATH: "",
        ELEMENT: <Home />
    },
    CONTACT: {
        PATH: "/contact",
        ELEMENT: <Contact />
    },
    ECOMMERCE: {
        PATH: "/ecommerce",
        ELEMENT: <Ecommerce />
    },
    DIGITAL_MARKETING: {
        PATH: "/digital-marketing",
        ELEMENT: <DigitalMarketing />
    },
    BRANDING: {
        PATH: "/branding",
        ELEMENT: <Branding />
    },
    SERVICES: {
        PATH: "/services/:service",
        ELEMENT: <Services />
    },

}