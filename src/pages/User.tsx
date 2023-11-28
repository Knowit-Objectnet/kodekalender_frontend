import { FC } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

import EditUser from "./users/EditUser"
import LostPassword from "./users/LostPassword"
import ResetPassword from "./users/ResetPassword"
import SignIn from "./users/SignIn"
import SignUp from "./users/SignUp"
import WelcomeBack from "./WelcomeBack"
import Welcome from "./Welcome"

const Users: FC = () => (
  <Routes>
    <Route path="edit" element={<EditUser />} />
    <Route path="sign_in" element={<SignIn />} />
    <Route path="sign_up" element={<SignUp />} />
    <Route path="lost_password" element={<LostPassword />} />
    <Route path="password/edit" element={<ResetPassword />} />
    <Route path="welcome" element={<Welcome />} />
    <Route path="welcome_back" element={<WelcomeBack />} />

    <Route element={<Navigate to="doors" />} />
  </Routes>
)

export default Users
