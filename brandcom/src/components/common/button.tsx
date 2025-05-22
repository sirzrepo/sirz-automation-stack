// import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { BUTTON_LINKS } from "../../utils";


export default function Button({ text, className, color }: {
  text: string;
  className?: string;
  color?: boolean
}) {

  const navigate = useNavigate();

  const handleClick = () => {
    const path = BUTTON_LINKS[text];
    if (path) {
      navigate(path);
    } else {
      console.warn(`No path mapped for button text: "${text}"`);
    }
  };
  return (
    <button 
      onClick={handleClick}
      className={`${ color ? "bg-white text-primary-500" : "bg-primary-500 text-white"} ${className} border py-3 border-primary-500 floating-button px-8 rounded-md text-sm font-semibold`}
    >
      {text}
    </button>
  )
}
