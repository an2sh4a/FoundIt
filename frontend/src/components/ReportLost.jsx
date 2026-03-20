import {useState} from "react"

export default function ReportLost(){

  const [name,setName] = useState("")
  const [color,setColor] = useState("")
  const [location,setLocation] = useState("")

  const submit=(e)=>{

    e.preventDefault()

    if(name==="" || color==="" || location===""){
      alert("Please fill all fields")
      return
    }

    alert("Lost item reported successfully")

  }

  return(

    <div className="flex justify-center">

      <form onSubmit={submit} className="card w-[420px]">

        <h2 className="text-xl font-semibold mb-6">
          Report Lost Item
        </h2>

        <input
          placeholder="Item Name"
          className="input mb-3"
          onChange={e=>setName(e.target.value)}
        />

        <input
          placeholder="Color"
          className="input mb-3"
          onChange={e=>setColor(e.target.value)}
        />

        <input
          placeholder="Location"
          className="input mb-4"
          onChange={e=>setLocation(e.target.value)}
        />

        <button className="btn btn-primary w-full">
          Submit Report
        </button>

      </form>

    </div>

  )

}