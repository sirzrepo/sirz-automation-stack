import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./desc";

interface Iuser {
    name: string
}

const routes = (user: Iuser) =>
    createBrowserRouter([
        {
            path: (ROUTES.LAYOUT.PATH),
            element: (ROUTES.LAYOUT.ELEMENT),
            children: [
                {
                    path: (ROUTES.HOME.PATH),
                    element: (ROUTES.HOME.ELEMENT),
                },
                {
                    path: (ROUTES.SAMPLE_PAGE.PATH),
                    element: (user && ROUTES.SAMPLE_PAGE.ELEMENT),
                },
                {
                    path: (ROUTES.ABOUT.PATH),
                    element: (ROUTES.ABOUT.ELEMENT),
                },
                {
                    path: (ROUTES.BLOG.PATH),
                    element: (ROUTES.BLOG.ELEMENT),
                },
                {
                    path: (ROUTES.BLOG_DETAIL.PATH),
                    element: (ROUTES.BLOG_DETAIL.ELEMENT),
                },
                {
                    path: (ROUTES.CONTACT.PATH),
                    element: (ROUTES.CONTACT.ELEMENT),
                },
                {
                    path: (ROUTES.SERVICE_BRANDING.PATH),
                    element: (ROUTES.SERVICE_BRANDING.ELEMENT),
                },
                {
                    path: (ROUTES.SERVICE_DIGITALMARKETING.PATH),
                    element: (ROUTES.SERVICE_DIGITALMARKETING.ELEMENT),
                },
                {
                    path: (ROUTES.SERVICE_ECOMMERCE.PATH),
                    element: (ROUTES.SERVICE_ECOMMERCE.ELEMENT),
                },
                {
                    path: (ROUTES.PROJECTS.PATH),
                    element: (ROUTES.PROJECTS.ELEMENT),
                },
                {
                    path: (ROUTES.CASE_STUDY.PATH),
                    element: (ROUTES.CASE_STUDY.ELEMENT),
                },
                {
                    path: (ROUTES.CASE_STUDY_MOSS_GLOW_BEAUTY.PATH),
                    element: (ROUTES.CASE_STUDY_MOSS_GLOW_BEAUTY.ELEMENT),
                },
                {
                    path: (ROUTES.CASE_STUDY_WELLNESS_STUDIO.PATH),
                    element: (ROUTES.CASE_STUDY_WELLNESS_STUDIO.ELEMENT),
                },
                {
                    path: (ROUTES.CASE_STUDY_BRANDCOM.PATH),
                    element: (ROUTES.CASE_STUDY_BRANDCOM.ELEMENT),
                },
                {
                    path: (ROUTES.CASE_STUDY_DENTIQ.PATH),
                    element: (ROUTES.CASE_STUDY_DENTIQ.ELEMENT),
                },
                {
                    path: (ROUTES.CASE_STUDY_NUREVA.PATH),
                    element: (ROUTES.CASE_STUDY_NUREVA.ELEMENT),
                },
                {
                    path: (ROUTES.CASE_STUDY_PURVIA.PATH),
                    element: (ROUTES.CASE_STUDY_PURVIA.ELEMENT),
                },
                {
                    path: (ROUTES.CASE_STUDY_IROSE_FASHION.PATH),
                    element: (ROUTES.CASE_STUDY_IROSE_FASHION.ELEMENT),
                },
                {
                    path: (ROUTES.WELCOME.PATH),
                    element: (ROUTES.WELCOME.ELEMENT),
                },
                {
                    path: (ROUTES.AGENTS.PATH),
                    element: (ROUTES.AGENTS.ELEMENT),
                },
            ],
        },
        {
            path: (ROUTES.SECURITY.PATH),
            element: (ROUTES.SECURITY.ELEMENT),
            children: [
                {
                    path: (ROUTES.LEAD_DATA_PROCESSING.PATH),
                    element: (ROUTES.LEAD_DATA_PROCESSING.ELEMENT),
                },
                {
                    path: (ROUTES.PRIVACY_POLICY.PATH),
                    element: (ROUTES.PRIVACY_POLICY.ELEMENT),
                },
                {
                    path: (ROUTES.TERMS_OF_SERVICE.PATH),
                    element: (ROUTES.TERMS_OF_SERVICE.ELEMENT),
                },
                {
                    path: (ROUTES.COOKIE_POLICY.PATH),
                    element: (ROUTES.COOKIE_POLICY.ELEMENT),
                },
                {
                    path: (ROUTES.STRIPE_TERMS_CONDITION.PATH),
                    element: (ROUTES.STRIPE_TERMS_CONDITION.ELEMENT),
                },
            ],
        },
        {
            path: (ROUTES.DASHBOARD.PATH),
            element: (ROUTES.DASHBOARD.ELEMENT),
        },
        {
            path: (ROUTES.SALES_FUNNEL.PATH),
            element: (ROUTES.SALES_FUNNEL.ELEMENT),
        },
        {
            path: (ROUTES.THANKYOU.PATH),
            element: (ROUTES.THANKYOU.ELEMENT),
        },
        {
            path: (ROUTES.DYNAMIC_CONTACT.PATH),
            element: (ROUTES.DYNAMIC_CONTACT.ELEMENT),
        },
    ])

export default routes;