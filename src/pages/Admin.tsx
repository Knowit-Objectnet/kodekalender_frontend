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
    <Page className="py-12 px-8 md:px-12 mx-4 md:mx-8 bg-purple-700 rounded-md space-y-8">
      <AdminHeader />

      <Routes>
        <Route path="/admin/doors" element={<Doors />} />
        <Route path="/admin/doors/new" element={<NewDoor />} />
        <Route path="/admin/doors/:door/edit" element={<EditDoor />} />

        <Route path="/admin/service_messages" element={<ServiceMessages />} />
        <Route path="/admin/service_messages/new" element={<NewServiceMessage />} />
        <Route path="/admin/service_messages/:uuid/edit" element={<EditServiceMessage />} />

        <Route element={<Navigate to="/admin/doors" />} />
      </Routes>
    </Page>
  )
}

export default Admin
