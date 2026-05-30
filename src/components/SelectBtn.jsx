//This file is a reusable dropdown (select) component.


import React, {useId} from 'react'

const SelectBtn = ({
    options,
    label,
    className='',
    ...props
}, ref) => {

    const id = useId()
  return (
    <div className="w-full">
        {label && <label htmlFor={id} className="" ></label>}
        <select 
        {...props}
        id={id}
        ref={ref}
        className={`${className}`}
        >
            {options?.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}

//Notice here, we have used React.forwardRef in export.
//while previously in input.jsx file we had used React.forwardRef() in function defination, 
//But here we did not defined forwardref at start. so these are the two different ways we can use forwardRef.

export default React.forwardRef(SelectBtn)