import { isNil } from "lodash-es"
import { FC } from "react"
import { useController, useFormContext } from "react-hook-form"

import { cl } from "../../utils"


const NAME = "opt_in_marketing" as const
const CHECKBOX_CLASSES = cl(`
  form-checkbox
  mr-4

  bg-transparent

  hover:!bg-purple-900
  hover:ring
  hover:ring-purple-500

  focus:!bg-purple-300

  checked:bg-purple-500

  rounded-md
  w-8
  h-8
`)

const SET_VALUE_OPTS = { shouldDirty: true, shouldTouch: true, shouldValidate: true } as const

type OptInMarketingCheckboxesProps = {
  id: string
  className?: string
  required?: boolean
}

const OptInMarketingCheckboxes: FC<OptInMarketingCheckboxesProps> = ({ id, required = false, className }) => {
  const { setValue, control } = useFormContext<{ opt_in_marketing?: boolean }>()

  const { field: { value } } = useController({ control, name: NAME, rules: { validate: (value) => isNil(value) ? "Påkrevd" : true } })

  return (
    <div
      className={cl(
        `
          flex
          gap-10
          group-[.error]:border-red-700
          group-[.error]:border-2
          group-[.error]:text-red-700
          group-[.error]:px-6
          group-[.error]:py-1
          group-[.error]:rounded-xl
        `,
        className
      )}
    >
      <label>
        <input
          aria-hidden="true"
          type="checkbox"
          name={NAME}
          className={CHECKBOX_CLASSES}
          checked={value === true}
          onChange={() => setValue(NAME, true, SET_VALUE_OPTS)}
        />

        Ja
      </label>

      <label>
        <input
          aria-hidden="true"
          type="checkbox"
          name={NAME}
          className={CHECKBOX_CLASSES}
          checked={value === false}
          onChange={() => setValue(NAME, false, SET_VALUE_OPTS)}
        />

        Nei
      </label>

      {/* Hidden checkbox for label target and accessibility */}
      <input
        required={required}
        type="checkbox"
        id={id}
        className="hidden"
        checked={value === true}
        onChange={() => setValue(NAME, !value, SET_VALUE_OPTS)}
      />
    </div>
  )
}

export default OptInMarketingCheckboxes
