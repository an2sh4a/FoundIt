export default function ActionChooser({ setPage }) {

  const actions = [
    {
      key: "lost",
      title: "Report Lost Item",
      note: "Submit details of something you lost.",
      icon: "search"
    },
    {
      key: "found",
      title: "Report Found Item",
      note: "Log an item so the owner can claim it.",
      icon: "check"
    },
    {
      key: "browse",
      title: "Browse Items",
      note: "Search through found listings.",
      icon: "grid"
    },
    {
      key: "dashboard",
      title: "Dashboard",
      note: "View system activity.",
      icon: "chart"
    }
  ]


  return (

    <section className="space-y-6">

      <h2 className="font-display text-3xl font-bold text-slate-900">
        Choose an action
      </h2>
<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">

  {actions.map(action => (

    <button
      key={action.key}
      onClick={() => setPage(action.key)}

      className="
        surface-card
        flex flex-col items-center justify-center
        text-center
        p-8
        min-h-[170px]

        transition
        hover:-translate-y-1
        hover:border-cyan-300
        hover:shadow-xl
      "
    >

            <div className="
              flex h-14 w-14 items-center justify-center
              rounded-2xl
              bg-gradient-to-br from-cyan-500 to-blue-600
              text-white
              shadow-md
            ">
              <ActionIcon type={action.icon}/>
            </div>


            <div className="space-y-1">

              <h3 className="font-display text-xl font-semibold text-slate-900">
                {action.title}
              </h3>

              <p className="text-sm text-slate-600">
                {action.note}
              </p>

            </div>


          </button>

        ))}

      </div>

    </section>

  )

}



function ActionIcon({ type }) {

  if (type === "search") {
    return (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.3-4.3"/>
      </svg>
    )
  }


  if (type === "check") {
    return (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M20 6 9 17l-5-5"/>
      </svg>
    )
  }


  if (type === "grid") {
    return (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7"/>
        <rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/>
      </svg>
    )
  }


  return (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M3 3v18h18"/>
      <path d="M7 14l4-4 4 4 6-6"/>
    </svg>
  )
}