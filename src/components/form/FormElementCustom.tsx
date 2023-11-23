import { DetailedHTMLProps, LabelHTMLAttributes } from "react"

import { FCWithChildren } from "../../../types/utils_types"
import { cl } from "../../utils"

import NoteElements from "./NoteElements"


type FormElementCustomProps = DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> & {
  label: string
  note?: string
  noteDirection?: "right" | "bottom"
  disabled?: boolean
}

const FormElementCustom: FCWithChildren<FormElementCustomProps> = ({ label, note, noteDirection = "right", disabled, className, children, ...labelProps }) => {
  const gridClasses = noteDirection === "right"
    ? "grid-rows-[auto_auto] grid-cols-[auto_auto_1fr]"
    : "grid-rows-[auto_auto_auto] grid-cols-[auto_auto]"

  const inputWrapperClasses = noteDirection === "right"
    ? "col-span-3"
    : "col-span-2"

  return (
    <div className={`self-stretch grid ${gridClasses} gap-x-4 gap-y-3`}>
      <label
        className={cl(
          "font-bold",
          disabled && "text-gray/30",
          className
        )}
        {...labelProps}
      >
        {label}
      </label>

      {note && <NoteElements note={note} />}

      <div className={inputWrapperClasses}>
        {children}
      </div>
    </div>
  )
}

export default FormElementCustom
