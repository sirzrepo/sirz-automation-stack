import { ChevronLeft, ChevronRight } from "lucide-react";
import { IoIosArrowBack } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import Button from "../../components/common/button";
import { ProjectIcon } from "../../assets";
import { useState } from "react";
import CourseForm from "../../components/Forms/CourseForm";


export default function IntroductoryCourses() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section>
      <div className="">
        <div className='px-4 py-2 flex gap-2 items-center rounded-lg border-2 w-fit max-w-full mb-6'>
          <IoSearch className='text-xl text-[#e6e9ee]' />
          <input type="text" name="" id="" placeholder='Search...' className='border-0 outline-none bg-none' />
        </div>

        <div className="w-full bg-[#FAFAFA] flex justify-center items-center py-12 rounded-sm relative">
          {/* === Black Transparent Overlay (Full Screen Cover) === */}
          {isOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-50"
              onClick={() => setIsOpen(false)} // Clicking outside closes modal
            ></div>
          )}

          <section>
            <div className="mb-6 flex justify-center items-center">
              <img src={ProjectIcon} alt="Project Icon" />
            </div>
            <p className="text-lg mb-10">No course has been added yet</p>

            <div className='flex justify-center items-center'>
              <Button text='+ Add new document' onClick={() => setIsOpen(true)} className='text-[15px] hover:bg-blue-600' />
            </div>
          </section>

          {/* === Modal (Slides from Right) === */}
          <div className={`fixed top-0 right-0 h-full w-[90%] sm:w-[500px] bg-white shadow-lg transition-transform duration-300 z-[60] ${isOpen ? "translate-x-0" : "translate-x-full"
            }`} >

            <div className='bg-[#FAFAFA] px-1 py-2 flex items-center h-[10%] gap-2'>
              <h2><IoIosArrowBack className='text-2xl font-bold cursor-pointer hover:bg-gray-100 rounded' onClick={() => setIsOpen(false)} /></h2>
              <h2 className="text-xl font-medium">Create new project idea</h2>
            </div>

            <section className='p-6 h-[80%] overflow-y-scroll hideScrollBar'>

              {/* Example Form */}

              <CourseForm />
            </section>

            <div className='flex justify-end items-center h-[10%] gap-2 bg-[#FAFAFA]'>
              <button
                onClick={() => setIsOpen(false)}
                className="text-md w-fit bg-white text-black px-4 py-2 rounded-sm hover:bg-slate-100 border border-colorBlueDeep transition "
              >
                Cancel
              </button>

              <button
                onClick={() => setIsOpen(false)}
                type='submit'
                className="text-md w-fit bg-colorBlueDeep text-white px-4 py-2 rounded-sm hover:bg-blue-600 transition "
              >
                Create Project
              </button>
            </div>

          </div>
        </div>

        <div className='sm:flex justify-between items-center mt-6 grid grid-cols-1'>
          <section>
            <div className="flex items-center gap-1 justify-center mt-3 sm:justify-normal sm:mt-0">
              <button
                // variant="outline"
                // size="icon"
                className="border-black border p-1 text-black text-xl font-bold"
              >
                <ChevronLeft className="" />
              </button>
              <button
                // variant="default"
                // size="icon"
                className="rounded-full 
                                                      bg-mainGreen hover:bg-mainGreen size-8 flex justify-center items-center">
                1
              </button>
              <button
                // variant="outline"
                // size="icon"
                className="rounded-full size-8 flex justify-center items-center"
              >
                2
              </button>
              <button
                // variant="outline"
                // size="icon"
                className="rounded-full size-8 flex justify-center items-center"
              >
                3
              </button>
              <button
                // variant="outline"
                // size="icon"
                className="rounded-full size-8 flex justify-center items-center"
              >
                4
              </button>
              <button
                // variant="outline"
                // size="icon"
                className="rounded-full size-8 flex justify-center items-center"
              >
                5
              </button>
              <button
                // variant="outline"
                // size="icon"
                className="border-black border p-1 text-black text-xl font-bold"
              >
                <ChevronRight className="" />
              </button>
            </div>
          </section>

          <section className='flex gap-2 items-center justify-center mt-3 sm:justify-normal sm:mt-0'>
            <label htmlFor="">Show :</label>
            <select name="" id="" className='border w-14 py-1'>
              <option value="">-</option>
            </select>
          </section>
        </div>
        
      </div>
    </section>
  )
}