import {useState} from "react"

export default function Signup(){

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const submit = (e)=>{

    e.preventDefault()

    if(name==="" || email==="" || password===""){
      alert("Please fill all fields")
      return
    }

    alert("Account created successfully")

  }

  return(

    <div className="flex justify-center">

      <form onSubmit={submit} className="card w-96">

        <h2 className="text-2xl font-semibold mb-6 text-center">
          Create Account
        </h2>

        <input
          placeholder="Name"
          className="input mb-3"
          onChange={e=>setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="input mb-3"
          onChange={e=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="input mb-4"
          onChange={e=>setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-full">
          Sign Up
        </button>

      </form>

    </div>

  )

}