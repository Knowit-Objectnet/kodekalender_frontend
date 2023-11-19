import clsx from "clsx"
import { DetailedHTMLProps, forwardRef, InputHTMLAttributes, PropsWithChildren } from "react"

import FormElementCustom from "./FormElementCustom"


type FormElementProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  label: string
  note?: string
  disabled?: boolean
  labelClassName?: string
}

const FormElement = forwardRef<HTMLInputElement, PropsWithChildren<FormElementProps>>(
  ({ label, note, disabled, className, labelClassName, children, type, ...inputProps }, ref) => (
    <FormElementCustom label={label} note={note} disabled={disabled} className={labelClassName}>
      <input
        ref={ref}
        className={
          clsx(
            "block",
            type === "checkbox" ? "form-checkbox" : "form-input",
            disabled && "border-gray-500/30",
            className
          )
        }
        disabled={disabled}
        type={type}
        {...inputProps}
      >
        {children}
      </input>
    </FormElementCustom>
  )
)

export default FormElement
