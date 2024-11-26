import { FC } from "react"

import { LinkButton } from "../LinkButton"

const AdminHeader: FC = () => (
  <header className="my-16 w-11/12 place-self-center">
    <div className="flex flex-wrap justify-between gap-8 rounded-md bg-purple-300 p-2">
      <LinkButton to="/admin/doors" content="Luker" className="rounded-md" />
      <LinkButton to="/admin/doors/new" content="Ny luke" className="rounded-md" />
      <LinkButton to="/admin/service_messages" content="Driftsmeldinger" className="rounded-md" />
      <LinkButton
        to="/admin/service_messages/new"
        content="Ny driftsmelding"
        className="rounded-md"
      />
    </div>
  </header>
)

export default AdminHeader
