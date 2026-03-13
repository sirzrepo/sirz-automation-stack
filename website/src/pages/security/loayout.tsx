import { Outlet } from "react-router-dom";
// import ScrollToTop from "../../features/scrollToTop";

export default function SecurityLayout() {
    return (
        <div className="">
            <div className="pt-16">
                {/* <ScrollToTop /> */}
                <Outlet />
            </div>
        </div>
    )
}