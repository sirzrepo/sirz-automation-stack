import { Outlet } from "react-router-dom";
import NavBar from "./nav";
import Footer from "./footer";
import ScrollToTop from "../../features/scrollToTop";

export default function Layout() {
    return (
        <div className="">
            <NavBar />
            <div className="pt-16">
                <ScrollToTop />
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}