import { IoClose } from "react-icons/io5";

interface ModalProps {
    isOpen: boolean;
    title: string;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    text: string;
    onClick: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, setIsOpen, text, onClick, title }) => {
    if (!isOpen) return null;
    return (
        <div>
            {
                isOpen && (
                    <div className="fixed z-50 top-0 left-0 bottom-0 right-0 bg-[#000000b4] flex items-end justify-center">
                        <div className=" bg-[#f5f5f5] rounded-2xl relative sm:w-[30%] w-[95%] sm:m-auto mb-7">
                            <header className="bg-[#f5f5f5]  shadow-2xl h-12 flex items-center justify-between rounded-t-2xl px-4 font-comfortaa font-extrabold">
                                <h1 className=" text-primary"> {title} </h1>
                                <IoClose
                                    onClick={() => setIsOpen(false)}
                                    className="text-[25px] cursor-pointer hover:text-red-500"
                                />
                            </header>
                            <div className="w-[90%] m-auto ps-3 pt-3">
                                {text}
                            </div>
                            <div className=" float-right mb-4 mr-4 mt-4">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="bg-zinc-200 hover:bg-zinc-300 ms-2 px-4 text-sm py-2 rounded-md font-comfortaa font-bold"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={onClick}
                                    className="bg-orange-500 hover:bg-orange-600 text-white ms-2 px-4 text-sm py-2 rounded-md font-comfortaa font-bold"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
};

export default Modal;