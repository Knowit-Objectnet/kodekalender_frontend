import { compact, map, sortBy, values } from "lodash-es"
import { FC } from "react"

import { useChallenges } from "../../api/admin/requests"

type DoorSelectProps = {
  door: number
  setDoor: (door: number) => void
}

const DoorSelect: FC<DoorSelectProps> = ({ door, setDoor }) => {
  const { data: challenges } = useChallenges()

  if (!challenges) return null

  return (
    <label className="block space-x-8">
      <select
        className="form-select text-black"
        defaultValue={door}
        onChange={(e) => setDoor(parseInt(e.target.value))}
      >
        {map(sortBy(compact(values(challenges)), "door"), ({ door, title }, i) => (
          <option
            key={i}
            value={door}
            label={`Luke ${door}: ${title}`}
          >{`Luke ${door}: ${title}`}</option>
        ))}
      </select>
    </label>
  )
}

export default DoorSelect
