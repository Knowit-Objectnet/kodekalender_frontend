import { DetailedHTMLProps, forwardRef, InputHTMLAttributes, PropsWithChildren } from "react"

import { cl } from "../../utils"

import FormElementCustom from "./FormElementCustom"


type FormElementProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  label: string
  note?: string
  disabled?: boolean
  labelClassName?: string
}

const FormElement = forwardRef<HTMLInputElement, PropsWithChildren<FormElementProps>>(
  ({ label, note, disabled, className, labelClassName, children, ...inputProps }, ref) => (
    <FormElementCustom label={label} note={note} disabled={disabled} className={labelClassName}>
      <input
        ref={ref}
        className={cl("block form-input", disabled && "border-gray/30", className)}
        disabled={disabled}
        {...inputProps}
      >
        {children}
      </input>
    </FormElementCustom>
  )
)

export default FormElement
