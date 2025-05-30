import { IButtonCard } from "../../../constants/types";
import Button from "../../common/button";
import HeaderFormat from "../../header";

export default function ButtonCard({ text, text2, buttonText, title, onClick }: IButtonCard) {
    return (
        <div className="bg-colorNeutra dark:bg-colorDark py-10 px-5 rounded-3xl ">
            <HeaderFormat title={title} />
            <div className="py-6 text-[20px] text-left">
                {text}
            </div>
            {
                text2 && (
                    <div className="py-2 text-[20px] text-left">
                        {text2}
                    </div>
                )
            }
            <div className="w-[80%] m-auto pt-6">
                <Button text={buttonText} onClick={onClick} />
            </div>
        </div>
    )
}