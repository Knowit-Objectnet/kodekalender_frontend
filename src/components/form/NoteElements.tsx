import { FC } from "react"

import Icon from "../Icons/Icon"
import useBooleanToggle from "../../hooks/useBooleanToggle"
import { cl } from "../../utils"


type NoteElementsProps = {
  note: string
  iconClassName?: string
}

const NoteElements: FC<NoteElementsProps> = ({ note, iconClassName }) => {
  const [showNote, toggleShowNote] = useBooleanToggle()


  return (<>
    <Icon name="info" className={cl("hover:cursor-pointer", iconClassName)} onClick={toggleShowNote} />
    {showNote && (<p className="font-light">{note}</p>)}
  </>)
}

export default NoteElements
