import { DetailedHTMLProps, forwardRef, InputHTMLAttributes, PropsWithChildren } from "react"

import { cl } from "../../utils"


export type FormInputElementProps = Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "ref">

export const FormInputElement = forwardRef<HTMLInputElement, PropsWithChildren<FormInputElementProps>>(
  ({ id, disabled, className, children, type, ...inputProps }, ref) => (
    <input
      id={id}
      ref={ref}
      className={cl(
        `
          form-input

          block
          w-full

          border-2
          border-purple-500
          rounded-xl

          bg-transparent

          placeholder:text-purple-400
          placeholder:font-light
        `,
        disabled && "border-gray/30",
        className
      )}
      disabled={disabled}
      type={type}
      {...inputProps}
    >
      {children}
    </input>
  )
)

export default FormInputElement
