import { Outlet } from "react-router-dom";
// import ScrollToTop from "../../features/scrollToTop";

export default function SecurityLayout() {
    return (
        <div className="">
            <div className="">
                <div className="">
                {/* <ScrollToTop /> */}
                <Outlet />
                </div>
            </div>
        </div>
    )
}