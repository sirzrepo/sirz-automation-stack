import CreateContentForm from "../../../components/createContentForm";
import { CreateContentImg } from "../../../assets";


export default function CreateToday() {
  return (
    <div className="grid md:grid-cols-2 md:w-[80%] w-[95%] mx-auto gap-8">
      <CreateContentForm />
      <div className="flex items-center justify-center">
      <img src={CreateContentImg} alt="" className=" object-cover  w-full" />
      </div>
    </div>
  )
}
