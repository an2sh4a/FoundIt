export default function Home({setPage}){

  const highlightItems = [
    {
      title: "Centralized Intake",
      note: "One clear submission format.",
      icon: "intake",
      tone: "bg-sky-100 text-sky-600"
    },
    {
      title: "Claim Transparency",
      note: "Track each ownership request.",
      icon: "claim",
      tone: "bg-emerald-100 text-emerald-600"
    },
    {
      title: "Easy Item Report",
      note: "Quick and simple item logging.",
      icon: "report",
      tone: "bg-indigo-100 text-indigo-600"
    },
    {
      title: "Real Time Update",
      note: "Live status across the workflow.",
      icon: "update",
      tone: "bg-orange-100 text-orange-600"
    }
  ]

  const steps = [
    { number: "01", title: "Report", note: "Submit lost or found details in seconds." },
    { number: "02", title: "Match", note: "Teams compare item traits and locations." },
    { number: "03", title: "Recover", note: "Claim is verified and item is returned." }
  ]

  return(

    <section className="space-y-12 pb-6">

      <header className="hero-shell animate-rise">
        <div className="grid gap-8 lg:grid-cols-[1.05fr,0.95fr] lg:items-center">

          <div className="space-y-6">

            <h1 className="text-balance font-display text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
              Report Lost and Found Items
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-slate-600">
              Handle reports, match found belongings, and close claim requests with a modern workflow designed for speed, trust, and clarity.
            </p>

            <div className="flex flex-wrap gap-3">
              <button className="shade-btn" onClick={()=>setPage("lost")}>Report Item</button>
              <button className="primary-btn" onClick={()=>setPage("found")}>Found Item</button>
            </div>

            <div className="grid max-w-xl grid-cols-2 gap-3">
              <Metric value="Fast" label="Claim Workflow" />
              <Metric value="Secure" label="User Access" />
            </div>
          </div>

          <div className="surface-card relative animate-fade-in p-4 sm:p-5">
            <div className="overflow-hidden rounded-[1.75rem] border border-white/80 bg-slate-100 shadow-soft">
              <img
                src="/lostimg.png"
                alt="Lost and found hero visual"
                className="aspect-[4/3] w-full object-cover object-center lg:aspect-[5/4]"
              />
            </div>
          </div>

        </div>
      </header>

      <section className="space-y-4">
        <div>
          <p className="text-center text-4xl  font-bold uppercase tracking-[0.2em] text-cyan-700">Highlights</p>
        </div>

        <div className="grid gap-5 pt-2 md:grid-cols-2">
          {highlightItems.map((item,index)=>(
            <article
              key={item.title}
              className="surface-card animate-fade-in flex flex-col items-center p-6 text-center transition duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-[0_20px_42px_-24px_rgba(14,165,233,0.55)]"
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              <div className={`inline-flex h-16 w-16 items-center justify-center rounded-full ring-8 ring-white ${item.tone}`}>
                <HighlightIcon icon={item.icon} />
              </div>

              <h3 className="mt-5 font-display text-2xl font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-600">{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white/80 p-5 shadow-soft backdrop-blur sm:p-7">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cyan-50/60 via-white/10 to-indigo-50/60" />

        <div className="relative grid gap-6 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">Visual Network</p>
            <h2 className="font-display text-3xl font-bold text-slate-900">Lost something? We’re here to help you find it.</h2>
            <p className="max-w-xl text-sm leading-relaxed text-slate-600">
              Clear categories and fast search reduce time to recovery while keeping every listing organized.
            </p>
            <button className="shade-btn" onClick={()=>setPage("actions")}>Choose Action</button>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/80 bg-slate-100">
            <img
              src="/city-map.svg"
              alt="Coverage map illustration"
              className="h-64 w-full object-cover sm:h-72"
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">How It Works</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-slate-900">Simple 3-step flow</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step)=>(
            <article key={step.number} className="surface-card p-5">
              <p className="font-display text-3xl font-bold text-cyan-600">{step.number}</p>
              <h3 className="mt-2 font-display text-xl font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{step.note}</p>
            </article>
          ))}
        </div>
      </section>

    </section>

  )

}

function Metric({ value, label }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/85 px-4 py-3 shadow-soft">
      <p className="font-display text-xl font-bold text-slate-900">{value}</p>
      <p className="text-sm text-slate-600">{label}</p>
    </div>
  )
}

function HighlightIcon({ icon }) {
  if (icon === "intake") {
    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3v18" />
        <path d="M3 12h18" />
        <circle cx="12" cy="12" r="8" />
      </svg>
    )
  }

  if (icon === "claim") {
    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 12l4 4 12-12" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    )
  }

  if (icon === "report") {
    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 8h6" />
        <path d="M9 12h6" />
        <path d="M9 16h4" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12a8 8 0 0 1 13.66-5.66" />
      <path d="M20 4v5h-5" />
      <path d="M20 12a8 8 0 0 1-13.66 5.66" />
      <path d="M4 20v-5h5" />
    </svg>
  )
}
