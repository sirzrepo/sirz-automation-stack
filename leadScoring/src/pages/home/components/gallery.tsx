import { GalleryImg } from "../../../assets";

export default function Gallery() {
    return (
        <div className=" flex items-center justify-center pb-16 mt-16">
            <img src={GalleryImg} alt="" className="object-cover sm:w-[80%] w-[95%]" />
        </div>
    )
}