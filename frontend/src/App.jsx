import { useState } from "react"
import Navbar from "./components/Navbar"
import Landing from "./components/Landing"
import Dashboard from "./components/Dashboard"
import BrowseItems from "./components/BrowseItems"
import Login from "./components/Login"
import Signup from "./components/Signup"
import ReportLost from "./components/ReportLost"
import ReportFound from "./components/ReportFound"

export default function App(){

  const [page,setPage] = useState("landing")

  let view

  if(page==="landing") view=<Landing setPage={setPage}/>
  if(page==="dashboard") view=<Dashboard setPage={setPage}/>
  if(page==="browse") view=<BrowseItems/>
  if(page==="login") view=<Login setPage={setPage}/>
  if(page==="signup") view=<Signup/>
  if(page==="lost") view=<ReportLost/>
  if(page==="found") view=<ReportFound/>

  return(

    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-white">

      <Navbar setPage={setPage}/>

      <main className="max-w-7xl mx-auto px-6 py-14">
        {view}
      </main>

      <footer className="text-center text-sm text-gray-500 py-8">
        © 2026 Digital Lost & Found
      </footer>

    </div>

  )
}