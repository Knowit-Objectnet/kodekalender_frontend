import { FC, useLayoutEffect } from "react"
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"

import { useWhoami } from "../api/users/requests"
import AdminHeader from "../components/Admin/AdminHeader"

import Doors from "./admin/Doors"
import EditDoor from "./admin/EditDoor"
import EditServiceMessage from "./admin/EditServiceMessage"
import NewDoor from "./admin/NewDoor"
import NewServiceMessage from "./admin/NewServiceMessage"
import ServiceMessages from "./admin/ServiceMessages"
import Page from "./Page"


// TODO: Deleted posts? User list? Ban users?
const Admin: FC = () => {
  const navigate = useNavigate()

  const { data: whoami, isLoading } = useWhoami()

  useLayoutEffect(() => {
    // Limit access to admin pages. User can still perform admin actions
    // programmatically, but they will be rejected by backend.
    if (!isLoading && (!whoami || !whoami.is_admin))
      navigate("/")
  }, [isLoading, whoami, navigate])

  if (!isLoading && (!whoami || !whoami.is_admin))
    return null

  return (
    <Page className="py-24 px-16 md:px-24 mx-8 md:mx-16 bg-purple-700 rounded-md space-y-16">
      <AdminHeader />

      <Routes>
        <Route path="doors" element={<Doors />} />
        <Route path="doors/new" element={<NewDoor />} />
        <Route path="doors/:door/edit" element={<EditDoor />} />

        <Route path="service_messages" element={<ServiceMessages />} />
        <Route path="service_messages/new" element={<NewServiceMessage />} />
        <Route path="service_messages/:uuid/edit" element={<EditServiceMessage />} />

        <Route element={<Navigate to="doors" />} />
      </Routes>
    </Page>
  )
}

export default Admin
