import { includes } from "lodash-es"
import { FC, useLayoutEffect, useMemo } from "react"
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom"

import { useWhoami } from "../api/users/requests"
import AdminHeader from "../components/Admin/AdminHeader"

import Doors from "./admin/Doors"
import EditDoor from "./admin/EditDoor"
import EditServiceMessage from "./admin/EditServiceMessage"
import NewDoor from "./admin/NewDoor"
import NewServiceMessage from "./admin/NewServiceMessage"
import ServiceMessages from "./admin/ServiceMessages"
import BasicPage from "./BasicPage"

// TODO: Deleted posts? User list? Ban users?
const Admin: FC = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const title = useMemo(() => {
    if (includes(pathname, "door")) {
      return includes(pathname, "new")
        ? "Ny luke"
        : includes(pathname, "edit")
          ? "Rediger luke"
          : "Luker"
    } else if (includes(pathname, "service_message")) {
      return includes(pathname, "new")
        ? "Ny driftsmelding"
        : includes(pathname, "edit")
          ? "Rediger driftsmelding"
          : "Driftsmeldinger"
    }
    return "Admin"
  }, [pathname])

  const { data: whoami, isLoading } = useWhoami()

  useLayoutEffect(() => {
    // Limit access to admin pages. User can still perform admin actions
    // programmatically, but they will be rejected by backend.
    if (!isLoading && (!whoami || !whoami.is_admin)) navigate("/")
  }, [isLoading, whoami, navigate])

  if (!isLoading && (!whoami || !whoami.is_admin)) return null

  return (
    <BasicPage
      title={title}
      containerClassName="place-self-center child:w-11/12 child:place-self-center relative"
    >
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
    </BasicPage>
  )
}

export default Admin
