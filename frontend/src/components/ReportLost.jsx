import { useState } from "react"
import { reportLost } from "../api"

const categories = [
  "Electronics",
  "Documents",
  "Accessories",
  "Bags",
  "Clothing",
  "Keys",
  "Other"
]

export default function ReportLost({ currentUser = "", setPage }){

  const [name,setName] = useState("")
  const [color,setColor] = useState("")
  const [location,setLocation] = useState("")
  const [dateLost,setDateLost] = useState("")
  const [category,setCategory] = useState("")
  const [description,setDescription] = useState("")
  const [isSubmitting,setIsSubmitting] = useState(false)
  const [message,setMessage] = useState("")

  const submit = async (e)=>{

    e.preventDefault()
    setIsSubmitting(true)
    setMessage("")

    try {
      await reportLost({
        name,
        color,
        location,
        dateLost,
        date_lost: dateLost,
        category,
        description,
        owner: currentUser || "user"
      })

      setMessage("Lost item reported successfully.")
      setName("")
      setColor("")
      setLocation("")
      setDateLost("")
      setCategory("")
      setDescription("")
      setPage?.("dashboard")
    } catch (error) {
      setMessage(error?.message || "Unable to submit right now. Please try again.")
    } finally {
      setIsSubmitting(false)
    }

  }

  return(

    <section className="mx-auto max-w-xl">
      <div className="surface-card p-6 sm:p-8">
        <h2 className="font-display text-3xl font-bold text-slate-900">Report Lost Item</h2>
        <p className="mt-2 text-sm text-slate-600">Share clear details so teams can match your item faster.</p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="field-label" htmlFor="lost-name">Item Name</label>
            <input
              id="lost-name"
              className="field-input"
              placeholder="Example: Black Backpack"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="field-label" htmlFor="lost-color">Color</label>
            <input
              id="lost-color"
              className="field-input"
              placeholder="Example: Matte Black"
              value={color}
              onChange={(e)=>setColor(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="field-label" htmlFor="lost-location">Last Seen Location</label>
            <input
              id="lost-location"
              className="field-input"
              placeholder="Example: North Library, Floor 2"
              value={location}
              onChange={(e)=>setLocation(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="field-label" htmlFor="lost-date">Date Lost</label>
            <input
              id="lost-date"
              className="field-input"
              type="date"
              value={dateLost}
              onChange={(e)=>setDateLost(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="field-label" htmlFor="lost-category">Category</label>
            <select
              id="lost-category"
              className="field-input"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              {categories.map((entry)=>(
                <option key={entry} value={entry}>{entry}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="field-label" htmlFor="lost-description">Description</label>
            <textarea
              id="lost-description"
              className="field-input"
              rows="4"
              placeholder="Add identifying details like brand, stickers, serial marks, or unique features."
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
              required
            />
          </div>

          <button className="primary-btn w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </button>

          {message && (
            <p className={`text-sm font-medium ${message.includes("success") ? "text-emerald-700" : "text-rose-700"}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </section>

  )

}