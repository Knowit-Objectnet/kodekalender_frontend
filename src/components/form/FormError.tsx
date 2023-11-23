import { FieldError } from "react-hook-form"


const FormError = ({ error }: { error: FieldError | undefined }) => (
  error
    ? (
      <div>
        <strong className="text-red-700">{error.message}</strong>
      </div>
      )
    : null
)

export default FormError
