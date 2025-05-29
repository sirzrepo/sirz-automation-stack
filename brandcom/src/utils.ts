import moment from "moment";

export const BASE_URL = `https://sirz-xfqp.onrender.com`;
// export const BASE_URL = `http://localhost:5000`;

export const formatDate = (date: string) => {
    const formattedDate = moment(date).format('MMMM D, YYYY');
    return formattedDate
}

export const formatDateTime = (date: string) => {
    const formattedDate = moment(date).format('ddd MMM D YYYY, HH:mm:ss');
    return formattedDate
};

export const socialLinks = {
    Facebook: "https://www.facebook.com/share/15JPa4mdat/",
    Instagram: "https://www.instagram.com/sirz_official",
    Whatsapp: ``,
    TikTok: "",
    Linkedin: "https://www.linkedin.com/company/sanz-innovation-retro/"
};

export const calendyLink = `https://calendly.com/sirz-support/15-minutes-business-solutions-consult`



// buttonLinks.ts
export const BUTTON_LINKS: Record<string, string> = {
    "Get Started": "/signup",
    "Get Demo": '/contact',
    "Learn More": "/learn-more",
    "Contact Us": "/contact",
    "Start Free Trial": "/free-trial",
  };