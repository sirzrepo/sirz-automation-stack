import { IoAddCircleSharp } from "react-icons/io5";
import { IPlainCard } from "../../../constants/types";


export default function PlainCard({ classNames, title, description, icon }: IPlainCard) {
    return (
        <div className={`${classNames ? classNames : "border bg-white dark:bg-colorDark text-[#828282]"} ps-12 pr-4 py-6 rounded-xl`}>
            {
                title && (
                    <header className=" dark:text-white text-black pb-2 font-bold">{title}</header>
                )
            }
            <section className="flex items-center gap-2">
                {
                    icon && (
                        <IoAddCircleSharp />
                    )
                }
                <div>{description}</div>
            </section>
        </div>
    )
}