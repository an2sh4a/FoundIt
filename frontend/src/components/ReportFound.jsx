import {useState} from "react"
import {reportFound} from "../api"

export default function ReportFound(){

  const [name,setName] = useState("")
  const [color,setColor] = useState("")
  const [location,setLocation] = useState("")

  const submit = async(e)=>{

    e.preventDefault()

    if(!name || !color || !location){

      alert("Please fill all fields")

      return
    }

    await reportFound({name,color,location})

    alert("Item reported successfully")

  }

  return(

    <div className="flex justify-center">

      <form onSubmit={submit}
        className="bg-white p-8 rounded-xl shadow-sm w-[420px]"
      >

        <h2 className="text-xl font-semibold mb-6">
          Report Found Item
        </h2>

        <input
          placeholder="Item Name"
          className="w-full border p-3 rounded mb-3"
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          placeholder="Color"
          className="w-full border p-3 rounded mb-3"
          onChange={(e)=>setColor(e.target.value)}
        />

        <input
          placeholder="Location"
          className="w-full border p-3 rounded mb-5"
          onChange={(e)=>setLocation(e.target.value)}
        />

        <button className="w-full bg-emerald-500 text-white py-3 rounded-lg hover:bg-emerald-600">
          Submit
        </button>

      </form>

    </div>

  )

}