import { createRoot } from "react-dom/client"
import { QueryClient, QueryClientProvider } from "react-query"
import { BrowserRouter } from "react-router-dom"
import { ReactQueryDevtools } from "react-query/devtools"

import "@fontsource-variable/nunito"
import "@fontsource-variable/nunito/wght-italic.css"
import "@fontsource/twinkle-star/400.css"

import "../assets/css/base.scss"
import "../assets/css/doors.scss"
import "../assets/css/syntax_highlight.scss"

import "./axios"
import App from "./App"
import { AuthContextProvider } from "./AuthContext"
import { OptionsContextProvider } from "./OptionsContext"


const Main = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        notifyOnChangeProps: "tracked"
      }
    }
  })

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <OptionsContextProvider>
          <AuthContextProvider>
            <ReactQueryDevtools />

            <App />
          </AuthContextProvider>
        </OptionsContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

const container = document.getElementById("root")
if (container) {
  const root = createRoot(container)
  root.render(<Main />)
}
