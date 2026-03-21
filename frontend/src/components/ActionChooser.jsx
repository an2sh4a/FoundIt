export default function ActionChooser({ setPage, currentUser }) {
  const actions = [
    {
      key: "lost",
      title: "Report Lost Item",
      note: "Submit details of something you lost.",
      image: "/highlight-intake.svg"
    },
    {
      key: "found",
      title: "Report Found Item",
      note: "Log an item you found so owners can claim it.",
      image: "/highlight-transparency.svg"
    },
    {
      key: "browse",
      title: "Browse Found Items",
      note: "Search listings and claim your item if matched.",
      image: "/highlight-mobile.svg"
    },
    {
      key: "dashboard",
      title: "View Dashboard",
      note: "See current totals for reported and found items.",
      image: "/city-map.svg"
    }
  ]

  return (
    <section className="space-y-6">
      <header>
        <h2 className="mt-2 font-display text-3xl font-bold text-slate-900">What would you like to do?</h2>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {actions.map((action) => (
          <button
            key={action.key}
            type="button"
            className="surface-card text-left p-5 transition duration-200 hover:-translate-y-1 hover:border-cyan-300"
            onClick={() => setPage(action.key)}
          >
            <div className="mb-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
              <img
                src={action.image}
                alt={action.title}
                className="h-32 w-full object-cover"
              />
            </div>

            <h3 className="font-display text-2xl font-semibold text-slate-900">{action.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{action.note}</p>
          </button>
        ))}
      </div>
    </section>
  )
}
