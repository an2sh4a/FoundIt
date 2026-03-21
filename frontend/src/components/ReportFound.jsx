import { useState,useMemo } from "react"
import { reportFound } from "../api"

const categories=[
"Electronics",
"Documents",
"Accessories",
"Bags",
"Clothing",
"Keys",
"Other"
]

export default function ReportFound({currentUser="",setPage}){

const[name,setName]=useState("")
const[color,setColor]=useState("")
const[brand,setBrand]=useState("")
const[location,setLocation]=useState("")
const[dateFound,setDateFound]=useState("")
const[category,setCategory]=useState("")
const[contact,setContact]=useState("")
const[description,setDescription]=useState("")
const[isSubmitting,setIsSubmitting]=useState(false)
const[message,setMessage]=useState("")

const isValid=useMemo(()=>(
name&&color&&location&&dateFound&&category&&description
),[name,color,location,dateFound,category,description])

const submit=async(e)=>{
e.preventDefault()
if(!isValid) return

setIsSubmitting(true)
setMessage("")

try{

await reportFound({
name,
color,
brand,
location,
dateFound,
date_found:dateFound,
category,
contact,
description,
owner:currentUser||"finder"
})

setMessage("Found item submitted successfully.")
setName("")
setColor("")
setBrand("")
setLocation("")
setDateFound("")
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
Report Found Item
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
placeholder="Wireless earbuds case"
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
placeholder="White"
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
placeholder="Apple / Sony"
value={brand}
onChange={e=>setBrand(e.target.value)}
/>

</div>


<div>

<label className="text-xs font-semibold text-slate-700">
Location Found
</label>

<input
className="field-input py-2"
placeholder="Building C lobby"
value={location}
onChange={e=>setLocation(e.target.value)}
required
/>

</div>


<div>

<label className="text-xs font-semibold text-slate-700">
Date Found
</label>

<input
type="date"
className="field-input py-2"
value={dateFound}
onChange={e=>setDateFound(e.target.value)}
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
placeholder="where found, unique marks..."
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

{isSubmitting?"Submitting...":"Submit Listing"}

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