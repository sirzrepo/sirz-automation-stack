import { startSmallImg } from "../assets";

interface Idata {
    title?: string,
    classNames?: string
}

export default function HeaderFormat({title, classNames}: Idata) {
    return (
        <section className={`flex items-center gap-3 ${classNames}`}>
            <img src={startSmallImg} alt="" />
            <div className={`text-[20px] font-semibold`}>{title}</div>
        </section>
    )
}