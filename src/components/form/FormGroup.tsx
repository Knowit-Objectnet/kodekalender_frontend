import { FC, PropsWithChildren } from "react"
import { FieldError } from "react-hook-form"

import { Maybe } from "../../../types/utils_types"
import { cl } from "../../utils"

import FormError from "./FormError"


type FormGroupProps = {
  error: Maybe<FieldError>
  dirty?: boolean
  className?: string
}

const FormGroup: FC<PropsWithChildren<FormGroupProps>> = ({ error, dirty, className, children }) => (
  <div className={cl("group", { error, dirty }, className)}>
    {children}
    <FormError error={error} />
  </div>
)

export default FormGroup
