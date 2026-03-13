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
import Agents from "../../pages/agents";
import ThankYouPage from "../../pages/thankyou";
import IroseFashion from "../../pages/caseStudies/iroseFashion";
import DynamicContact from "../../pages/dynamicContact";
import SecurityLayout from "../../pages/security/loayout";
import LeadDataProcessing from "../../pages/security/lead_data_processing";
import PrivacyPolicy from "../../pages/security/privacy_policy";
import TermsOfService from "../../pages/security/terms_of_service";
import CookiePolicy from "../../pages/security/cookie_policy";

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
    DYNAMIC_CONTACT: {
        PATH: "/dynamic-contact",
        ELEMENT: <DynamicContact />
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
    CASE_STUDY_IROSE_FASHION: {
        PATH: "/case-study-irose-fashion",
        ELEMENT: <IroseFashion />
    },
    AGENTS: {
        PATH: "/agents",
        ELEMENT: <Agents />
    },
    THANKYOU: {
        PATH: "/thankyou",
        ELEMENT: <ThankYouPage />
    },

    SECURITY: {
        PATH: "/security",
        ELEMENT: <SecurityLayout />
    },
    PRIVACY_POLICY: {
        PATH: "/security/privacy-policy",
        ELEMENT: <PrivacyPolicy />
    },
    LEAD_DATA_PROCESSING: {
        PATH: "/security/lead-data-processing",
        ELEMENT: <LeadDataProcessing />
    },
    TERMS_OF_SERVICE: {
        PATH: "/security/terms-of-service",
        ELEMENT: <TermsOfService />
    },
    COOKIE_POLICY: {
        PATH: "/security/cookie-policy",
        ELEMENT: <CookiePolicy />
    }
    
}