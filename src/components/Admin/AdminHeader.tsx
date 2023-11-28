import { FC } from "react"
import { Link } from "react-router-dom"

import Button from "../Button"

const AdminHeader: FC = () => (
  <header className="space-x-32">
    <span className="space-x-16">
      <Link to="/admin/doors">
        <Button content="Luker" />
      </Link>
      <Link to="/admin/doors/new">
        <Button>Ny luke</Button>
      </Link>
    </span>

    <span className="space-x-16">
      <Link to="/admin/service_messages">
        <Button content="Driftsmeldinger" />
      </Link>
      <Link to="/admin/service_messages/new">
        <Button>Ny driftsmelding</Button>
      </Link>
    </span>
  </header>
)

export default AdminHeader
