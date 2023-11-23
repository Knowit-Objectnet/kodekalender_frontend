import { FC, useId } from "react"
import { useFormContext } from "react-hook-form"

import { SignUpParameters } from "../../api/users/requests"
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

const SET_VALUE_OPTS = { shouldDirty: true, shouldTouch: true } as const

type OptInMarketingCheckboxesProps = { id: string }

const OptInMarketingCheckboxes: FC<OptInMarketingCheckboxesProps> = ({ id }) => {
  const { setValue, getValues } = useFormContext<SignUpParameters>()

  const value = getValues("opt_in_marketing")

  return (
    <div className="flex gap-10">
      <label>
        <input
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
          type="checkbox"
          name={NAME}
          className={CHECKBOX_CLASSES}
          checked={value === false}
          onChange={() => setValue(NAME, false, SET_VALUE_OPTS)}
        />

        Nei
      </label>

      {/* Hidden checkbox for label target and accessibility */}
      <input type="checkbox" id={id} className="hidden" checked={value === true} onChange={() => setValue(NAME, !value, SET_VALUE_OPTS)} />
    </div>
  )
}

export default OptInMarketingCheckboxes
