import { useEffect,useState } from "react"
import { getFoundItems } from "../api"

export default function BrowseItems({ currentUser="", setPage }){

const[items,setItems]=useState([])
const[loading,setLoading]=useState(true)
const[error,setError]=useState("")

const loadItems=async()=>{

setLoading(true)
setError("")

try{

const data=await getFoundItems()

setItems(Array.isArray(data)?data:[])

}catch{

setError("Unable to load found items.")

}finally{

setLoading(false)

}

}

useEffect(()=>{

loadItems()

},[])

const goToClaim=(item)=>{

if(!currentUser){

setPage("login")
return

}

setPage("lost",{
itemID:item.id,
itemName:item.name
})

}

return(

<section className="space-y-5">

<div className="flex flex-wrap items-end justify-between gap-3">

<div>

<p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
Catalog
</p>

<h2 className="mt-2 font-display text-3xl font-bold text-slate-900">
Browse Found Items
</h2>

</div>

<button
className="secondary-btn"
onClick={loadItems}
>

Refresh List

</button>

</div>

{loading&&(

<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

{[1,2,3].map(i=>(

<div key={i} className="surface-card h-32 animate-pulse bg-slate-100"/>

))}

</div>

)}

{!loading&&error&&(

<div className="surface-card border-rose-200 bg-rose-50 p-5 text-sm font-medium text-rose-700">

{error}

</div>

)}

{!loading&&!error&&items.length===0&&(

<div className="surface-card p-6 text-sm text-slate-600">

No found items available.

</div>

)}

{!loading&&!error&&items.length>0&&(

<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

{items.map(item=>(

<div key={item.id} className="surface-card p-5 flex flex-col justify-between">

<div className="flex items-center justify-between">

<h3 className="font-display text-lg font-semibold text-slate-900">

{item.name||"Unnamed Item"}

</h3>

<span className={`text-xs font-semibold px-3 py-1 rounded-full ${
item.claimed
? "bg-slate-200 text-slate-600"
: "bg-emerald-100 text-emerald-700"
}`}>

{item.claimed?"Claimed":"Not Claimed"}

</span>

</div>

<button

onClick={()=>goToClaim(item)}

disabled={item.claimed}

className={`primary-btn mt-4 ${
item.claimed?"opacity-40 cursor-not-allowed":""
}`}

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