export default function Navbar({setPage,currentUser,onLogout}){

  return(

    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">

      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">

        <button
  onClick={()=>setPage("home")}
  className="inline-flex items-center self-start rounded-2xl border border-slate-200 bg-white px-4 py-2 text-left shadow-soft transition hover:-translate-y-0.5">
  <span>
    <span className="block font-display text-sm uppercase tracking-[0.24em] text-cyan-700">FoundIt</span>
    <span className="block text-lg font-semibold leading-none text-slate-900">Lost & Found System</span>
  </span>
</button>

        <div className="flex flex-wrap items-center gap-2">
          

          {!currentUser && (
            <button className="nav-pill" onClick={()=>setPage("login")}>Login</button>
          )}

          <button className="shade-btn" onClick={()=>setPage("actions")}>
            {currentUser ? "Choose Action" : "Get Started"}
          </button>

          {currentUser && (
            <>
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                Signed in as {currentUser}
              </span>
              <button className="ghost-btn" onClick={onLogout}>Logout</button>
            </>
          )}
        </div>
      </div>

    </header>

  )

}