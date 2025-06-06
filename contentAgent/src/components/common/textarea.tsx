import { ITextareaProps } from "../../types"


export default function TextArea(props: ITextareaProps) {
    const { title, onChange, name, placeholder, required, value, classname, rows } = props
    return (
        <div>
            <label htmlFor="" className='flex justify-between items-center'>
                        <h2 className='font-bold'>{title}</h2>
                        {/* <p className='text-sm'>Required</p> */}
                    </label>
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                className={ classname ? classname : "w-full p-2 border-[1.4px] rounded-md mb-4"}
                placeholder={placeholder}
                rows={rows}
                required={required}
            />
        </div>
    )
}