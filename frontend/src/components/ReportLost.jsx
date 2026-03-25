import { useState,useMemo } from "react"
import { reportLost,claimItem } from "../api"

const categories=[
"Electronics",
"Documents",
"Accessories",
"Bags",
"Clothing",
"Keys",
"Other"
]

export default function ReportLost({currentUser="",setPage,selectedItem}){

const[name,setName]=useState(selectedItem?.itemName||"")
const[color,setColor]=useState("")
const[brand,setBrand]=useState("")
const[location,setLocation]=useState("")
const[dateLost,setDateLost]=useState("")
const[category,setCategory]=useState("")
const[contact,setContact]=useState("")
const[description,setDescription]=useState("")
const[isSubmitting,setIsSubmitting]=useState(false)
const[message,setMessage]=useState("")

const isValid=useMemo(()=>(

name&&color&&location&&dateLost&&category&&description

),[name,color,location,dateLost,category,description])

const submit=async(e)=>{

e.preventDefault()

if(!isValid)return

setIsSubmitting(true)

setMessage("")

try{

await reportLost({

name,
color,
brand,
location,
dateLost,
date_lost:dateLost,
category,
contact,
description,
owner:currentUser||"user"

})

if(selectedItem?.itemID){

const result=await claimItem({

user:currentUser,
itemID:selectedItem.itemID

})

if(result.score>=65){

setMessage("Item successfully claimed.")

}else{

setMessage("Details did not match.")

}

}else{

setMessage("Lost item reported successfully.")

}

setName("")
setColor("")
setBrand("")
setLocation("")
setDateLost("")
setCategory("")
setContact("")
setDescription("")

setPage?.("dashboard")

}catch(error){

setMessage(error?.message||"Unable to submit.")

}finally{

setIsSubmitting(false)

}

}

return(

<section className="mx-auto max-w-xl">

<div className="surface-card p-0 max-h-[72vh] flex flex-col">

<div className="sticky top-0 bg-white border-b border-slate-200 px-4 py-3 rounded-t-2xl z-10">

<h2 className="font-display text-xl font-bold text-slate-900">
Report Lost Item
</h2>

</div>

<form
onSubmit={submit}
className="overflow-y-auto px-4 py-3 space-y-2 flex-1"
>

<div>

<label className="text-xs font-semibold text-slate-700">
Item Name
</label>

<input
className="field-input py-2"
placeholder="Black backpack"
value={name}
onChange={e=>setName(e.target.value)}
required
/>

</div>

<div>

<label className="text-xs font-semibold text-slate-700">
Color
</label>

<input
className="field-input py-2"
placeholder="Matte black"
value={color}
onChange={e=>setColor(e.target.value)}
required
/>

</div>

<div>

<label className="text-xs font-semibold text-slate-700">
Brand
</label>

<input
className="field-input py-2"
placeholder="Nike / Apple"
value={brand}
onChange={e=>setBrand(e.target.value)}
/>

</div>

<div>

<label className="text-xs font-semibold text-slate-700">
Last Seen Location
</label>

<input
className="field-input py-2"
placeholder="North library floor 2"
value={location}
onChange={e=>setLocation(e.target.value)}
required
/>

</div>

<div>

<label className="text-xs font-semibold text-slate-700">
Date Lost
</label>

<input
type="date"
className="field-input py-2"
value={dateLost}
onChange={e=>setDateLost(e.target.value)}
required
/>

</div>

<div>

<label className="text-xs font-semibold text-slate-700">
Category
</label>

<select
className="field-input py-2"
value={category}
onChange={e=>setCategory(e.target.value)}
required
>

<option value="">Select category</option>

{categories.map(c=>(

<option key={c}>{c}</option>

))}

</select>

</div>

<div>

<label className="text-xs font-semibold text-slate-700">
Contact (optional)
</label>

<input
className="field-input py-2"
placeholder="email or phone"
value={contact}
onChange={e=>setContact(e.target.value)}
/>

</div>

<div>

<label className="text-xs font-semibold text-slate-700">
Description
</label>

<textarea
className="field-input py-2"
rows="1"
placeholder="unique marks, stickers, scratches..."
value={description}
onChange={e=>setDescription(e.target.value)}
required
/>

</div>

</form>

<div className="sticky bottom-0 bg-white border-t border-slate-200 px-4 py-3 rounded-b-2xl">

<button
type="submit"
onClick={submit}
disabled={!isValid||isSubmitting}
className={`w-full rounded-xl py-2 text-sm font-semibold transition
${isValid
?"bg-slate-900 text-white hover:bg-slate-800"
:"bg-slate-200 text-slate-500 cursor-not-allowed"
}`}
>

{isSubmitting?"Submitting...":"Submit Report"}

</button>

{message&&(

<p className={`mt-2 text-xs font-medium
${message.includes("success")
?"text-emerald-700"
:"text-rose-700"
}`}>

{message}

</p>

)}

</div>

</div>

</section>

)

}