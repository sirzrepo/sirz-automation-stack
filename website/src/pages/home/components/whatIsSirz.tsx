import { WhatIsSirzImg } from "../../../assets";
import DemoSteps from "./demoSteps";
import { setGetStarted, setShowScheduleDemoModal } from "../../../features/reduxSlice";
import { useAppDispatch } from "../../../app/hook";
import ScheduleDemoForm from "../../../components/layout/scheduleDemoForm";

export default function WhatIsSirz() {
    const dispatch = useAppDispatch()
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 mx-6 gap-10 sm:max-w-7xl w-[90%] mx-auto">
           <div>
            <img 
                className=" object-cover"
                src={WhatIsSirzImg} 
                alt="What is Sirz?" 
            />
           </div>
           <div>
                <h2 className="text-5xl font-bold mb-4">What is Sirz?</h2>
                <section className="py-8">
                    <div className="sm:text-2xl text-xl">
                        Sirz is a digital marketing automation software  for E-commerce brand. Sirz AI powered platform   consist of a 3 layer growth and automation ecosystem.
                    </div>
                    <div className="text-2xl mt-4">
                        Get a demo to learn more about our premium automation products. 
                    </div>
                </section>
                <section className="py-4 space-x-4">
                    <button onClick={() => {dispatch(setShowScheduleDemoModal(true))}} className="bg-blue-600 text-white px-8 py-4 rounded-full">Schedule a Demo</button>
                    <button onClick={() => {dispatch(setGetStarted(true))}} className="bg-white border border-blue-600 text-black px-8 py-4 rounded-full">Get started</button>
                </section>
                <DemoSteps />
                <ScheduleDemoForm />
           </div>
        </div>
    );
}