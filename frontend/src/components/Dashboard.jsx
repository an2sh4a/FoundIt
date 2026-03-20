import { useEffect, useMemo, useState } from "react"
import { getFoundItems, getLostItems } from "../api"

export default function Dashboard(){

  const [loading,setLoading] = useState(true)
  const [error,setError] = useState("")
  const [lostItems,setLostItems] = useState([])
  const [foundItems,setFoundItems] = useState([])
  const [lostCount,setLostCount] = useState(0)
  const [foundCount,setFoundCount] = useState(0)

  const loadDashboardData = async()=>{
    setLoading(true)
    setError("")

    try {
      const [lostItems, foundItems] = await Promise.all([getLostItems(), getFoundItems()])
      setLostItems(Array.isArray(lostItems) ? lostItems : [])
      setFoundItems(Array.isArray(foundItems) ? foundItems : [])
      setLostCount(Array.isArray(lostItems) ? lostItems.length : 0)
      setFoundCount(Array.isArray(foundItems) ? foundItems.length : 0)
    } catch {
      setError("Unable to fetch dashboard data. Please make sure backend is running.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{
    loadDashboardData()
  },[])

  const totalCount = useMemo(()=> lostCount + foundCount, [lostCount, foundCount])

  const cards = [
    {
      title: "Lost Items",
      value: loading ? "..." : String(lostCount),
      note: "Live count from /lost-items endpoint.",
      gradient: "from-rose-500 via-pink-500 to-orange-400",
      badge: "Live"
    },
    {
      title: "Found Items",
      value: loading ? "..." : String(foundCount),
      note: "Live count from /found-items endpoint.",
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      badge: "Live"
    },
    {
      title: "Total Listings",
      value: loading ? "..." : String(totalCount),
      note: "Calculated from current lost + found records.",
      gradient: "from-violet-500 via-indigo-500 to-blue-500",
      badge: "Derived"
    }
  ]

  return(

    <section className="space-y-7">

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Operations Overview</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-slate-900">System Dashboard</h2>
        </div>

        <button className="ghost-btn" onClick={loadDashboardData}>
          {loading ? "Refreshing..." : "Refresh Data"}
        </button>
      </div>

      {error && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
          {error}
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-3">
        {cards.map((card)=>(
          <article key={card.title} className="surface-card overflow-hidden p-0">
            <div className={`h-2 w-full bg-gradient-to-r ${card.gradient}`} />

            <div className="space-y-4 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">{card.title}</h3>
                  <p className="mt-1 font-display text-4xl font-bold text-slate-900">{card.value}</p>
                </div>

                <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  {card.badge}
                </span>
              </div>

              <div className="h-2 rounded-full bg-slate-100">
                <div className={`h-2 w-full rounded-full bg-gradient-to-r ${card.gradient}`} />
              </div>

              <p className="text-sm leading-relaxed text-slate-600">{card.note}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="surface-card p-6 text-sm text-slate-600">
        Dashboard shows live totals and the latest reported items.
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="surface-card p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-600">Latest Reports</p>
              <h3 className="mt-2 font-display text-2xl font-bold text-slate-900">Lost Items</h3>
            </div>

            <span className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
              {lostCount}
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {lostItems.length === 0 && (
              <p className="text-sm text-slate-500">No lost item reports yet.</p>
            )}

            {lostItems.slice().reverse().map((item)=>(
              <article key={`lost-${item.id}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-semibold text-slate-900">{item.name || "Unnamed item"}</h4>
                    <p className="mt-1 text-sm text-slate-600">{item.category || "Other"}</p>
                  </div>

                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                    {item.status || "lost"}
                  </span>
                </div>

                <p className="mt-3 text-sm text-slate-600"><span className="font-semibold text-slate-700">Location:</span> {item.location || "Not provided"}</p>
                <p className="mt-1 text-sm text-slate-600"><span className="font-semibold text-slate-700">Description:</span> {item.description || "No description provided"}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="surface-card p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">Latest Reports</p>
              <h3 className="mt-2 font-display text-2xl font-bold text-slate-900">Found Items</h3>
            </div>

            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              {foundCount}
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {foundItems.length === 0 && (
              <p className="text-sm text-slate-500">No found item reports yet.</p>
            )}

            {foundItems.slice().reverse().map((item)=>(
              <article key={`found-${item.id}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-semibold text-slate-900">{item.name || "Unnamed item"}</h4>
                    <p className="mt-1 text-sm text-slate-600">{item.category || "Other"}</p>
                  </div>

                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.claimed ? "border border-rose-200 bg-rose-50 text-rose-700" : "border border-emerald-200 bg-emerald-50 text-emerald-700"}`}>
                    {item.claimed ? "Claimed" : "Open"}
                  </span>
                </div>

                <p className="mt-3 text-sm text-slate-600"><span className="font-semibold text-slate-700">Location:</span> {item.location || "Not provided"}</p>
                <p className="mt-1 text-sm text-slate-600"><span className="font-semibold text-slate-700">Description:</span> {item.description || "No description provided"}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

    </section>

  )

}