import { useEffect,useState } from "react"
import { getFoundItems,claimItem } from "../api"
import ItemCard from "./ItemCard"

export default function BrowseItems({ currentUser = "", setPage }){

  const [items,setItems] = useState([])
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState("")
  const [status,setStatus] = useState("")

  const loadItems = async()=>{
    setLoading(true)
    setError("")

    try {
      const foundItems = await getFoundItems()
      setItems(Array.isArray(foundItems) ? foundItems : [])
    } catch {
      setError("Unable to load found items. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{

    loadItems()

  },[])

  const claim = async(id)=>{

    if(!currentUser){
      setStatus("Please login or sign up before claiming an item.")
      setPage?.("login")
      return
    }

    try {
      await claimItem({user:currentUser,itemID:id})
      setItems((prevItems)=>(
        prevItems.map((item)=>(
          item.id === id ? { ...item, claimed: true } : item
        ))
      ))
      setStatus("Claim request sent successfully.")
    } catch (error) {
      setStatus(error?.message || "Could not submit claim right now.")
    }

  }

  return(

    <section className="space-y-5">

      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Catalog</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-slate-900">Browse Found Items</h2>
        </div>

        <button className="secondary-btn" onClick={loadItems}>Refresh List</button>
      </div>

      {!currentUser && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
          Login or signup is required before you can claim an item.
        </div>
      )}

      {status && (
        <p className={`text-sm font-medium ${status.includes("success") ? "text-emerald-700" : "text-rose-700"}`}>
          {status}
        </p>
      )}

      {loading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1,2,3].map((item)=>(
            <div key={item} className="surface-card h-60 animate-pulse bg-slate-100" />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="surface-card border-rose-200 bg-rose-50 p-5 text-sm font-medium text-rose-700">{error}</div>
      )}

      {!loading && !error && items.length === 0 && (
        <div className="surface-card p-6 text-sm text-slate-600">
          No items are listed yet. Check back soon or refresh after a new found-item report is submitted.
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(item=>(
            <ItemCard key={item.id} item={item} claim={claim}/>
          ))}
        </div>
      )}

    </section>

  )

}