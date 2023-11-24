import { FC } from "react"

import Button, { ButtonProps } from "./Button"



const SubmitButton: FC<ButtonProps> = ({ ...rest }) => (
  <Button primary formNoValidate type="submit" {...rest} />
)

export default SubmitButton
