import { useEffect, useMemo, useState } from "react"
import { getFoundItems, getLostItems } from "../api"

export default function Dashboard(){

  const [loading,setLoading] = useState(true)
  const [error,setError] = useState("")
  const [lostItems,setLostItems] = useState([])
  const [foundItems,setFoundItems] = useState([])
  const [lostCount,setLostCount] = useState(0)
  const [foundCount,setFoundCount] = useState(0)
  const [claimedCount,setClaimedCount] = useState(0)
  const [unclaimedCount,setUnclaimedCount] = useState(0)

  const loadDashboardData = async()=>{

  setLoading(true)
  setError("")

  try{

    const lostRes = await getLostItems()
    const foundRes = await getFoundItems()

    const safeLost = Array.isArray(lostRes) ? lostRes : []
    const safeFound = Array.isArray(foundRes) ? foundRes : []

    setLostItems(safeLost)
    setFoundItems(safeFound)

    setLostCount(safeLost.length)
    setFoundCount(safeFound.length)

    // currently backend does not send claimed flag reliably
    // treat all found items as unclaimed unless claim API used

    const claimedItems = safeFound.filter(item=>item.claimed === 1 || item.claimed === true)

    setClaimedCount(claimedItems.length)

    setUnclaimedCount(safeFound.length - claimedItems.length)

  }catch(err){

    console.log(err)

    setError("Unable to fetch dashboard data. Make sure backend is running.")

    setLostCount(0)
    setFoundCount(0)
    setClaimedCount(0)
    setUnclaimedCount(0)

  }finally{

    setLoading(false)

  }

}

  useEffect(()=>{
    loadDashboardData()
  },[])

  const totalCount = useMemo(()=> lostCount + foundCount,[lostCount,foundCount])

  const cards = [
    {
      title:"Lost Items",
      value:loading ? "..." : String(lostCount),
      note:"Live count from /lost-items endpoint.",
      gradient:"from-rose-500 via-pink-500 to-orange-400",
      badge:"Live"
    },
    {
      title:"Found Items",
      value:loading ? "..." : String(foundCount),
      note:"Live count from /found-items endpoint.",
      gradient:"from-emerald-500 via-teal-500 to-cyan-500",
      badge:"Live"
    },
    {
      title:"Total Listings",
      value:loading ? "..." : String(totalCount),
      note:"Calculated from current lost + found records.",
      gradient:"from-violet-500 via-indigo-500 to-blue-500",
      badge:"Derived"
    }
  ]

  return(

    <section className="space-y-7">

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Operations Overview</p>
        </div>

        <button
          onClick={loadDashboardData}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:-translate-y-0.5 hover:border-cyan-300 hover:text-cyan-700"
          title="Refresh"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${loading ? "animate-spin" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M5 19a9 9 0 0014-7M19 5a9 9 0 00-14 7" />
          </svg>
        </button>
      </div>

      {error && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
          {error}
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-3">
        {cards.map(card=>(
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

      <div className="grid gap-4 lg:grid-cols-2">

  <article className="surface-card p-6">

    <div className="flex items-start justify-between">

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
          CLAIM STATUS
        </p>

        <h3 className="mt-2 font-display text-2xl font-bold text-slate-900">
          Claimed Items
        </h3>

        <p className="mt-1 text-sm text-slate-600">
          Items successfully claimed.
        </p>
      </div>

      <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
        Live
      </span>

    </div>

    <p className="mt-4 font-display text-3xl font-bold text-emerald-600">
      {loading ? "..." : claimedCount}
    </p>

  </article>



  <article className="surface-card p-6">

    <div className="flex items-start justify-between">

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
          PENDING
        </p>

        <h3 className="mt-2 font-display text-2xl font-bold text-slate-900">
          Unclaimed Items
        </h3>

        <p className="mt-1 text-sm text-slate-600">
          Found items awaiting owner.
        </p>
      </div>

      <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
        Live
      </span>

    </div>

    <p className="mt-4 font-display text-3xl font-bold text-amber-600">
      {loading ? "..." : unclaimedCount}
    </p>

  </article>

</div>

    </section>

  )

}