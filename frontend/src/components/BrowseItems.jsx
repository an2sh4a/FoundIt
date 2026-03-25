import { useEffect,useState } from "react"
import { getFoundItems,claimItem } from "../api"

export default function BrowseItems({ currentUser="" }){

const [items,setItems]=useState([])
const [loading,setLoading]=useState(true)
const [error,setError]=useState("")

const loadItems=async()=>{

setLoading(true)
setError("")

try{

const data=await getFoundItems()

setItems(Array.isArray(data)?data:[])

}catch{

setError("Unable to load items")

}finally{

setLoading(false)

}

}

useEffect(()=>{

loadItems()

},[])

const handleClaim=async(id)=>{

try{

await claimItem({
user:currentUser,
itemID:id
})

loadItems()

}catch(err){

alert(err.message)

}

}

return(

<section className="space-y-6">

<div className="flex items-center justify-between">

<div>
<p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
Catalog
</p>

<h2 className="font-display text-3xl font-bold text-slate-900">
Browse Found Items
</h2>
</div>

<button
onClick={loadItems}
className="primary-btn"
>
Refresh List
</button>

</div>

{error&&(
<p className="text-sm font-medium text-rose-600">
{error}
</p>
)}

{loading?(
<p className="text-slate-600">
Loading...
</p>
):(

<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

{items.map(item=>(

<div
key={item.id}
className="surface-card p-6 flex flex-col justify-between"
>

<div className="flex items-center justify-between">

<div className="h-12 w-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
{item.name?.charAt(0).toUpperCase()}
</div>

<span className={`text-xs font-semibold px-3 py-1 rounded-full ${
item.claimed
? "bg-slate-200 text-slate-600"
: "bg-emerald-100 text-emerald-700"
}`}>
{item.claimed?"Claimed":"Not Claimed"}
</span>

</div>

<h3 className="mt-4 text-lg font-semibold text-slate-900">
{item.name}
</h3>

<button
onClick={()=>handleClaim(item.id)}
disabled={item.claimed}
className="primary-btn mt-5 w-full"
>
Claim Item
</button>

</div>

))}

</div>

)}

</section>

)

}