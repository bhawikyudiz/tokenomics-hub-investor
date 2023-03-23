// import { FieldProps } from "formik";
import React from 'react'

const FormNormalSelect = ({ field, form, options, placeholder }) => {
  function onChange(e) {
    // let data = Array.from(props.data);
    form.setFieldValue(field.name, e.target.value)
  }

  return (
    <select
      className="h-[80px] w-[120px] rounded-[8px] border-[1px] border-gray-300 bg-[#f9fafb] text-[12px] font-normal "
      name={field.name}
      id={field.id}
      value={field.value}
      onChange={onChange}
    >
      {options.map((option) => (
        <option key={option?.id} value={option?.name}>
          {option?.name}
        </option>
      ))}
    </select>
  )
}

export default FormNormalSelect
