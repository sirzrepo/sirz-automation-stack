import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes/desc";
import { scrollToElement } from "../../../utils";

interface IbuttonTemplate {
    firstBtnTxt?: string | null;
    secondBtnTxt?: string | null;
    firstBtnLink?: string | null;
    secondBtnLink?: string | null;
    notSecondBtn?: boolean;
    classname?: string
}

export default function ButtonTemplate({
    firstBtnTxt,
    secondBtnTxt,
    // firstBtnLink,
    // secondBtnLink,
    notSecondBtn,
    classname

}: IbuttonTemplate) {
    const navigate = useNavigate();

    return(
        <div className={`grid ${!notSecondBtn ? "grid-cols-2" : "grid-cols-1"} gap-6 ${classname}  whitespace-nowrap mx-auto`}>
        <button 
            onClick={() => {firstBtnTxt ? navigate(ROUTES.CONTACT.PATH) : scrollToElement('agent-section')}}
            className={`bg-primary-500 text-white  w-fullborder py-4 border-primary-500 floating-button rounded-md text-sm font-semibold`}
            >
            {firstBtnTxt ? firstBtnTxt : "Get Demo"}
        </button>

        {!notSecondBtn && <button 
            onClick={() => navigate(ROUTES.CONTACT.PATH)}
            className={`bg-white text-primary-500  w-full border py-4 border-primary-500 floating-button px-8 rounded-md text-sm font-semibold`}
            >
            {secondBtnTxt ? secondBtnTxt : "Get Started Free"}
        </button>}
        </div>
    )
}