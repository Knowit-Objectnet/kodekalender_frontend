import clsx from "clsx"
import { DetailedHTMLProps, forwardRef, InputHTMLAttributes, PropsWithChildren } from "react"
import { UseFormSetValue } from "react-hook-form"

import { SignUpParameters } from "../../api/users/requests"


type FormElementProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  label: string
  note?: string
  disabled?: boolean
  labelClassName?: string
  val?: boolean
  setValue: UseFormSetValue<SignUpParameters>
}

const FormCustomCheckbox = forwardRef<HTMLInputElement, PropsWithChildren<FormElementProps>>(
  ({ label, note, disabled, className, labelClassName, val, setValue, ...inputProps }, ref) => {

    const yesOnClick = () => {
      setValue("opt_in_marketing", true)
    }

    const noOnClick = () => {
      setValue("opt_in_marketing", false)
    }

    //TODO: make it required somehow...
    return (
      <div>
        <span className={clsx("text-lg font-medium", labelClassName)}>
          {label}
          {note && <>&emsp;<em className={clsx(disabled ? "text-opacity-20" : "text-opacity-60", "text-gray-700 text-base font-normal")}>{note}</em></>}
        </span>
        <br />
        <label>
          Ja
          <input
            ref={ref}
            checked={val === true}
            className={clsx("form-checkbox ml-1", className)}
            type="checkbox"
            name="opt-in-yes"
            onClick={() => yesOnClick()}
            {...inputProps}
          />
        </label>
        <label className="ml-2">
          Nei
          <input
            ref={ref}
            checked={val === false}
            className={clsx("form-checkbox ml-1", className)}
            type="checkbox"
            name="opt-in-no"
            onClick={() => noOnClick()}
            {...inputProps}
          />
        </label>
      </div>
    )
  }
)

export default FormCustomCheckbox
