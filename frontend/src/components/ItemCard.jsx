export default function ItemCard({item,claim}){

  const itemName = item?.name || "Unnamed item"
  const itemColor = item?.color || "Not provided"
  const itemLocation = item?.location || "Not provided"
  const itemCategory = item?.category || "Other"
  const itemDescription = item?.description || "No description provided"
  const itemFoundDate = item?.dateFound || item?.date_found || item?.foundDate || item?.date || ""
  const isClaimed = Boolean(item?.claimed)

  return(

    <article className="surface-card flex h-full flex-col gap-4 p-5">

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-100 via-sky-50 to-emerald-100 p-4">
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/40" />
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 font-display text-xl font-bold text-white">
          {itemName.charAt(0).toUpperCase()}
        </div>

        <div className="mt-3 flex items-center justify-between gap-2">
          <p className="text-sm font-medium text-slate-700">Found item listing</p>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${isClaimed ? "border border-rose-200 bg-rose-50 text-rose-700" : "border border-emerald-200 bg-emerald-50 text-emerald-700"}`}>
            {isClaimed ? "Claimed" : "Not Claimed Yet"}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-display text-xl font-semibold text-slate-900">{itemName}</h3>
        <p className="text-sm text-slate-600"><span className="font-semibold text-slate-700">Category:</span> {itemCategory}</p>
        <p className="text-sm text-slate-600"><span className="font-semibold text-slate-700">Color:</span> {itemColor}</p>
        <p className="text-sm text-slate-600"><span className="font-semibold text-slate-700">Location:</span> {itemLocation}</p>
        {itemFoundDate && <p className="text-sm text-slate-600"><span className="font-semibold text-slate-700">Date Found:</span> {itemFoundDate}</p>}
        <p className="text-sm text-slate-600"><span className="font-semibold text-slate-700">Description:</span> {itemDescription}</p>
      </div>

      <button
        className="primary-btn mt-auto w-full"
        onClick={()=>claim(item.id)}
        disabled={isClaimed}
      >
        {isClaimed ? "Already Claimed" : "Claim Item"}
      </button>

    </article>

  )

}