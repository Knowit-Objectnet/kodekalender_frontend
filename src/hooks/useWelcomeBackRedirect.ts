import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import useAuthenticatedWhoami from "./useAuthenticatedWhoami"


const useWelcomeBackRedirect = () => {
  const whoami = useAuthenticatedWhoami()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect to welcome_back if at root and logged in
    if (location.pathname === "/" && whoami && !whoami.has_answered_opt_in_marketing) {
      navigate("/users/welcome_back")
    }

    // Redirect back to root if at welcome_back and (logged out, or has already answered)
    else if (location.pathname === "/users/welcome_back" && (!whoami || whoami.has_answered_opt_in_marketing)) {
      navigate("/")
    }
  }, [whoami, location.pathname, navigate])
}

export default useWelcomeBackRedirect
