import { useState } from "react"

import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Dashboard from "./components/Dashboard"
import ReportLost from "./components/ReportLost"
import ReportFound from "./components/ReportFound"
import BrowseItems from "./components/BrowseItems"
import Login from "./components/Login"
import ActionChooser from "./components/ActionChooser"

const AUTH_STORAGE_KEY = "lf_auth_user"

// Protected pages (require login)
const protectedPages = new Set(["actions", "dashboard", "lost", "found", "browse"])

function getStoredUser() {
  if (typeof window === "undefined") return ""
  return window.localStorage.getItem(AUTH_STORAGE_KEY) || ""
}

export default function App() {

  const [page, setPage] = useState("home")
  const [pendingPage, setPendingPage] = useState(null)
  const [currentUser, setCurrentUser] = useState(getStoredUser)

  // Navigation handler (handles protected pages)
  const navigateTo = (nextPage) => {
    if (protectedPages.has(nextPage) && !currentUser) {
      setPendingPage(nextPage)
      setPage("login")
      return
    }
    setPage(nextPage)
  }

  // After login/signup success
  const handleAuthSuccess = (username) => {
    const normalizedUsername = username.trim()

    setCurrentUser(normalizedUsername)

    if (typeof window !== "undefined") {
      window.localStorage.setItem(AUTH_STORAGE_KEY, normalizedUsername)
    }

    const destination = pendingPage || "actions"
    setPendingPage(null)
    setPage(destination)
  }

  // Logout
  const logout = () => {
    setCurrentUser("")
    setPendingPage(null)

    if (typeof window !== "undefined") {
      window.localStorage.removeItem(AUTH_STORAGE_KEY)
    }

    setPage("home")
  }

  // Page rendering
  const renderPage = () => {

    switch (page) {

      case "dashboard":
        return <Dashboard />

      case "actions":
        return <ActionChooser setPage={navigateTo} currentUser={currentUser} />

      case "lost":
        return <ReportLost currentUser={currentUser} setPage={navigateTo} />

      case "found":
        return <ReportFound currentUser={currentUser} setPage={navigateTo} />

      case "browse":
        return <BrowseItems currentUser={currentUser} setPage={navigateTo} />

      case "login":
        return (
          <Login
            onAuthSuccess={handleAuthSuccess}
            initialMode="login"   // your combined login/signup will work here
            pendingPage={pendingPage}
          />
        )

      default:
        return <Home setPage={navigateTo} currentUser={currentUser} />
    }
  }

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-slate-50 text-slate-900">

      {/* Background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[460px] bg-[url('/city-map.svg')] bg-cover bg-center opacity-40" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_top,_#f8fafc_0%,_#e0f2fe_35%,_#ecfeff_72%,_#f8fafc_100%)]" />

      {/* Navbar */}
      <Navbar
        setPage={navigateTo}
        currentUser={currentUser}
        onLogout={logout}
      />

      {/* Main Content */}
      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="animate-fade-in">
          {renderPage()}
        </div>
      </main>

      {/* Footer */}
      {!currentUser && (
<footer className="relative z-10 border-t border-slate-200/80 bg-white/70 backdrop-blur-sm">

  <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-sm text-slate-600 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">

    <div>
      <p className="font-display text-base font-semibold text-slate-900">
        FoundIt
      </p>
      <p>Smart reporting and claim tracking.</p>
    </div>

    <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
      <span>Secure</span>
      <span>Responsive</span>
      <span>Reliable</span>
    </div>

  </div>

</footer>
)}

    </div>
  )
}