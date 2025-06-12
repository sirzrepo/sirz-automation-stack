import { ChatbotVideo } from "../../../assets";

export default function Video() {
    return (
        <div className=" sm:w-[80%] w-[95%] mx-auto py-24">
            <video src={ChatbotVideo} autoPlay loop muted className="w-full h-full object-cover sm:rounded-xl rounded-md" />
        </div>
    )
}