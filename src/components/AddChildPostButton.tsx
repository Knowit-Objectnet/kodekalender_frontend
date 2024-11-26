import { FC } from "react"
import { FaCommentMedical } from "react-icons/fa"

type AddChildPostButtonProps = {
  toggleShowForm: () => void
}

const AddChildPostButton: FC<AddChildPostButtonProps> = ({ toggleShowForm }) => (
  // TODO: Hover style
  <button className="space-x-4" onClick={toggleShowForm}>
    <span>Legg til svar</span>
    <FaCommentMedical className="inline-block" />
  </button>
)

export default AddChildPostButton
