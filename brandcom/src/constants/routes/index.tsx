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
                    path: (ROUTES.WELCOME.PATH),
                    element: ( user.name === "admin" ? ROUTES.WELCOME.ELEMENT : ROUTES.HOME.ELEMENT),
                },
                {
                    path: (ROUTES.HOME.PATH),
                    element: (ROUTES.HOME.ELEMENT),
                },
                {
                    path: (ROUTES.CONTACT.PATH),
                    element: (ROUTES.CONTACT.ELEMENT),
                },
                {
                    path: (ROUTES.ECOMMERCE.PATH),
                    element: (ROUTES.ECOMMERCE.ELEMENT),
                },
                {
                    path: (ROUTES.DIGITAL_MARKETING.PATH),
                    element: (ROUTES.DIGITAL_MARKETING.ELEMENT),
                },
                {
                    path: (ROUTES.BRANDING.PATH),
                    element: (ROUTES.BRANDING.ELEMENT),
                },
                {
                    path: (ROUTES.SERVICES.PATH),
                    element: (ROUTES.SERVICES.ELEMENT),
                },
                
            ],
        },
    ])

export default routes;