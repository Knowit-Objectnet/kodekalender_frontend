import { DetailedHTMLProps, LabelHTMLAttributes } from "react"

import { FCWithChildren } from "../../../types/utils_types"
import { cl } from "../../utils"


type FormElementCustomProps = DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> & {
  label: string
  note?: string
  disabled?: boolean
}

const FormElementCustom: FCWithChildren<FormElementCustomProps> = ({ label, note, disabled, className, children, ...labelProps }) => (
  <label className={cl("block space-y-2", disabled && "text-gray/30", className)} {...labelProps}>
    <span className="text-lg font-medium">
      {label}
      {note && <>&emsp;<em className={cl(disabled ? "text-opacity-20" : "text-opacity-60", "text-gray text-base font-normal")}>{note}</em></>}
    </span>

    {children}
  </label>
)

export default FormElementCustom
