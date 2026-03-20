import { useEffect, useState } from "react"
import { login, signup } from "../api"

const usernameRegex = /^[A-Za-z0-9_]{3,20}$/
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateUsername(value) {
  if (!usernameRegex.test(value)) {
    return "Username must be 3-20 characters and use letters, numbers, or _."
  }

  return ""
}

function validatePassword(value) {
  if (value.length < 8 || value.length > 64) {
    return "Password must be 8-64 characters long."
  }

  if (!/[A-Za-z]/.test(value) || !/\d/.test(value)) {
    return "Password must include at least one letter and one number."
  }

  return ""
}

function validateEmail(value) {
  if (!emailRegex.test(value)) {
    return "Enter a valid email address."
  }

  return ""
}

function getPendingPageLabel(pendingPage) {
  if (pendingPage === "actions") {
    return "Get Started"
  }

  if (pendingPage === "dashboard") {
    return "Dashboard"
  }

  if (pendingPage === "lost") {
    return "Report Lost"
  }

  if (pendingPage === "found") {
    return "Report Found"
  }

  if (pendingPage === "browse") {
    return "Browse"
  }

  return "that page"
}

export default function Login({ onAuthSuccess, initialMode = "login", pendingPage = null }){

  const [mode,setMode] = useState(initialMode)
  const [username,setUsername] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [confirmPassword,setConfirmPassword] = useState("")
  const [showPassword,setShowPassword] = useState(false)
  const [showConfirmPassword,setShowConfirmPassword] = useState(false)
  const [isSubmitting,setIsSubmitting] = useState(false)
  const [message,setMessage] = useState("")
  const [fieldErrors,setFieldErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  useEffect(()=>{
    setMode(initialMode)
  },[initialMode])

  const swapMode = (nextMode) => {
    setMode(nextMode)
    setMessage("")
    setShowPassword(false)
    setShowConfirmPassword(false)
    setFieldErrors({
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    })
  }

  const submit = async(e)=>{
    e.preventDefault()
    setMessage("")

    const normalizedUsername = username.trim()
    const normalizedEmail = email.trim().toLowerCase()
    const usernameError = validateUsername(normalizedUsername)
    const emailError = mode === "signup" ? validateEmail(normalizedEmail) : ""
    const passwordError = validatePassword(password)
    const confirmError = mode === "signup" && password !== confirmPassword
      ? "Passwords do not match."
      : ""

    setFieldErrors({
      username: usernameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmError
    })

    if (usernameError || emailError || passwordError || confirmError) {
      return
    }

    setIsSubmitting(true)

    try {
      if (mode === "signup") {
        await signup({ username: normalizedUsername, email: normalizedEmail, password })

        setMessage("Account created successfully. Please login with your username and password.")
        setMode("login")
        setPassword("")
        setConfirmPassword("")
        setShowPassword(false)
        setShowConfirmPassword(false)
      } else {
        await login({ username: normalizedUsername, password })

        setMessage("Login successful.")
        onAuthSuccess?.(normalizedUsername)
      }
    } catch (error) {
      setMessage(error?.message || "Authentication failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return(

    <section className="mx-auto max-w-md">
      <div className="surface-card p-6 sm:p-8">
        <h2 className="font-display text-3xl font-bold text-slate-900">Login or Sign Up</h2>
       

        <div className="mt-5 grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
          <button
            type="button"
            className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${mode === "login" ? "bg-white text-slate-900 shadow-soft" : "text-slate-600 hover:text-slate-900"}`}
            onClick={()=>swapMode("login")}
          >
            Login
          </button>

          <button
            type="button"
            className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${mode === "signup" ? "bg-white text-slate-900 shadow-soft" : "text-slate-600 hover:text-slate-900"}`}
            onClick={()=>swapMode("signup")}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="field-label" htmlFor="login-username">Username</label>
            <input
              id="login-username"
              className="field-input"
              placeholder="Use letters, numbers, or _"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              required
            />

            {fieldErrors.username && <p className="mt-2 text-xs font-medium text-rose-700">{fieldErrors.username}</p>}
          </div>

          {mode === "signup" && (
            <div>
              <label className="field-label" htmlFor="signup-email">Email</label>
              <input
                id="signup-email"
                className="field-input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
              />

              {fieldErrors.email && <p className="mt-2 text-xs font-medium text-rose-700">{fieldErrors.email}</p>}
            </div>
          )}

          <div>
            <label className="field-label" htmlFor="login-password">Password</label>
            <div className="relative">
              <input
                id="login-password"
                className="field-input pr-16"
                type={showPassword ? "text" : "password"}
                placeholder="8+ chars with letters and numbers"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-cyan-700 hover:text-cyan-900"
                onClick={()=>setShowPassword((prev)=>!prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {fieldErrors.password && <p className="mt-2 text-xs font-medium text-rose-700">{fieldErrors.password}</p>}
          </div>

          {mode === "signup" && (
            <div>
              <label className="field-label" htmlFor="signup-confirm-password">Confirm Password</label>
              <div className="relative">
                <input
                  id="signup-confirm-password"
                  className="field-input pr-16"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e)=>setConfirmPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-cyan-700 hover:text-cyan-900"
                  onClick={()=>setShowConfirmPassword((prev)=>!prev)}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>

              {fieldErrors.confirmPassword && <p className="mt-2 text-xs font-medium text-rose-700">{fieldErrors.confirmPassword}</p>}
            </div>
          )}

          <button className="primary-btn w-full" disabled={isSubmitting}>
            {isSubmitting
              ? mode === "signup" ? "Creating account..." : "Signing in..."
              : mode === "signup" ? "Create Account" : "Login"}
          </button>

          <p className="text-xs text-slate-500">Create account with username, email, password, and confirm password. Then login to continue.</p>

          {message && (
            <p className={`text-sm font-medium ${message.toLowerCase().includes("successful") ? "text-emerald-700" : "text-rose-700"}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </section>

  )

}