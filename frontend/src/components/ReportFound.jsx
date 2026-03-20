import { useState } from "react"
import { reportFound } from "../api"

const categories = [
  "Electronics",
  "Documents",
  "Accessories",
  "Bags",
  "Clothing",
  "Keys",
  "Other"
]

export default function ReportFound({ currentUser = "", setPage }){

  const [name,setName] = useState("")
  const [color,setColor] = useState("")
  const [location,setLocation] = useState("")
  const [dateFound,setDateFound] = useState("")
  const [category,setCategory] = useState("")
  const [description,setDescription] = useState("")
  const [isSubmitting,setIsSubmitting] = useState(false)
  const [message,setMessage] = useState("")

  const submit = async(e)=>{
    e.preventDefault()
    setIsSubmitting(true)
    setMessage("")

    try {
      await reportFound({
        name,
        color,
        location,
        dateFound,
        date_found: dateFound,
        category,
        description,
        owner: currentUser || "finder"
      })

      setMessage("Found item submitted successfully.")
      setName("")
      setColor("")
      setLocation("")
      setDateFound("")
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
        <h2 className="font-display text-3xl font-bold text-slate-900">Report Found Item</h2>
        <p className="mt-2 text-sm text-slate-600">Add complete details to help the rightful owner verify quickly.</p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="field-label" htmlFor="found-name">Item Name</label>
            <input
              id="found-name"
              className="field-input"
              placeholder="Example: Wireless Earbuds Case"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="field-label" htmlFor="found-color">Color</label>
            <input
              id="found-color"
              className="field-input"
              placeholder="Example: White"
              value={color}
              onChange={(e)=>setColor(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="field-label" htmlFor="found-location">Location Found</label>
            <input
              id="found-location"
              className="field-input"
              placeholder="Example: Building C Lobby"
              value={location}
              onChange={(e)=>setLocation(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="field-label" htmlFor="found-date">Date Found</label>
            <input
              id="found-date"
              className="field-input"
              type="date"
              value={dateFound}
              onChange={(e)=>setDateFound(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="field-label" htmlFor="found-category">Category</label>
            <select
              id="found-category"
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
            <label className="field-label" htmlFor="found-description">Description</label>
            <textarea
              id="found-description"
              className="field-input"
              rows="4"
              placeholder="Mention where and when it was found, and any unique identifiers."
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
              required
            />
          </div>

          <button className="primary-btn w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Listing"}
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