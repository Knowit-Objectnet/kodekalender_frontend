import { forwardRef, PropsWithChildren, useId } from "react"

import FormElementCustom from "./FormElementCustom"
import FormInputElement, { FormInputElementProps } from "./FormInputElement"


type FormElementProps = FormInputElementProps & {
  label: string
  note?: string
  disabled?: boolean
  labelClassName?: string
}

const FormElement = forwardRef<HTMLInputElement, PropsWithChildren<FormElementProps>>(
  ({ label, note, labelClassName, disabled, children, ...inputProps }, ref) => {
    const id = useId()

    return (
      <FormElementCustom
        htmlFor={id}
        label={label}
        note={note}
        disabled={disabled}
        className={labelClassName}
      >
        <FormInputElement
          id={id}
          ref={ref}
          disabled={disabled}
          {...inputProps}
        >
          {children}
        </FormInputElement>
      </FormElementCustom>
    )
  }
)

export default FormElement
