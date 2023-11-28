import { DetailedHTMLProps, LabelHTMLAttributes } from "react"

import { FCWithChildren } from "../../../types/utils_types"
import { cl } from "../../utils"

import NoteElements from "./NoteElements"

type FormElementCustomProps = DetailedHTMLProps<
  LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
> & {
  required?: boolean
  label: string
  note?: string
  noteDirection?: "right" | "bottom"
  disabled?: boolean
  inputWrapperClassName?: string
}

const FormElementCustom: FCWithChildren<FormElementCustomProps> = ({
  required = false,
  label,
  note,
  noteDirection = "right",
  disabled,
  className,
  children,
  inputWrapperClassName,
  ...labelProps
}) => {
  // Adjust grid to allow for extra row if note is to be placed on the bottom of
  // the label.
  const gridClasses =
    noteDirection === "right"
      ? "grid-flow-row grid-cols-[auto_auto_1fr]"
      : "grid-flow-row grid-cols-[auto_auto]"

  const inputWrapperClasses =
    noteDirection === "right" ? "col-span-3" : "col-span-2"

  return (
    <div className={`grid self-stretch ${gridClasses} gap-x-4 gap-y-3`}>
      <label
        className={cl("font-bold", disabled && "text-gray/30", className)}
        {...labelProps}
      >
        {required && <span className="font-bold text-red-700">* </span>}
        {label}
      </label>

      {note && <NoteElements note={note} />}

      <div className={cl(inputWrapperClasses, inputWrapperClassName)}>
        {children}
      </div>
    </div>
  )
}

export default FormElementCustom
