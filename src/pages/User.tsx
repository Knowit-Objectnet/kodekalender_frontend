import { FC } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

import EditUser from "./users/EditUser"
import LostPassword from "./users/LostPassword"
import ResetPassword from "./users/ResetPassword"
import SignIn from "./users/SignIn"
import SignUp from "./users/SignUp"


const Users: FC = () => (
  <Routes>
    <Route path="/users/edit" element={<EditUser />} />
    <Route path="/users/sign_in" element={<SignIn />} />
    <Route path="/users/sign_up" element={<SignUp />} />
    <Route path="/users/lost_password" element={<LostPassword />} />
    <Route path="/users/password/edit" element={<ResetPassword />} />

    <Navigate to="/users/edit" />
  </Routes>
)

export default Users
