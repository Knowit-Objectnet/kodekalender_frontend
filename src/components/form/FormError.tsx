import { FieldError } from "react-hook-form"


const FormError = ({ error }: { error: FieldError | undefined }) => {
  if (!error)
    return null

  const message =
    error.type == "required"
      ? "Påkrevd"
      : error.message

  return (
    <div>
      <span className="text-sm text-red-700">{message}</span>
    </div>
  )
}

export default FormError
