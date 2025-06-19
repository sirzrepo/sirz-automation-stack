import { StunningImg } from "../../../assets";

export default function Stunning() {
    return (
        <div className="flex flex-col items-center justify-center px-4 my-20">
            <div className="text-center">
                <h1 className="text-3xl md:text-5xl text-[#001f3e] lg:text-6xl font-bold text-center max-w-3xl mb-6">
                Start Strong with a Stunning Landing Page
                </h1>

                <p className="text-gray-500 text-center font-semibold max-w-5xl text-xl">
                    Let Sirz handle the hard part so you can focus on what matters—your business.
                </p>
            </div>
            <div className=" flex items-center justify-center pb-16 mt-16">
                <img src={StunningImg} alt="" className="object-cover" />
            </div>
        </div>
    )
}