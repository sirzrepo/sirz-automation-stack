import Layout from "../../components/layout/layout";
import About from "../../pages/about";
import Contact from "../../pages/contact";
import OurBlogPage from "../../pages/blog";
import BlogDetailPage from "../../pages/blog/blogDetail";
import Home from "../../pages/home";
import Projects from "../../pages/projects";
import Branding from "../../pages/services/branding";
import DigitalMarketing from "../../pages/services/digitalMarketing";
import Ecommerce from "../../pages/services/ecommerce";
import Welcome from "../../pages/welcome";
import CaseStudies from "../../pages/caseStudies";
import MossGlowBeauty from "../../pages/caseStudies/moss";
import WellnessStudio360 from "../../pages/caseStudies/wellnessStudio";
import BrandCom from "../../pages/caseStudies/brandcom";
import DentiQ from "../../pages/caseStudies/dentiQ";
import Nureva from "../../pages/caseStudies/nureva";
import Purvia from "../../pages/caseStudies/purvia";
import OnboardingPage from "../../pages/dashboard";
import SalesFunnel from "../../pages/salesFunnel";

export const ROUTES = {
    LAYOUT: {
        PATH: "/",
        ELEMENT: <Layout />
    },
    WELCOME: {
        PATH: "",
        ELEMENT: <Welcome />
    },
    DASHBOARD: {
        PATH: "/dashboard",
        ELEMENT: <OnboardingPage />
    },
    SALES_FUNNEL: {
        PATH: "/sales-funnel",
        ELEMENT: <SalesFunnel />
    },
    HOME: {
        PATH: "/home",
        ELEMENT: <Home />
    },
    // sample test page for the user object
    SAMPLE_PAGE: {
        PATH: "/sample",
        ELEMENT: <About />
    },
    ABOUT: {
        PATH: "/about",
        ELEMENT: <About />
    },
    BLOG: {
        PATH: "/blog",
        ELEMENT: <OurBlogPage />
    },
    BLOG_DETAIL: {
        PATH: "/blog/:slug",
        ELEMENT: <BlogDetailPage />
    },
    CONTACT: {
        PATH: "/contact",
        ELEMENT: <Contact />
    },
    SERVICE_BRANDING: {
        PATH: "/services-branding",
        ELEMENT: <Branding />
    },
    SERVICE_DIGITALMARKETING: {
        PATH: "/services-digital-marketing",
        ELEMENT: <DigitalMarketing />
    },
    SERVICE_ECOMMERCE: {
        PATH: "/services-ecommerce",
        ELEMENT: <Ecommerce />
    },
    PROJECTS: {
        PATH: "/projects",
        ELEMENT: <Projects />
    },
    CASE_STUDY: {
        PATH: "/case-study",
        ELEMENT: <CaseStudies />
    },
    CASE_STUDY_MOSS_GLOW_BEAUTY: {
        PATH: "/case-study-moss-glow-beauty",
        ELEMENT: <MossGlowBeauty />
    },
    CASE_STUDY_WELLNESS_STUDIO: {
        PATH: "/case-study-wellness_studio",
        ELEMENT: <WellnessStudio360 />
    },
    CASE_STUDY_BRANDCOM: {
        PATH: "/case-study-brandcom",
        ELEMENT: <BrandCom />
    },
    CASE_STUDY_DENTIQ: {
        PATH: "/case-study-dentiQ",
        ELEMENT: <DentiQ />
    },
    CASE_STUDY_NUREVA: {
        PATH: "/case-study-nureva",
        ELEMENT: <Nureva />
    },
    CASE_STUDY_PURVIA: {
        PATH: "/case-study-purvia",
        ELEMENT: <Purvia />
    },
}