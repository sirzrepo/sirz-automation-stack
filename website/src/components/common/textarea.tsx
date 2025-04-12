import { RequiredIcon } from "../../assets/icons/svg"
import { ITestAreaProps } from "../../constants/types"

export default function TextArea(props: ITestAreaProps) {
    const { label, onChange, name, placeholder, required, value } = props
    return (
        <div>
            <label htmlFor="message" className=" text-gray-700 dark:text-gray-100 flex items-center gap-1">
                {label}
                {required && <RequiredIcon />}
            </label>
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                className="w-full p-3 border border-gray-300 bg-[#F4F4F5] dark:bg-background_dark rounded-lg focus:outline-none focus:ring-1 dark:focus:ring-secondary focus:border-none focus:ring-primary"
                placeholder={placeholder}
                rows={4}
                required={required}
            />
        </div>
    )
}